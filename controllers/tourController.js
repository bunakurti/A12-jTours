const Tour = require('./../models/tourModel')

// const fs = require('fs')

// e kem lexu filen i cili i permban te gjitha tours
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// exports.checkId = (req, res, next,val)=>{
//     console.log(`tour id: ${val}`)


//     if(req.params.id*1> tours.length){
//         return res.json({
//             status:"fail",
//             message:"invalid ID"
//         })
//     }
//     next()
// }

// exports.checkBody = (req,res,next )=>{

//     if(!req.body.name || !req.body.price ){
//         return res.json({
//             status:"fail",
//             message:"missing name or price"
//         })
//     }

//     next()
// }

exports.getAllTours = async (req, res) => {

    try {

        const queryObj = { ...req.query } //new object
        const excludedFields = ['page', 'sort', 'limit', 'fields'] //fushat qe nuk dojm me i perfshi ne filtrim
        excludedFields.forEach(el => delete queryObj[el])

        //convert query to string
        let queryStr = JSON.stringify(queryObj)//e bojm string objektin
        queryStr = queryStr.replace(/\b(gte|gt|lte|it)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))

        console.log("req.query", req.query, "req.queryObj", queryObj)

        const query = Tour.find(JSON.parse(queryStr))

        const tours = await query

        res.json({
            status: "success",
            results: tours.length,
            data: { tours }
        })
    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
}

exports.createTour = async (req, res) => {
    //opcion 1
    //const newTour = new Tour({})
    //newTour.save()

    try {
        const newTour = await tour.create(req.body)
        res.json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    }
    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
}


exports.getTour = async (req, res) => {
    console.log(req.params)

    try {

        const tour = await Tour.findById(req.params.id)

        res.json({
            status: "success",
            data: { tour }
        })

    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
    // // po e marrim id-n dhe po e konvertojm ne string
    // const id = req.params.id * 1
    // const tour = tours.find(el => el.id === id)

    // res.json({
    //     status: "success",
    //     data: {
    //         tour
    //     }
    // })

}

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.json({
            status: "success",
            data: {
                tour
            }
        })
    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }


}

exports.deleteTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        res.json({
            status: "succsess",
            data: null
        })
    }

    catch (err) {
        res.json({
            status: "fail",
            message: err
        })
    }
}