var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: Schema.ObjectId,
  username: { type: String, unique: true, required: true, dropDups: true },
  salt: String,
  password: String,
  role: { type: String, enum: ['USER', 'MODERATOR'] },
});

module.exports = User = mongoose.model('User', UserSchema, 'User');
