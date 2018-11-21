var mongoose = require('mongoose');

// User Schema
var LoanSchema = mongoose.Schema({
	amount:{
		type:String
	},
	accountnumber:{
		type: String
	},
	periodstart:{
		type: Date
	},
	periodend:{
		type: Date
	},
	status : {
		type : Boolean,
		default  : false
	},
	lenderid : {
		type : String
	},
	borrowerid : {
		type : String
	}
});

var Loan = module.exports = mongoose.model('Loan',LoanSchema);
