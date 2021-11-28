require('dotenv').config()
const {logger} = require('./src/utils/logger')
// Get port from environment file or use default
const PORT = process.env.PORT || 8081
const app = require('./app')

// Start server
app.listen(PORT, () => {
    logger(`App start listening at port ${PORT}`)
})