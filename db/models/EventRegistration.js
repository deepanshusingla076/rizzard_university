const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    personal: {
        dob: Date,
        gender: {
            type: String,
            default: 'Not specified'
        }
    },
    eventDetails: {
        eventName: {
            type: String,
            required: true
        },
        college: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'Not specified'
        },
        guests: {
            type: Number,
            default: 0
        }
    },
    additionalInfo: {
        requirements: String,
        referral: {
            type: String,
            default: 'Not specified'
        },
        subscribedToNewsletter: {
            type: Boolean,
            default: false
        }
    },
    status: {
        type: String,
        default: 'Registered'
    }
}, { timestamps: true });

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);