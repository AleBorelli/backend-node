const router= require('express').Router()
let Exercise=require('../models/exercise.model')

router.route('/').get((req,res) =>{
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
        .then(() => res.json('Ejercicio agregado'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.param.id)
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.param.id)
        .then(() => res.json('Ejercicio eliminado'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.param.id)
        .then(exercises => {
            exercises.username = req.body.username
            exercises.description = req.body.description
            exercises.duration = Number(req.body.duration)
            exercises.date = Date.parse(req.body.date)

            exercises.save()
                .then(() => res.json('Ejercicio actualizado.'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router

