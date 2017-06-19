const mongoose = require('../config/db');
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');
const Schema = mongoose.Schema;

let UserModel = new Schema({
  username: String,
  full_name: String,
  email: String,
  password: String,
  role: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      ret.created_at = moment(ret.created_at).format('YYYY-MM-DD HH:mm');
      ret.updated_at = moment(ret.updated_at).format('YYYY-MM-DD HH:mm');
    }
  }
});

UserModel.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserModel);