import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {
        type : String,
        required: [true, 'please provide company'],
        maxlength: 50,
    },
    position:{
        type: String,
        required: [true, 'please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'remote'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide user']
    }
}, {timestamps: true})


export default mongoose.model('Job', JobSchema)