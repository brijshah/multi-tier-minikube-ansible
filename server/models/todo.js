const mongoose = require('mongoose');

// mongoose Todo schema
// This configures what fields are under Todo, want a label+status
// mongoose model will expose functions that communicate with the mongodb
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