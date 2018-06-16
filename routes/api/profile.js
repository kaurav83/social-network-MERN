const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load Profile Model
const Profile = require('../../models/Profile');

// load User Model
const User = require('../../models/User');

//@route    GET api/profile/test
//@desc     Tests profile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route    GET api/profile
//@desc     GET current users profile
//@access   Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = "У этого пользователя нет профиля";
                return res.status(400).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;
