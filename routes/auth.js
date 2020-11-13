const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const { TOKEN_KEYWORD } = require('../util/constant');

router.post('/login', function(req, res, nest) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Error',
                user: user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, TOKEN_KEYWORD);
            return res.json({user, token});
        });
    }) (req, res) ;
});