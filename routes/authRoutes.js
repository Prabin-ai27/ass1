const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const users = [{ username: 'admin', password: bcrypt.hashSync('password', 10) }];

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    console.log(`Login attempt: username=${username}, password=${password}`);

    const user = users.find(u => u.username === username);
    if (!user) {
        console.log("User not found");
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match: ${passwordMatch}`);

    if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
