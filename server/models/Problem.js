const { Schema, model } = require('mongoose');

const problemSchema = new Schema({
    starterCode: {
        type: String,
        required: true
    },
    answer: {
        type: Mixed,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    tier: {
        type: Number,
        required: true
    }
})

const Problem = model('Problem', problemSchema)

module.exports = Problem