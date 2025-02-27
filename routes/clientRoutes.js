const express = require('express');
const Client = require('../models/Client');
const router = express.Router();


router.put('/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/top', async (req, res) => {
    try {
        const topClient = await Client.find().sort({ totalBill: -1 }).limit(1).populate('agencyId', 'name');
        if (!topClient.length) return res.status(404).json({ message: 'No clients found' });
        res.json({ agencyName: topClient[0].agencyId.name, clientName: topClient[0].name, totalBill: topClient[0].totalBill });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;