var express = require('express');
var router = express.Router();
 
// Get Homepage
router.get('/',  function(req, res){
    if(ensureAuthenticated){
        res.redirect('/usertype');
    }
    else{
        res.redirect('/user/login');
    }
	
});


 

//Check whether user is authenticted or not
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;