const request = require('supertest')
const app = require('./app')
const redis = require('./src/cache/redis')
const db = require('../json-server/db.json')
const Trips = db.trips
const HttpStatus = {
    OK:200,
    SERVICE_UNAVAILABLE:503,
    BAD_REQUEST:400,
    NOT_FOUND:404
}
const keywordCheck = (keyword, trips) => {
    const filteredTrips = trips.filter(trip => {
        return trip.title.includes(keyword) || trip.description.includes(keyword) ||
        //Filter tags with built-in filter function if length > 0 then is matched
        trip.tags.filter(tag => tag.includes(keyword)).length > 0
    })
    return filteredTrips.length > 0
}
describe('Trips API Testing', () => {
    afterAll(async () => {
        await redis.disconnect()
    })
    it('Should return OK', async () => {
        const response = await request(app).get('/api/v1/trips')
        expect(response.statusCode).toBe(HttpStatus.OK)
    })
    it('Should be instance of Array', async () => {
        const response = await request(app).get('/api/v1/trips')
        expect(response.body).toBeInstanceOf(Array)
    })
    it('Length should be same for all trips request', async () => {
        const response = await request(app).get('/api/v1/trips')
        expect(response.body.length).toEqual(Trips.length)
    })
    it('Should return trips about "หิมะ" ', async () => {
        const keyword = 'หิมะ'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "ภูเขา" ', async () => {
        const keyword = 'ภูเขา'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "ต่างประเทศ" ', async () => {
        const keyword = 'ต่างประเทศ'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "กิน" ', async () => {
        const keyword = 'กิน'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "เที่ยว" ', async () => {
        const keyword = 'เที่ยว'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "กาแฟ" ', async () => {
        const keyword = 'กาแฟ'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "เชียงใหม่" ', async () => {
        const keyword = 'เชียงใหม่'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return trips about "ชลบุรี" ', async () => {
        const keyword = 'ชลบุรี'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(keywordCheck(keyword, response.body)).toBeTruthy()
    })
    it('Should return Not found', async () => {
        const keyword = 'Not found'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(response.statusCode).toBe(HttpStatus.NOT_FOUND)
    })
    it('Should return ไม่พบข้อมูลที่ค้นหา', async () => {
        const keyword = 'Not found'
        const response = await request(app).get('/api/v1/trips').query({ keyword })
        expect(response.body.message).toMatch(/ไม่พบข้อมูลที่ค้นหา/)
    })
})