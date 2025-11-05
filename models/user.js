// Load required packages
var mongoose = require('mongoose');

//define user schema 
var UserSchema = new mongoose.Schema({
    name: {type: String, required : [true, "name is required"], unique: true},
    email: {type: String, required : [true, "email is required"], unique: true}
});

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    pendingTasks: [String], 
    dateCreated: {type: Date, default: Date.now}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
