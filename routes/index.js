var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res,) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render("profile");
});

router.post('/register', function(req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  })
  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req, res, function(){
      res.redirect('/profile')
    })
  })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function(req, res){ });

router.get('/logout', function(req, res, next) {
  req.logout(function(err){
    if(err) return next (err);
    res.redirect('/');
  })
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}

















// router.get('/create', function(req, res,) {
//   req.flash("name", "Akash");
//   req.flash("age", 12);
//   res.send("Created !");
// });

// router.get('/seen', function(req, res) {
//   console.log(req.flash("name"), req.flash("age"));
//   res.send("Check Terminal")
// });

// router.get("/insert", async function(req, res){
//   let userData = await userModel.create({
//     username: "Akbar",
//     nickname: "Birbal",
//     description: "Hello i am a King",
//     categories:['War', 'Women','Sward','Stories'],
//   });
//   res.send(userData)
// });

// router.get("/find", async function(req, res){
//   var regex = new RegExp("^AkaSh$", "i") // to find case insenstive name
//   // let user = await userModel.find({username: regex})

//   // let user = await userModel.find({})

//   // let user = await userModel.find({categories: {$all : ["java", "mongodb"]}})

//   // var date1 = new Date('2023-12-27')
//   // var date2 = new Date('2023-12-28')
//   // let user = await userModel.find({dateCreated: {$gte: date1, $lte: date2}})

//   // let user = await userModel.find({username: {$exists: true}})

//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         {$gte: [{$strLenCP: "$nickname"}, 0]},
//         {$lte: [{$strLenCP: "$nickname"}, 4]}
//       ]
//     }
//   })
//   res.send(user);
// })

module.exports = router;
