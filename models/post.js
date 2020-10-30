var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    id: Schema.ObjectId,
    owner: { type: String, required: true },
    deleted_at: { type: Date,  default: null },
    content: { type: String, required: true, default: null },
    comments: { type: Array, default: [] },
});
module.exports = Post = mongoose.model('Post', PostSchema, 'Post');
