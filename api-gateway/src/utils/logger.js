module.exports.logger = (msg) => {
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    console.log(`${date} ${time} : ${msg}`)
}