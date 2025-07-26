import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type:Number,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        // enum: ['user', 'admin'],
        required: true,
    },
    profile:{
        bio:{type: String},
        skills:[{type: String}],
        resume:{type: String}, // url to resume file
        resumeOriginalName:{type: String}, // original name of the resume file
        company:{type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
        profilePhoto:{
            type: String,
            default:""
        }, // url to profile photo
    }
},{timestamps: true});

export const User = mongoose.model(`User`, userSchema);