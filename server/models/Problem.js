const { Schema, model } = require('mongoose');

const problemSchema = new Schema({
    
    starterCode: {
        type: String,
        required: true
    },
    answers: [
        {
        type: Schema.Types.Mixed,
        required: true
    }
],
    tests: [
        {
        type: String,
        required: true
    }
],
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
    },
    lore: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const Problem = model('Problem', problemSchema)

module.exports = Problem