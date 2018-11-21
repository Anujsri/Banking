var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Lender = require('../models/lender');
var Loan = require('../models/loanrequest');

 
router.post('/completeprofile/lender/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    User.findById(id,(err,user)=>{
        if(err) return err;
        var name = user.name;
        var email = user.email;
        var usertype = user.usertype;
        var phone = req.body.phone;
        var address = req.body.address;
        var city = req.body.city;
        var zip = req.body.zip;
        var state = req.body.state;
        var dob = req.body.dob;
        var userid = id;
        var completed = true;
        

        var lenderadd = new Lender({
            name : name,
            email : email,
            usertype : usertype,
            phone : phone,
            address : address,
            city : city,
            zip : zip,
            state : state,
            dob : dob,
            userid : userid,
            completed : completed
        });
        lenderadd.save((err,lender)=>{
            if(err) return err;
            req.flash('success_msg', 'You profile is saved!');
            res.json(lender);
        });
    });   
});


router.put('/editprofile/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id; 
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;
    var newvalues = { 
        $set: {
            name : name,
            phone: phone, 
            address: address,
            city : city,
            state : state,
            zip : zip
        } 
    };
    Lender.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,lender){
        if (err) throw err;
        req.flash('success_msg', 'You profile is changed!');
        res.json(lender);    
    });          
});

router.get('/lenderdetail/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    Lender.findById(id,(err,lender)=>{
        if(err) return err;
        res.json(lender);
    })
})


router.get('/accept/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    Lender.findById(id,(err,lender)=>{
        lender.accepted = true;
        lender.save(()=>{
            req.flash('success_msg', 'You accepted the request!');
            res.json(lender);
        });
    })
})

router.put('/acceptloan/:id',ensureAuthenticated,(req,res,next)=>{
    var lenderid = req.body.lenderid;
    var id = req.params.id;
    var status = true;
    var newvalues = { 
        $set: {
             status : status,
             lenderid : lenderid
        } 
    };

    Loan.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,loan){
        if (err) throw err;
        req.flash('success_msg', 'You accepted loan request!');
        res.json(loan);    
    });    

})
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