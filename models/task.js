// Load required packages
var mongoose = require('mongoose');

// Define our task schema
var UserSchema = new mongoose.Schema({
    name: String, 
    description: String, 
    deadline: Date, 
    completed: Boolean, 
    assignedUser: { type: String, default: "" },
    assignedUserName: { type: String, default: "unassigned" },
    dateCreated: { type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('Task', UserSchema);
