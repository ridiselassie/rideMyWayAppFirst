const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

    //User model --new test
    const User = require('../models/User');
    const Dash = require('../models/Dash');


//Welcome page
router.get('/', (req, res) => res.render('home'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', {name: req.user.name}));


// Get single user profile
router.get('/dashboard/profile', ensureAuthenticated, (req, res) => 
            res.render('profile', {
                name: req.user.name,
                email: req.user.email,
                location: req.user.location
            }));
        


// Get Single User for edit-profile
router.get('/dashboard/profile/profile-edit', ensureAuthenticated, (req, res) => {
    try { const user = req.user
     res.render('profile-edit', { user } )
    } catch(err){
        console.log(err);
    }
 })
 
 
 // Edit/Update User Profile
 router.post('/dashboard/profile/profile-edit', ensureAuthenticated, async (req, res) => {
     try {
         const user = req.user;
   
         user.name = req.body.name;
         user.email = req.body.email
         user.location = req.body.location
   
         await user.save();
         res.redirect('/dashboard/profile')
     }catch (err) {
         console.log(err);
     }
 })
    

//Others
router.get('/about', (req, res) => res.render('about'));

router.get('/help', (req, res) => res.render('help'));

router.get('/privacy', (req, res) => res.render('privacy'));

router.get('/terms', (req, res) => res.render('terms'));

router.get('/ridify', (req, res) => res.render('ridify'));

router.get('/feedback', (req, res) => res.render('feedback'));


 //new test
/*router.post('/create-offers', (req, res) => {

    const {destination, departure} = req.body

 const dash = new Dash({
       destination:destination,
       departure:departure
   }).save((err) => {
    if(err) res.json(err);
      else{ 
        res.redirect('/dashboard')
    }
  });
})*/

/*router.get('/dashboard/view-offers', (req, res) => {
    user.find({}, (err, data)=> {
        if(err) res.json(err);
        else res.render('dashboard', {users: data});
    });
})*/


module.exports = router;