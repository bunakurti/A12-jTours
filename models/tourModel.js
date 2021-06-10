const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: [true, "A tour must have a name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        requried: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        requried: [true, "A tour must have a group size"]

    },
    difficulty: {
        type: String,
        requried: [true, "A tour must have a difficulty"]

    },
    ratingAverage: {
        type: String,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        requried: [true, "A tour must have a price"]
    },
    priceDiscount: Number,

    summary: {
        type: String,
        requried: [true, "A tour must have a description"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        requried: [true, "A tour must have a cover image"]
    },
    images: [String],

    createdAt: {
        type: Date,
        default: Date.now()
    },
    staredDate: [Date]
})

//tabela
const tour = mongoose.model("tour", tourSchema)

module.exports = tour