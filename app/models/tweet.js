'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema definition
var Tweet = new Schema({
  text: String,
  author: { type: Schema.ObjectId, ref: 'User' },
  retweets: [{ type: Schema.ObjectId, ref: 'User' }],
  likes: [{ type: Schema.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

/**
**
**/
Tweet.methods.getBasicDetail = function () {
  return {
    id: this._id,
    text: this.text,
    date: this.createdAt,
    retweets: this.retweets.length,
    likes: this.likes.length
  };
}

// Exposes the Schema as a Mongoose model
module.exports = mongoose.model('Tweet', Tweet);
