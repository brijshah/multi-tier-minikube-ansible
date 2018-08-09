const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
	{
		label: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['pending', 'complete'],
			default: 'pending',
		},
	},
	{ minimize: false },
);

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;    