const mongoose = require('mongoose');

// Connect to MongoDB with url
const connectDB = async (connectionUrl) => {
	if (!connectionUrl || connectionUrl == '') {
		return;
	}
	try {
		await mongoose.connect(connectionUrl, {
			serverSelectionTimeoutMS: 10000,
			connectTimeoutMS: 5000,
			minPoolSize: 5,
			maxPoolSize: 100,
			autoCreate: true,
			autoIndex: true
		});
	} catch (err) {
		console.log('Unable to connect to DB: ' + err);
	}
	return mongoose.connection;
};

module.exports = connectDB;
