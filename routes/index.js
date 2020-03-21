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
router.get('/profile', ensureAuthenticated, (req, res) => 
            res.render('profile', {
                name: req.user.name,
                email: req.user.email,
                location: req.user.location
            }));





/*res.render('profile', 
{
    name: req.user.name,
    location: req.user.location
}
));*/
        

    

    //new test
router.post('/create-offers', (req, res) => {

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
})


// Get Single User for edit-profile

router.get('/edit/:id', (req, res) => {
    console.log(req.params.id);

    User.findById(req.params.id, (err, user) =>{
        if(err){
            console.log(err);
        } else{
            console.log(user);
            res.render('edit-profile', {User : user});
        }
    });
});


/*router.get('/dashboard/view-offers', (req, res) => {
    user.find({}, (err, data)=> {
        if(err) res.json(err);
        else res.render('dashboard', {users: data});
    });
})*/



//Others
router.get('/about', (req, res) => res.render('about'));

router.get('/help', (req, res) => res.render('help'));

router.get('/privacy', (req, res) => res.render('privacy'));

router.get('/terms', (req, res) => res.render('terms'));

router.get('/ridify', (req, res) => res.render('ridify'));

router.get('/feedback', (req, res) => res.render('feedback'));

module.exports = router;