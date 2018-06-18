const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

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
        .populate('user', ['name', 'avatar']) // приходит из модели профиля ref: 'users'
        .then(profile => {
            if (!profile) {
                errors.noprofile = "У этого пользователя нет профиля";
                return res.status(404).json(errors)
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/all
//@desc     GET all profiles
//@access   Public
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = "Нет профилей";
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err =>
            res.status(404).json({ profile: "Нет профилей" })
        );
});

//@route    GET api/profile/handle/:handle
//@desc     GET profile by handle
//@access   Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "Для этого пользователя нет профиля";
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

//@route    GET api/profile/user/:user_id
//@desc     GET profile by user ID
//@access   Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "Для этого пользователя нет профиля";
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: "Для этого пользователя нет профиля" }));
});

//@route    POST api/profile
//@desc     create or edit user profile
//@access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // GET fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    // Скилы делим внутри массива согласно схеме в модели
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubsername) profileFields.githubsername = req.body.githubsername;

    // Соцсети
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.vk) profileFields.social.vk = req.body.vk;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                ).then(profile => res.json(profile));

            } else {
                // create

                // check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if (profile) {
                        errors.handle = 'Этот обработчик уже существуем';
                        res.status(400).json(errors);
                    }

                    // save profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })

});

//@route    POST api/profile/experience
//@desc     add experience by profile
//@access   Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // add to experience array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        })
})

//@route    POST api/profile/education
//@desc     add education by profile
//@access   Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEduc = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // add to experience array
            profile.education.unshift(newEduc);

            profile.save().then(profile => res.json(profile));
        })
})

module.exports = router;
