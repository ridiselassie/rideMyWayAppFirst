const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    destination:{
        type: String
    },


    departure:{
        type: String
    },

    date:{
        type: Date,
        default: Date.now
    }
});


const Dash = mongoose.model('Dash', UserSchema);


module.exports = Dash;