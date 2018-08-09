const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const mongoose = require('mongoose');

const config = require('./config');
const routes = require('./routes');

const server = restify.createServer();

//
// MiddleWare
//
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  origins: ['*']
})

server.pre(cors.preflight)
server.use(cors.actual)


server.listen(config.PORT, function() {
	mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri, { useNewUrlParser: true });

  const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
      routes(server);
      console.log('%s listening at %s', server.name, server.url);
	});
});