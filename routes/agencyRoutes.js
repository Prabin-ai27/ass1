const express = require('express');
const Agency = require('../models/Agency');
const Client = require('../models/Client');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { name, address1, address2, state, city, phoneNumber, clients } = req.body;
        const agency = new Agency({ name, address1, address2, state, city, phoneNumber });
        await agency.save();
        
        const clientDocs = [];
        for (const client of clients) {
            const existingClient = await Client.findOne({ email: client.email });
            if (existingClient) {
                return res.status(400).json({ message: `Client with email ${client.email} already exists` });
            }
            clientDocs.push({ ...client, agencyId: agency._id });
        }
        
        await Client.insertMany(clientDocs);
        res.status(201).json({ agency, clients: clientDocs });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;