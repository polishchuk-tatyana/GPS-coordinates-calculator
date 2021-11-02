const {Router} = require('express')
const router = Router()
const {check, validationResult} = require('express-validator')
const haversine = require('../calculate_distance')

// /api/coordinates_calculator/calculator
router.post(
    '/calculator',
    [
        check('longitude_one', 'Empty field').exists().not().isEmpty(),
        check('latitude_one', 'Empty field').exists().not().isEmpty(),
        check('longitude_two', 'Empty field').exists().not().isEmpty(),
        check('latitude_two', 'Empty field').exists().not().isEmpty()
    ],

    async(request,response)=>{
    try{
        console.log('body', request.body)
        const errors = validationResult(request)

        if (!errors.isEmpty()){
            return response.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
            })
        }

        const {longitude_one, latitude_one, longitude_two, latitude_two} = request.body

        //
        // const longitude_one= -103.548851
        // const latitude_one= 32.0004311
        // const longitude_two = -103.6041946
        const distance = haversine(longitude_one, latitude_one, longitude_two, latitude_two)
        return response.status(200).json({distance})

    }
    catch (e){
        response.status(500).json({message:'Something wrong, please, try again'})
    }
})

module.exports = router