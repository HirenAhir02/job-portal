import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    requirements:[{
        type: String,
    }],
    salary:{
        type: Number,
        required: true
    },
    experience:{
        type: Number,
        // enum: ['fresher', '1-2 years', '3-5 years', '5+ years'],
        required: true
    },
    location:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        // enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true
    },
    position:{
        type: String,
        // enum: ['junior', 'mid', 'senior'],
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }]
},{timestamps: true});

export const  Job = mongoose.model('Job', jobSchema);