var mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/testing");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String
});

userSchema.plugin(plm);

// const userSchema = mongoose.Schema({
//   username: String,
//   nickname: String,
//   description: String,
//   categories: {
//     type: Array,
//     default: []
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now()
//   }
// });

module.exports = mongoose.model("user", userSchema);