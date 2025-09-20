import moongoose from 'mongoose'

const appointmentSchema = new moongoose.Schema({
    userid: {type: String, required: true},
    docid: {type: String, required: true},
    slotDate: {type: String, required:true},
    slotTime: {type: String, required:true},
    userdata: {type: Object, required:true},
    docData: {type: Object, required:true},
    amount: {type: Number, required:true},
    date: {type: Number, required:true},
    cancel: {type: Boolean, default:false},
    payment: {type: Boolean, default:false},
    isComplete: {type: Boolean, default:false},
})

const appointmentModel = moongoose.models.appointment || moongoose.model('appointment', appointmentSchema)
export default appointmentModel