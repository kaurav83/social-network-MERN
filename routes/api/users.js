const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('passport');

//load Input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//@route    GET api/users/test
//@desc     Tests users route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

const User = require("../../models/User");
//@route    GET api/users/register
//@desc     Register user
//@access   Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email уже существует";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/login
//@desc     Login User / Returning JWT token
//@access   Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "Пользователь не найден";
      return res
        .status(400)
        .json(errors);
    }

    // CHECK PASSWORD
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // create JWT payload

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
      } else {
        errors.password = "Неверный пароль"
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@desc     return current user
//@access   Private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // res.json({ msg: 'Успешно!' })
  //     ||
  // res.json(req.user)
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;