const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: "./config.env" })

const app = require('./app')

const DB = process.env.DATABASE.replace(
    '<password>', process.env.DATABASE_PASSWORD
)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection succesful'))

const tourSchema = new mongoose.Schema({
    name:{
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

//e mbushim tabelen
const testTour = new tour ({
    name: "paris",
    rating: 4.3,
    price: 233
})

testTour.save().then(doc =>{
    console.log(doc)
}).catch(err =>{
    console.log('error')
})


app.listen(3000, () => {
    console.log("Server is listeing")
})

