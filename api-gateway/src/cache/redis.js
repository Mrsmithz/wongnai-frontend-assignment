const {createClient} = require('redis')
const {logger} = require('../utils/logger')
let client
(async () => {
    client = createClient({url:process.env.REDIS})
    client.on('error', (err) => logger('Redis Client Error', err))
    client.on('connect', () => logger('Redis Client Connected'))
    await client.connect()
})()
module.exports = client