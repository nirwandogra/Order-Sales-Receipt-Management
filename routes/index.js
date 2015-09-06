var path = require('../path');
module.exports = function(app) {
	require('./search')(app);
	require('./profile')(app);
	require('./user')(app);
	require('./login')(app);
	app.get('/basic-tables.html',function(req,res) {
		res.sendFile(path.table);
	});
};