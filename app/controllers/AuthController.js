const models = require('../../models');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async function (req, res) {
  req.body.userType = "USER";
  bcrypt.genSalt(10, function (err, salt) {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (err) throw err;
      req.body.password = hash;
      let user = new models.User(req.body);
      try {
        await user.save();
        res.json({
          message: "User Created"
        })
      } catch (error) {
        console.log(error)
        res.status(500).json({
          message: "User not created"
        })
      }
    });
  });

}

const login = async function (req, res) {
  let user = await models.User.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (err) throw err;
      if (result) {
        jwt.sign({ id: user._id, type: user.userType }, process.env.JWT_KEY, { expiresIn: "1h" }, function(err, token){
          if(err) throw err;
          res.status(200).json({
            message: "Correct",
            token: token
          })
        })
      } else {
        res.status(401).json({
          message: "Password wrong"
        })
      };
    })
  } else {
    res.status(401).json({
      message: "Email Not found"
    })
  }
}

const loginUi = (req, res) => {
		res.render("auth/auth");
	
}; 

module.exports = { loginUi, login, signup };