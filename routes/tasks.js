const Task = require('../models/task');
const User = require('../models/user');

module.exports = function (router) {
    console.log("Tasks route loaded");
    router.get('/', async (req, res) => {
        try {
            const tasks = await Task.find({});
            res.status(200).json({ message: "OK", data: tasks });
        } catch (err) {
            res.status(500).json({ message: "Server error", data: err });
        }
    });

    router.post('/', async (req, res) => {
        if (!req.body.name || !req.body.deadline) {
            return res.status(400).json({ message: 'Task name and deadline are required', data: {} });
        }
        try {
            const task = new Task({
                name: req.body.name, 
                description: req.body.description || "",
                deadline: new Date(req.body.deadline),
                completed: req.body.completed || false,
                assignedUser: req.body.assignedUser || '',
                assignedUserName: req.body.assignedUserName || 'unassigned',
                dateCreated: new Date()
            });
            await task.save();
            if (req.body.assignedUser) {
                const user = await User.findById(req.body.assignedUser);
                if (!user) {
                    return res.status(400).json({ message: 'Assigned user not found', data: {} });
                }
                user.pendingTasks.push(task._id);
                await user.save();
            }
            console.log("POST /api/tasks outputs task:", task);
            res.status(201).json({ message: "Task created", data: task });
        } catch (err) {
            res.status(500).json({ message: "Server error", data: err });
        }
    });

    return router;
};
