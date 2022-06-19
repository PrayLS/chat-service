const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    avatar: String,
    password: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    friends: Object,
    groups: Object
});
module.exports = mongoose.model('User', userSchema);