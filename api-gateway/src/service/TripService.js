require('dotenv').config()
const axios = require('axios')
const json_server = process.env.JSON_SERVER

module.exports.getAllTrips = async () => {

    // fetch trips data from json_server
    const response = await axios.get(json_server+"/trips")
    return response?.data
}