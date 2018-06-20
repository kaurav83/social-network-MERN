const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

//@route    GET api/posts/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

//@route    GET api/posts
//@desc     get  posts
//@access   Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'Посты не найдены' }));;
})

//@route    GET api/posts/:id
//@desc     get  post by id
//@access   Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'Пост c таким id не найден' }));
})

//@route    POST api/posts
//@desc     Create  post
//@access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

//@route    DELETE api/posts/:id
//@desc     delete post
//@access   Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'Пользователь не авторизован' })
                    }

                    //delete
                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Пост не найден' }));
        })
});

//@route    POST api/posts/like/:id
//@desc     like post
//@access   Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'Вы уже лайкнули этот пост' });
                    }

                    // добавляем массив с лайками пользователей, которым понравился пост
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Пост не найден' }));
        })
});

//@route    POST api/posts/unlike/:id
//@desc     unlike post
//@access   Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: 'Вы ещё не лайкали этот пост' });
                    }

                    // получить удалённый индекс лайка
                    const removeIndex = post.likes.map(item => item.user.toString())
                        .indexOf(req.user.id);

                    //объединение массива
                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json(post));

                })
                .catch(err => res.status(404).json({ postnotfound: 'Пост не найден' }));
        })
});

//@route    POST api/posts/comment/:id
//@desc     add comment to post
//@access   Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            // добавляем комментарий в массив
            post.comments.unshift(newComment);

            //сохраняем
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Пост не найден' }));
})

//@route    DELETE api/posts/comment/:id/:comment_id
//@desc     delete comment from post
//@access   Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // делаем проверку, существует ли комментарий
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexists: 'Комментария не существует' });
            }

            // получаем удалённый индекс
            const removeIndex = post.comments.map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            // сращиваем комментарии из массива
            post.comments.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Пост не найден' }));
})

module.exports = router;
