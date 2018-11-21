var mongoose = require('mongoose');

// Manufacture Schema
var BorrowerSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	}, 
	email: {
		type: String,
		required: true,
		 
	},
	phone: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state:{
        type:String,
        required: true
	},
	zip:{
		type:Number,
		required: true
	},
	userid:{
		type:String,
		required: true
	},
	usertype:
	{
		type:String,
		required: true
	},
	dob  :  
	{
	    type: Date, 
	    default: Date.now,
	    required: true
	},
	image_url:{
		type: String,
		default: "http://icons.iconarchive.com/icons/icons-land/vista-people/256/Person-Male-Light-icon.png"
	},
	completed : {
		type : Boolean,
		default : false
	},
	lenderid : {
		type : String
	},
	accepted : {
		type : Boolean,
		default : false
	}

});

var Borrower = module.exports = mongoose.model('Borrower', BorrowerSchema);

 

 