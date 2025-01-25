const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Userschema = new Schema({
    username: {type:String , required: true, min: 4 , unique: true},
    password: {type: String, required: true},

});
 
const UserModel = mongoose.model('User', Userschema);
module.exports = UserModel;