const mongoose = require("mongoose"); 
const ClientSchema = new mongoose.Schema({
    agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, 'Phone number must be 10 digits'] 
    },
    totalBill: { type: Number, required: true }
});
module.exports = mongoose.model('Client', ClientSchema);