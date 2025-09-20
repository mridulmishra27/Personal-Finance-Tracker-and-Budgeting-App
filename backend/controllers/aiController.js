import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

export const handleChat = async (req, res) => {
  try {
    const { messages } = req.body || { messages: [] };
    const lastMessage = (messages?.[messages.length - 1]?.content || '').toLowerCase();

    // Helper to format time consistently as "HH:MM AM/PM" with a single space
    const formatTimeLikeFrontend = (hour24, minute) => {
      const h24 = Number(hour24);
      const min = Number(minute || 0);
      let h12 = h24 % 12;
      if (h12 === 0) h12 = 12;
      const mer = h24 >= 12 ? 'PM' : 'AM';
      const hh = String(h12).padStart(2, '0');
      const mm = String(min).padStart(2, '0');
      return `${hh}:${mm} ${mer}`;
    };

    // --- Intent Detection ---
    const isAskingForDoctors =
      lastMessage.includes('doctor') || lastMessage.includes('specialist') ||
      lastMessage.includes('cardiologist') || lastMessage.includes('dermatologist') ||
      lastMessage.includes('neurologist') || lastMessage.includes('pediatrician') ||
      lastMessage.includes('gynecologist') || lastMessage.includes('general physician') ||
      lastMessage.includes('list') || lastMessage.includes('show me');

    const isBookingAppointment =
      lastMessage.includes('book') || lastMessage.includes('appointment') || lastMessage.includes('schedule');

    const isCancellingAppointment =
      lastMessage.includes('cancel my appointment') || lastMessage.includes('cancel appointment') || lastMessage.includes('remove appointment');
      
    let specializationFilter = null;
    if (lastMessage.includes('cardiologist')) specializationFilter = 'Cardiologist';
    else if (lastMessage.includes('dermatologist')) specializationFilter = 'Dermatologist';
    else if (lastMessage.includes('neurologist')) specializationFilter = 'Neurologist';
    else if (lastMessage.includes('pediatrician')) specializationFilter = 'Pediatrician';
    else if (lastMessage.includes('gynecologist')) specializationFilter = 'Gynecologist';
    else if (lastMessage.includes('general physician') || lastMessage.includes('general')) specializationFilter = 'General Physician';

    // --- User Authentication and Data Fetching ---
    const userid = req.user?.id || null;
    let userdata = null;
    try {
      userdata = userid ? await userModel.findById(userid).select('name').lean() : null;
    } catch (dbError) {
      console.log('Database connection issue, continuing without user data');
    }

    let doctorData = '';
    let actionMessage = '';
    let navigation = null; // structured navigation intent for frontend

    // --- Doctor Listing Logic ---
    if (isAskingForDoctors) {
      try {
        const query = specializationFilter ? { available: true, expertise: specializationFilter } : { available: true };
        const doctors = await doctorModel.find(query).select('name expertise fees').lean();
        doctorData = doctors.map(d => `${d.name} (${d.expertise}) - ₹${d.fees}`).join(', ');
        if (!doctorData) doctorData = 'No available doctors found for your query.';
      } catch (dbError) {
        console.log('Database connection issue, using fallback doctor data');
        doctorData = 'Database temporarily unavailable. Please try again later.';
      }
    }

    // --- Booking: perform booking mirroring userController, with doctor search ---
    if (isBookingAppointment) {
      if (!userid) {
        actionMessage = 'You need to be logged in to book an appointment.';
      } else {
        // Extract docid or search by name/expertise
        const docIdMatch = lastMessage.match(/([a-f\d]{24})/i);
        let docid = docIdMatch ? docIdMatch[1] : null;

        // Attempt to pull a candidate name after 'with'
        let nameQuery = null;
        const withMatch = lastMessage.match(/with\s+([a-z\.\s]+?)(?:\s+on|\s+at|$)/i);
        if (withMatch && withMatch[1]) {
          nameQuery = withMatch[1].trim().replace(/\s+/g, ' ');
          nameQuery = nameQuery.replace(/^dr\.?\s+/i, '');
        }

        // If no explicit name, fall back to specializationFilter text
        if (!nameQuery && specializationFilter) {
          nameQuery = specializationFilter;
        }

        // Parse time: support HH:MMam/pm, HH:MM, or h am/pm, then format like frontend
        const timeMatchCombo = lastMessage.match(/\b([01]?\d|2[0-3]):([0-5]\d)\s?(am|pm)\b/);
        const timeMatch24 = lastMessage.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
        const timeMatch12 = lastMessage.match(/\b(\d{1,2})\s?(am|pm)\b/);
        let slotTime = null;
        if (timeMatchCombo) {
          let hour = Number(timeMatchCombo[1]);
          const minute = Number(timeMatchCombo[2]);
          const meridiem = timeMatchCombo[3].toLowerCase();
          if (meridiem === 'pm' && hour < 12) hour += 12;
          if (meridiem === 'am' && hour === 12) hour = 0;
          slotTime = formatTimeLikeFrontend(hour, minute);
        } else if (timeMatch24) {
          slotTime = formatTimeLikeFrontend(timeMatch24[1], timeMatch24[2]);
        } else if (timeMatch12) {
          let hour = Number(timeMatch12[1]);
          const meridiem = timeMatch12[2].toLowerCase();
          if (meridiem === 'pm' && hour < 12) hour += 12;
          if (meridiem === 'am' && hour === 12) hour = 0;
          slotTime = formatTimeLikeFrontend(hour, 0);
        }

        // Parse date: d-m-YYYY or keywords today/tomorrow → standardize as d-m-YYYY (no leading zeros)
        const dateMatch = lastMessage.match(/\b(\d{1,2})[-\/]([0-1]?\d)[-\/]?(\d{4})\b/);
        let slotDate = null;
        if (dateMatch) {
          const d = Number(dateMatch[1]);
          const m = Number(dateMatch[2]);
          const y = Number(dateMatch[3]);
          slotDate = `${d}-${m}-${y}`;
        } else if (lastMessage.includes('today') || lastMessage.includes('tomorrow')) {
          const base = new Date();
          if (lastMessage.includes('tomorrow')) base.setDate(base.getDate() + 1);
          const d = base.getDate();
          const m = base.getMonth() + 1;
          const y = base.getFullYear();
          slotDate = `${d}-${m}-${y}`;
        }

        // If docid missing, try a DB search by name/expertise
        if (!docid && nameQuery) {
          try {
            const regex = new RegExp(nameQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
            const candidates = await doctorModel.find({ available: true, $or: [ { name: regex }, { expertise: regex } ] }).select('_id name expertise');
            if (candidates.length === 1) {
              docid = String(candidates[0]._id);
            } else if (candidates.length > 1) {
              const list = candidates.slice(0,5).map(d => `${d.name} (${d.expertise}) id:${d._id}`).join(', ');
              actionMessage = `I found multiple doctors: ${list}. Please specify the doctor by name or provide the id.`;
            } else {
              actionMessage = 'No matching doctors found. Please try a different name or specialty.';
            }
          } catch (searchErr) {
            console.log('Doctor search failed:', searchErr);
            actionMessage = 'Could not search for doctors right now. Please try again later.';
          }
        }

        // If still missing fields, ask user for the remaining info
        if (!actionMessage && (!docid || !slotDate || !slotTime)) {
          const missing = [ !docid ? 'doctor' : null, !slotDate ? 'date (d-m-YYYY or "today"/"tomorrow")' : null, !slotTime ? 'time (HH:MM or h am/pm)' : null ].filter(Boolean).join(', ');
          actionMessage = `Please provide ${missing} to complete the booking. Use this format: "Book/Cancel appointment with Dr. Sneha Gupta on 10-09-2025 at 6:30 pm"`;
          if (docid) navigation = { intent: 'book_appointment', route: `/appointments/${docid}` };
        }

        if (!actionMessage && docid && slotDate && slotTime) {
          try {
            const docData = await doctorModel.findById(docid).select('-password');
            if (!docData) {
              actionMessage = 'Doctor Not Found';
            } else if (!docData.available) {
              actionMessage = 'Doctor Not Available';
            } else {
              // Deep clone to avoid mutation issues
              let slots_booked = JSON.parse(JSON.stringify(docData.slots_booked || {}));
              if (slots_booked[slotDate]) {
                if (slots_booked[slotDate].includes(slotTime)) {
                  actionMessage = 'Slot unavailable';
                } else {
                  slots_booked[slotDate].push(slotTime);
                }
              } else {
                slots_booked[slotDate] = [slotTime];
              }

              if (!actionMessage) {
                const userdataFull = await userModel.findById(userid).select('-password');
                const docDataObj = docData.toObject();
                delete docDataObj.slots_booked;

                const appointmentData = {
                  userid,
                  docid,
                  userdata: userdataFull,
                  docData: docDataObj,
                  amount: docData.fees,
                  slotTime,
                  slotDate,
                  date: Date.now(),
                };

                const newAppointment = new appointmentModel(appointmentData);
                await newAppointment.save();
                // Persist slot booking using atomic update to prevent race conditions
                await doctorModel.findOneAndUpdate(
                  { _id: docid },
                  { $set: { [`slots_booked.${slotDate}`]: slots_booked[slotDate] } }
                );
                actionMessage = 'Appointment Booked';
                navigation = { intent: 'book_appointment', route: '/my-appointments' };
              }
            }
          } catch (dbErr) {
            console.log('AI booking error:', dbErr);
            actionMessage = 'Failed to book appointment. Please try again.';
          }
        }
      }
    }

    // --- Cancellation: perform cancellation mirroring userController, allow doctor name targeting ---
    if (isCancellingAppointment) {
      if (!userid) {
        actionMessage = 'You need to be logged in to cancel an appointment.';
      } else {
        try {
          // Extract appointment id or build a targeted query
          const apptIdMatch = lastMessage.match(/([a-f\d]{24})/i);
          let appointmentid = apptIdMatch ? apptIdMatch[1] : null;

          // Optional: doctor name after 'with'
          let nameQuery = null;
          const withMatch = lastMessage.match(/with\s+([a-z\.\s]+?)(?:\s+on|\s+at|$)/i);
          if (withMatch && withMatch[1]) {
            nameQuery = withMatch[1].trim().replace(/\s+/g, ' ');
            nameQuery = nameQuery.replace(/^dr\.?\s+/i, '');
          }

          // Optional: date (normalize to d-m-YYYY)
          const dateMatchC = lastMessage.match(/\b(\d{1,2})[-\/]([0-1]?\d)[-\/]?(\d{4})\b/);
          let slotDateC = null;
          if (dateMatchC) {
            const d = Number(dateMatchC[1]);
            const m = Number(dateMatchC[2]);
            const y = Number(dateMatchC[3]);
            slotDateC = `${d}-${m}-${y}`;
          } else if (lastMessage.includes('today') || lastMessage.includes('tomorrow')) {
            const base = new Date();
            if (lastMessage.includes('tomorrow')) base.setDate(base.getDate() + 1);
            const d = base.getDate();
            const m = base.getMonth() + 1;
            const y = base.getFullYear();
            slotDateC = `${d}-${m}-${y}`;
          }

          // Optional: time (normalize to "HH:MM AM/PM")
          const timeMatchComboC = lastMessage.match(/\b([01]?\d|2[0-3]):([0-5]\d)\s?(am|pm)\b/);
          const timeMatch24C = lastMessage.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/);
          const timeMatch12C = lastMessage.match(/\b(\d{1,2})\s?(am|pm)\b/);
          let slotTimeC = null;
          if (timeMatchComboC) {
            let hour = Number(timeMatchComboC[1]);
            const minute = Number(timeMatchComboC[2]);
            const meridiem = timeMatchComboC[3].toLowerCase();
            if (meridiem === 'pm' && hour < 12) hour += 12;
            if (meridiem === 'am' && hour === 12) hour = 0;
            slotTimeC = formatTimeLikeFrontend(hour, minute);
          } else if (timeMatch24C) {
            slotTimeC = formatTimeLikeFrontend(timeMatch24C[1], timeMatch24C[2]);
          } else if (timeMatch12C) {
            let hour = Number(timeMatch12C[1]);
            const meridiem = timeMatch12C[2].toLowerCase();
            if (meridiem === 'pm' && hour < 12) hour += 12;
            if (meridiem === 'am' && hour === 12) hour = 0;
            slotTimeC = formatTimeLikeFrontend(hour, 0);
          }

          // Build query for an active appointment
          let appointmentData = null;
          if (appointmentid) {
            appointmentData = await appointmentModel.findById(appointmentid);
          } else {
            const query = { userid, cancel: { $ne: true }, isComplete: { $ne: true } };
            if (nameQuery) {
              const regex = new RegExp(nameQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
              query['docData.name'] = regex;
            }
            if (slotDateC) query.slotDate = slotDateC;
            if (slotTimeC) query.slotTime = slotTimeC;
            appointmentData = await appointmentModel.findOne(query).sort({ date: -1 });
          }

          if (!appointmentData) {
            // If no appointment found, guide the user to use the same fields as shown in MyAppointments
            const missingParts = [
              !nameQuery ? 'doctor name' : null,
              !slotDateC ? 'date (d-m-YYYY or "today"/"tomorrow")' : null,
              !slotTimeC ? 'time (HH:MM am/pm)' : null,
            ].filter(Boolean).join(', ');
            if (missingParts) {
              actionMessage = `I couldn't find a matching active appointment. Please provide ${missingParts}. Example: "Cancel appointment with Dr. Sneha Gupta on 10-09-2025 at 6:30 pm"`;
            } else {
              actionMessage = "I couldn't find an active appointment matching the given doctor, date and time.";
            }
          } else if (String(appointmentData.userid) !== String(userid)) {
            actionMessage = 'Unauthorized Access';
          } else {
            const alreadyCancelled = Boolean(appointmentData.cancel);
            if (alreadyCancelled) {
              actionMessage = 'The appointment you are trying to cancel is already cancelled.';
            } else {
              await appointmentModel.findByIdAndUpdate(appointmentData._id, { cancel: true });
            }
            const { docid, slotDate, slotTime } = appointmentData;
            const docData = await doctorModel.findById(docid);
            if (!alreadyCancelled && docData && docData.slots_booked && docData.slots_booked[slotDate]) {
              let updated = (docData.slots_booked[slotDate] || []).filter((e) => e !== slotTime);
              await doctorModel.findOneAndUpdate(
                { _id: docid },
                { $set: { [`slots_booked.${slotDate}`]: updated } }
              );
            }
            if (!alreadyCancelled) {
              actionMessage = 'Appointment Cancelled';
            }
            navigation = { intent: 'cancel_appointment', route: '/my-appointments' };
          }
        } catch (err) {
          console.log('AI cancel error:', err);
          actionMessage = 'Failed to cancel appointment. Please try again.';
        }
      }
    }
    
    // --- AI Response Generation ---
    const systemText = [
      'You are a polite and helpful medical appointment assistant.',
      'You can find doctors and book or cancel appointments.',
      userdata ? `The user is logged in as ${userdata.name}.` : 'The user is not logged in.',
      doctorData ? `Available doctors information: ${doctorData}` : '',
      actionMessage ? `Action result: ${actionMessage}` : ''
    ].filter(Boolean).join('\n');

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      const fallbackResponse = [
        'I can help with medical queries and appointments.',
        actionMessage,
        doctorData
      ].filter(Boolean).join('\n');
      return res.json(
        navigation
          ? { type: 'navigation', ...navigation, message: actionMessage }
          : { type: 'text', message: fallbackResponse || 'How can I assist with your healthcare needs today?' }
      );
    }
    
    const result = await generateText({
      model: google('models/gemini-2.0-flash'),
      system: systemText,
      prompt: messages.map(m => `${m.role}: ${m.content}`).join('\n')
    });

    // Return structured JSON so frontend can act on navigation intents
    if (navigation) {
      return res.json({ type: 'navigation', ...navigation, message: actionMessage });
    }
    return res.json({ type: 'text', message: actionMessage || result.text || 'How can I help with your healthcare needs today?' });

  } catch (error) {
    console.error('Error in handleChat:', error);
    if (!res.headersSent) return res.status(500).send('An internal server error occurred.');
  }
};