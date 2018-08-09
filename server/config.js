module.exports = {
	PORT: process.env.PORT || 8080,
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://mongodb-service:27017/api',
	},
};