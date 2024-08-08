const { Schema, model } = require('mongoose');

const problemSchema = new Schema({
    starterCode: {
        type: String,
        required: true
    },
    answer: {
        type: Schema.Types.Mixed,
        required: true
    },
    solution: {
        type: String,
        required: true
    },
    tier: {
        type: Number,
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
})

const Problem = model('Problem', problemSchema)

module.exports = Problem