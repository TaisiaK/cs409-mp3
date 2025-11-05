const User = require('../models/user');

module.exports = function (router) {
    console.log("Users route loaded");
    router.get('/', async (req, res) => {
            try {
                const users = await User.find({});
                res.status(200).json({ message: "OK", data: users });
            } catch (err) {
                res.status(500).json({ message: "Server error", data: err });
            }
    });

    router.post('/', async (req, res) => {
        console.log("Received POST /api/users with body:", req.body);
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required', data: {} });
        }
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists', data: {} });
            }
            const newUser = new User({
                name,
                email,
                pendingTasks: [],
                dateCreated: new Date()
            });
            await newUser.save();
            console.log("POST /api/users outputs newUser:", newUser);
            res.status(201).json({ message: 'User created', data: newUser });
        } catch (err) {
            res.status(500).json({ message: 'Server error', data: err });
        }
    });

    return router;
};
