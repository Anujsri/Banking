var express     =   require('express');
var router      =   express.Router();
var User        =   require('../models/user');
var Borrower    =   require('../models/borrowe');
var Loan        =   require('../models/loanrequest')

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
    Borrower.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,borrower){
        if (err) throw err;
        req.flash('success_msg', 'You profile is changed!');
        res.json(borrower);    
    });          
});

router.get('/borrowerdetail/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    Borrower.findById(id,(err,borrower)=>{
        if(err) return err;
        res.json(borrower);
    })
})

router.get('/accept/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    Borrower.findById(id,(err,borrower)=>{
        borrower.accepted = true;
        borrower.save(()=>{
            req.flash('success_msg', 'You accepted the request!');
            res.json(borrower);
        });
    })
})

router.post('/loan/:id',ensureAuthenticated,(req,res,next)=>{
    var id = req.params.id;
    var amount  = req.body.amount;
    var accountnumber = req.body.accountnumber;
    var periodstart   = req.body.periodstart;
    var periodend     = req.body.periodend;
    var borrowerid    = id;
    var loanAdd = new Loan({
        amount        : amount,
        accountnumber : accountnumber,
        periodstart   : periodstart,
        periodend     : periodend,
        borrowerid    : borrowerid
    });
    loanAdd.save((err,loan)=>{
        req.flash('success_msg', 'You applied for loan!');
        res.json(loan);
    })
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