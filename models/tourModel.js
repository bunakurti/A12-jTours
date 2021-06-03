const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.0
    },
    price: {
        type: Number,
        requried: [true, "A tour must have a price"]
    }
})

//tabela
const tour = mongoose.model("tour", tourSchema)

module.exports = tour