var check = {
	check_login: function(req, res, next) {
		console.log("Checking session");
		console.log('user= '+req.session.user );
		console.log('email= '+req.session.email );
		if (req.session == undefined || req.session.user == undefined) {
			res.redirect("/login");
		} else {
			next();
		}
	}
};
module.exports = check;