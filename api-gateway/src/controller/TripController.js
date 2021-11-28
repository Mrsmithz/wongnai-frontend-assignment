const { getAllTrips } = require('../service/TripService')
const redisClient = require('../cache/redis')
const {logger} = require('../utils/logger')
const HttpStatus = {
    OK:200,
    SERVICE_UNAVAILABLE:503,
    BAD_REQUEST:400,
    NOT_FOUND:404
}
const TIMES = {
    TEN_MINUTES: 1000 * 60 * 10
}

module.exports.getTrips = async (req, res, next) => {
    try{
        // Check if keyword query is provided
        if (req.query.keyword){
            const keyword = req.query.keyword

            // Check is any cached in cache store
            const cached = await redisClient.get(keyword)
            // If there is cached we return cache to client
            if (cached){
                logger(`Cache ${keyword} Hit`)
                return res.status(HttpStatus.OK).send(JSON.parse(cached))
            }
            logger(`Cache ${keyword} Miss`)
            // Get all trips from TripService
            const trips = await getAllTrips()
            logger(`Get all trips`)

            // Filter trips by checking substring of title, description and tags
            const filteredTrips = trips.filter(trip => {
                return trip.title.includes(keyword) || trip.description.includes(keyword) ||
                //Filter tags with built-in filter function if length > 0 then is matched
                trip.tags.filter(tag => tag.includes(keyword)).length > 0
            })


            // If there is no matched we send 404 Error and message
            if (filteredTrips.length == 0){
                const response = {
                    message: "ไม่พบข้อมูลที่ค้นหา"
                }
                return res.status(HttpStatus.NOT_FOUND).send(response)
            }

            // Set cache with provided keyword for fast query next time
            await redisClient.set(keyword, JSON.stringify(filteredTrips), {
                EX: TIMES.TEN_MINUTES
            })
            logger(`Set Cache ${keyword}`)
            // Send filtered trips to client
            return res.status(HttpStatus.OK).send(filteredTrips)
        }
        // if there is no keyword provided we send all trips to client
        else if (req.query.keyword == null){

            logger(`No keyword provided`)
            // Get all trips from TripService
            const trips = await getAllTrips()
            return res.status(HttpStatus.OK).send(trips)
        }
    }
    catch(err){
        console.log(err)
        // In case json_server is down or something went wrong
        return res.status(HttpStatus.SERVICE_UNAVAILABLE).send()
    }
}