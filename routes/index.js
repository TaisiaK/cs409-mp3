/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    const express = require('express');
    app.use('/api', require('./home')(express.Router()));        
    app.use('/api/users', require('./users')(express.Router()));    
    app.use('/api/tasks', require('./tasks')(express.Router())); 
};
