import add_icon from './add_icon.svg'
import admin_logo from './newlogo.jpg'
import logo from './newlogo.jpg'
import appointment_img from './appointment_img.png'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import profile_pic from './profile_pic.png'
import dropdown_icon from './dropdown_icon.svg'
import group_profile from './group_profiles.png'
import arrow_icon from './arrow_icon.svg'
import header_img from './header_img.png'
import General_Physician from './General_Physician.svg';
import Dermatologist from './Dermatologist.svg';
import Pediatrician from './Pediatricians.svg';
import Neurologist from './Neurologist.svg';
import Gynecologist from './Gynecologist.svg';
import Gastroenterologist from './Gastroenterologist.svg'
import doc1 from './doc1.png'
import doc2 from './doc2.png';
import doc3 from './doc3.png';
import doc4 from './doc4.png';
import doc5 from './doc5.png';
import doc6 from './doc6.png';
import doc7 from './doc7.png';
import doc8 from './doc8.png';
import doc9 from './doc9.png';
import doc10 from './doc10.png';
import doc11 from './doc11.png';
import doc12 from './doc12.png';
import doc13 from './doc13.png';
import doc14 from './doc14.png';
import doc15 from './doc15.png';
import verified_icon from './verified_icon.svg'
import info_icon from './info_icon.svg'
import about_img from './about_image.png'
import contact_img from './contact_image.png'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import upload_icon from './upload_icon.png'
 
export const assets = {
  about_img,
  menu_icon,
    info_icon,
    logo,
    cross_icon,
    contact_img,
    header_img,
    arrow_icon,
    group_profile,
    dropdown_icon,
    profile_pic,
    add_icon,
    admin_logo,
    appointment_img,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    verified_icon,
    upload_icon
}

export const expertiseData = [
  {
    expertise: "General Physician",
    image: General_Physician
  },
  {
    expertise: "Dermatologist",
    image: Dermatologist
  },
  {
    expertise: "Pediatrician",
    image: Pediatrician
  },
  {
    expertise: "Neurologist",
    image: Neurologist
  },
  {
    expertise: "Gynecologist",
    image: Gynecologist
  },
  {
    expertise: "Gastroenterologist",
    image: Gastroenterologist
  },
]

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Aisha Verma',
    image: doc1,
    expertise: 'General Physician',
    degree: 'MBBS, MD',
    experience: '4 years',
    about: 'Dr. Verma is experienced in primary care and is committed to a patient-focused approach. She takes time to understand her patients’ unique needs and ensures they are comfortable throughout their healthcare journey. Her dedication to preventive medicine has helped many families stay healthy.',
    fees: 400,
    address: {
      line1: '12 Green Avenue',
      line2: 'Sector 56, Mumbai'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Rohan Mehta',
    image: doc2,
    expertise: 'Dermatologist',
    degree: 'MBBS, DDVL',
    experience: '8 years',
    about: 'Dr. Mehta specializes in diagnosing and treating skin diseases as well as cosmetic dermatology. He combines the latest medical insights with a patient-oriented approach for effective results. Patients appreciate his expertise in both medical and aesthetic skin care.',
    fees: 600,
    address: {
      line1: '21 Park Residency',
      line2: 'Hauz Khas, New Delhi'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Sneha Gupta',
    image: doc3,
    expertise: 'Pediatrician',
    degree: 'MBBS, DCH',
    experience: '5 years',
    about: 'Dr. Gupta is passionate about child healthcare and preventive immunization. She builds a warm, friendly rapport with children and families, making visits easier for young patients. Her focus on holistic growth and well-being is highly valued by parents.',
    fees: 500,
    address: {
      line1: '8 Rainbow Towers',
      line2: 'Salt Lake, Kolkata'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Vikram Agarwal',
    image: doc4,
    expertise: 'Cardiologist',
    degree: 'MBBS, MD, DM (Cardiology)',
    experience: '10 years',
    about: 'Dr. Agarwal is well-versed in interventional cardiology and heart failure management. He takes pride in guiding patients through complex procedures with care and clarity. His expertise covers everything from routine checkups to advanced cardiac treatments.',
    fees: 800,
    address: {
      line1: '3 Lotus Apartment',
      line2: 'Banjara Hills, Hyderabad'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Nisha Sharma',
    image: doc5,
    expertise: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '7 years',
    about: 'Dr. Sharma specializes in women’s health, with a focus on prenatal and infertility care. Her compassionate approach ensures patients feel supported through all stages of their reproductive journey. She regularly organizes health talks for women’s wellness.',
    fees: 650,
    address: {
      line1: '44 Blossom Residency',
      line2: 'Vastrapur, Ahmedabad'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Anil Kapoor',
    image: doc6,
    expertise: 'Orthopedic Surgeon',
    degree: 'MBBS, MS (Orthopedics)',
    experience: '12 years',
    about: 'Dr. Kapoor is highly skilled in managing trauma, joint replacement, and sports injuries. He is known for his precise surgical techniques and effective rehabilitation plans. Patients commend his focus on restoring mobility and quality of life.',
    fees: 900,
    address: {
      line1: '22 Crescent Towers',
      line2: 'Koregaon Park, Pune'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Priya Sethi',
    image: doc7,
    expertise: 'Dentist',
    degree: 'BDS, MDS',
    experience: '6 years',
    about: 'Dr. Sethi practices both general and cosmetic dentistry, helping patients maintain great oral health. She takes a gentle approach to dentistry that puts even the most anxious patients at ease. Her modern clinic is equipped for advanced dental care.',
    fees: 400,
    address: {
      line1: '16 Smile Dental Clinic',
      line2: 'MG Road, Bengaluru'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Manish Desai',
    image: doc8,
    expertise: 'Neurologist',
    degree: 'MBBS, MD, DM (Neurology)',
    experience: '9 years',
    about: 'Dr. Desai is an expert in neurological disorders such as headaches, epilepsy, and nerve issues. He pays close attention to each patient’s symptoms to create effective, personalized treatment plans. His research-backed care enhances patient outcomes.',
    fees: 850,
    address: {
      line1: '75 City Centre',
      line2: 'Navrangpura, Ahmedabad'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Ritu Bajaj',
    image: doc9,
    expertise: 'Dentist',
    degree: 'MDS, BDS',
    experience: '11 years',
    about: 'Dr. Bajaj is a specialist in both general and cosmetic dentistry, helping patients maintain great oral health. She takes a gentle approach to dentistry that puts even the most anxious patients at ease. Her modern clinic is equipped for advanced dental care.',
    fees: 550,
    address: {
      line1: '29 Eye Care Centre',
      line2: 'C-Scheme, Jaipur'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Sunil Bhatt',
    image: doc10,
    expertise: 'ENT Specialist',
    degree: 'MBBS, MS (ENT)',
    experience: '7 years',
    about: 'Dr. Bhatt is a skilled surgeon for sinus, throat, and ear issues. He combines latest techniques with a personalized approach to resolve complex ENT problems. Pediatric and adult patients value his thorough explanations and attentive follow-up.',
    fees: 700,
    address: {
      line1: '48 Harmony Clinic',
      line2: 'Anna Nagar, Chennai'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Srinivas Iyer',
    image: doc11,
    expertise: 'General Physician',
    degree: 'MBBS, MD',
    experience: '6 years',
    about: 'Dr. Iyer is experienced in primary care and is committed to a patient-focused approach. She takes time to understand her patients’ unique needs and ensures they are comfortable throughout their healthcare journey. Her dedication to preventive medicine has helped many families stay healthy.',
    fees: 650,
    address: {
      line1: '5 Wellness Centre',
      line2: 'Alkapuri, Vadodara'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Tarun Singh',
    image: doc12,
    expertise: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '8 years',
    about: 'Dr. Singh handles a wide range of skin allergies and chronic skin conditions. His practice emphasizes patient education and preventive measures for lasting results. Known for his patience, he ensures that every concern is thoroughly addressed.',
    fees: 650,
    address: {
      line1: '32 Derma House',
      line2: 'Sector 44, Noida'
    }
  },
  {
    _id: 'doc13',
    name: 'Dr. Sanjay Rao',
    image: doc13,
    expertise: 'Endocrinologist',
    degree: 'MBBS, MD (Endocrinology)',
    experience: '10 years',
    about: 'Dr. Rao is an expert in managing diabetes, thyroid, and complex hormonal disorders. She emphasizes patient education and active involvement in treatment. Her holistic approach has transformed the health journeys of many individuals.',
    fees: 700,
    address: {
      line1: '19 City Lungs Clinic',
      line2: 'Bistupur, Jamshedpur'
    }
  },
  {
    _id: 'doc14',
    name: 'Dr. Shweta Menon',
    image: doc14,
    expertise: 'Endocrinologist',
    degree: 'MBBS, MD, DM (Endocrinology)',
    experience: '7 years',
    about: 'Dr. Menon is an expert in managing diabetes, thyroid, and complex hormonal disorders. She emphasizes patient education and active involvement in treatment. Her holistic approach has transformed the health journeys of many individuals.',
    fees: 800,
    address: {
      line1: '7 DiabCare Centre',
      line2: 'Kaloor, Kochi'
    }
  },
  {
    _id: 'doc15',
    name: 'Dr. Ashok Patil',
    image: doc15,
    expertise: 'General Physician',
    degree: 'MBBS',
    experience: '3 years',
    about: 'Dr. Patil is a primary care doctor with a keen interest in preventive medicine and community wellness. He offers thorough consultations aimed at understanding the overall health of his patients. His personable style makes him popular among all age groups.',
    fees: 350,
    address: {
      line1: '10 Health Hub',
      line2: 'Civil Lines, Nagpur'
    }
  },
  [
  {
    _id: "doc16",
    name: "Dr. Aparna Reddy",
    image: doc6,
    expertise: "Gynecologist",
    degree: "MBBS, DGO",
    experience: "9 years",
    about: "Dr. Reddy is a compassionate gynecologist dedicated to providing comprehensive care for women's reproductive health. She offers a range of services from routine check-ups to managing complex gynecological conditions.",
    fees: 680,
    address: {
      line1: "345 Women's Health Clinic",
      line2: "Hindustan Park, Kolkata"
    }
  },
  {
    _id: "doc17",
    name: "Dr. Rajesh Das",
    image: doc7,
    expertise: "Dermatologist",
    degree: "MBBS, DVD",
    experience: "11 years",
    about: "Dr. Das is an experienced dermatologist specializing in skin conditions, allergies, and cosmetic dermatology. He aims to provide effective and personalized solutions for healthy skin.",
    fees: 620,
    address: {
      line1: "678 Clear Skin Centre",
      line2: "Girish Park, Kolkata"
    }
  },
  {
    _id: "doc18",
    name: "Dr. Meera Sharma",
    image: doc8,
    expertise: "Pediatricians",
    degree: "MBBS, MD (Pediatrics)",
    experience: "14 years",
    about: "Dr. Sharma is a dedicated pediatrician providing expert medical care for children of all ages. She focuses on preventative care, vaccinations, and managing childhood illnesses with a warm and friendly approach.",
    fees: 580,
    address: {
      line1: "901 Child's Play Clinic",
      line2: "Lake Town, Kolkata"
    }
  },
  {
    _id: "doc19",
    name: "Dr. Anand Gupta",
    image: doc9,
    expertise: "Cardiologist",
    degree: "MBBS, MD, DM (Cardiology)",
    experience: "17 years",
    about: "Dr. Gupta is a highly skilled cardiologist known for his expertise in interventional cardiology and cardiac rhythm disorders. He is committed to providing advanced heart care and promoting cardiovascular wellness.",
    fees: 920,
    address: {
      line1: "112 Heart Beat Clinic",
      line2: "DLF Phase 3, Kolkata"
    }
    },
  {
    _id: "doc20",
    name: "Dr. Sanjana Bose",
    image: doc2,
    expertise: "Dentist",
    degree: "BDS",
    experience: "7 years",
    about: "Dr. Bose is a gentle and thorough dentist, committed to providing comfortable and effective dental treatments. She focuses on maintaining oral hygiene and addressing various dental concerns for patients of all ages.",
    fees: 420,
    address: {
      line1: "567 Dental Hub",
      line2: "Dum Dum, Kolkata"
    }
  }
]
];
