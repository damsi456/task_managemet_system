const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google',
    // (req, res, next) => {
    //   console.log('Google auth says hi!');
    //   next();
    // },
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
  
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173',
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('Logged out');
  });
});

router.get('/current-user', (req, res) => {
  res.send(req.user);
});

// router.get('/test', (req, res) => {
//     res.send('Auth routes working!');
// });

module.exports = router;
