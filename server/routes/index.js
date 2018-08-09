const errors = require('restify-errors');
const Todo = require('../models/todo');

module.exports = function(server) {

  //
  // Todo Create
  //
	server.post('/todos', (req, res, next) => {
		let data = req.body || {};

		let todo = new Todo(data);
		todo.save(function(err, doc) {
			if (err) {
				console.error(err);
				return next(new errors.InternalError(err.message));
      }
      
			res.send(201, doc);
			next();
		});
	});

  //
  // Todo List
  //
	server.get('/todos', (req, res, next) => {
		Todo.find({}, function(err, docs) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(docs);
			next();
		});
  });

  //
  // Todo Update
  //
	server.put('/todos/:todo_id', (req, res, next) => {
		const data = req.body || {};

		if (!data._id) {
      data = { ...data, _id: req.params.todo_id }
		}

		Todo.findOne({ _id: req.params.todo_id }, function(err, doc) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			} else if (!doc) {
				return next(
					new errors.ResourceNotFoundError(
						'The resource you requested could not be found.',
					),
				);
			}

			Todo.update({ _id: data._id }, data, function(err) {
				if (err) {
					console.error(err);
					return next(
						new errors.InvalidContentError(err.errors.name.message),
					);
				}

				res.send(200, data);
				next();
			});
		});
	});

  //
  // Todo Delete
  //
	server.del('/todos/:todo_id', (req, res, next) => {
		Todo.remove({ _id: req.params.todo_id }, function(err) {
			if (err) {
				console.error(err);
				return next(
					new errors.InvalidContentError(err.errors.name.message),
				);
			}

			res.send(204);
			next();
		});
	});
};    