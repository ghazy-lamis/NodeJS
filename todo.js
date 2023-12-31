const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['complete', 'incomplete'],
        default: 'incomplete'
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
