const { Schema, model } = require('mongoose');
const responseSchema = require('./Response');
const dateFormat = require('../utils/dateFormat');
const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: 'You must write a post',
            minlength: 1,
            maxlength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        responses: [responseSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

postSchema.virtual('responseCount').get(function() {
    return this.responses.length;
});

const Post = model('Post', postSchema);

module.exports = Post;