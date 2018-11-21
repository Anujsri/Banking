var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Lender = require('../models/lender');
var Borrower = require('../models/borrowe');
var Loan  = require('../models/loanrequest');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res,next){

	if(req.user.usertype === "Admin"){
        Lender.find({ $and: [ { completed: true }, { usertype: "Lender" } ] })
        .lean().exec(function(err,lender){
            if(err) return err;
            Borrower.find({ $and: [ { completed: true }, { usertype: "Borrower" } ] })
            .lean().exec(function(err,borrower){
                if(err) return err;
                res.render('admin',{
                    lender,
                    borrower
                });
             });    
        });  
    }

    if(req.user.usertype === "Lender"){
        Lender.findOne({userid : req.user._id},(err,lender,next)=>{
            if(err) return err;
            if(!lender){
                res.render('lender',{
                    lender,
                });   
            }
            else{
                Loan.find({status : false},(err,loan)=>{
                if(err) return err;
                Loan.find({lenderid : lender._id},(err,loanac)=>{
                    if(err) return err;
                    var len = loan.length;
                    var lenac = loanac.length;
                    res.render('lender',{
                        lender,
                        loan,
                        len,
                        loanac,
                        lenac
                    });    
                });
            });
            }
            
        });
    }

    if(req.user.usertype === "Borrower"){
        Borrower.findOne({userid : req.user._id},(err,borrower)=>{
            if(err) return err;
            if(!borrower){
                res.render('borrower',{
                    borrower,
                });   
            }
            else{
                Loan.find({borrowerid : borrower._id},(err,loan)=>{
                    if(err) return err;
                    res.render('borrower',{
                        borrower,
                        loan
                    });   
                });
            }
        }); 
    }

    if (!req.user.usertype) {
        res.render('user');
    }
});

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


router.put('/lender/editprofile/:id',ensureAuthenticated,(req,res,next)=>{
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

router.post('/completeprofile/borrower/:id',ensureAuthenticated,(req,res,next)=>{
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
        

        var borroweradd = new Borrower({
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
        borroweradd.save((err,borrower)=>{
            if(err) return err;
            req.flash('success_msg', 'You profile is saved!');
            res.json(borrower);
        });
    });   
});

router.put('/borrower/editprofile/:id',ensureAuthenticated,(req,res,next)=>{
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
    Borrower.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,borrower,next){
        if (err) throw err;
        req.flash('success_msg', 'You profile is changed!');
        res.json(lborrower);    
    });          
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