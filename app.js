const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const app = express()

//1) MIDDELWARE
// middelware - mes req, res
app.use(express.json())

app.use(morgan('dev'))

app.use((req,res,next)=>{
    console.log("helo from the middelware")
    next()
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString()
    next()
})


// e kem lexu filen i cili i permban te gjitha tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.json({
        status: "success",
        data: { tours }
    })
}

const createTour = (req, res) => {
    // console.log(req.body)

    // ka me u shtu nje dokument i ri
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.json({
            status: "success",
            data: {
                tour: newTour
            }
        })

    })
}

const getTour = (req, res) => {
    console.log(req.params)

    // po e marrim id-n dhe po e konvertojm ne string
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        return res.json({
            status: "fail",
            message: "Invaild ID"

        })
    }

    res.json({
        status: "success",
        data: {
            tour
        }
    })

}

const updateTour = (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "success",
        data: {
            tour: "Updated tour"
        }
    })

}

const deleteTour = (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "succsess",
        data: null
    })
}

const getAllUsers = (req,res)=>{
    res.json({
        status:"error",
        message:"this rout is not yet defined"
    })
}

const createUsers = (req,res)=>{
    res.json({
        status:"error",
        message:"this rout is not yet defined"
    })
}

const getUser = (req,res)=>{
    res.json({
        status:"error",
        message:"this rout is not yet defined"
    })
}

const updateUser = (req,res)=>{
    res.json({
        status:"error",
        message:"this rout is not yet defined"
    })
}

const deleteUser = (req,res)=>{
    res.json({
        status:"error",
        message:"this rout is not yet defined"
    })
}

//3) ROUTE
app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)


app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

app
    .route('/api/v1/users')
    .get(getAllUsers)
    .post(createUsers)

app
    .route('/api/v1/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)


app.patch('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "success",
        data: {
            tour: "Updated tour"
        }
    })

})

app.delete('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id
    if (id > tours.length) {
        return res.json({
            status: "fail",
            messages: "Invalid ID"
        })
    }

    res.json({
        status: "succsess",
        data: null
    })
})


//4) SERVER
app.listen(3000, () => {
    console.log("Server is listeing")
})