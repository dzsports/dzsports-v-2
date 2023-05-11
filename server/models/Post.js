const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: String,
    image : String,
    userId: String,
    likes:{
        type: Number,
        default: 0
    },
    comments:[{
        userId : {
            type : String,
            required : true
        },
        text : {
            type : String,
            required : true
        },
        createdDate : {
            type : Date,
            default : Date.now
        }
    }]
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };