const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)



/*
THE TESTS ARE BROKEN
*/

beforeEach(async () => {
    helper.initDBWithUsers()
    helper.initDBWithBlogs()
})

describe('Testing GET All blogs', () => {
    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('GET returns all blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('The second blog is made by Edsger W. Dijkstra', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(n => n.author)
        expect(contents).toContain('Edsger W. Dijkstra')
    })
})

describe('Testing POST blog', () => {
    test('A valid blog can be added', async () => {
        const newBlog = {
            title: 'TestBlog1',
            author: 'Test Author1',
            url: 'TestUrl1',
            likes: 5
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const contents = response.body.map(n => n.title)
        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
        expect(contents).toContain('TestBlog1')
    })
    test('Invalid blog is not added', async () => {
        const invalidBlog = {
            author: 'TestAuthor2'
        }
        await api
            .post('/api/blogs')
            .send(invalidBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })
})


describe('Testing blog validation', () => {
    test('Blog id is correctly defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('If number of likes is not given, it defaults to 0', async () => {
        const newBlog = {
            title: 'TestTitle3',
            author: 'TestAuthor3',
            url: 'TestUrl3'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        expect(response.body[helper.initialBlogs.length].likes).toEqual(0)
    })
})

describe('Testing GET blog by id', () => {
    test('GET returns correct object when supplied with valid and existing id', async () => {
        const validID = helper.initialBlogs[0]._id
        const response = await api
            .get(`/api/blogs/${validID}`)
            .expect(200)
        expect(response.body.id).toEqual(validID)
    })

    test('GET returns 404 when supplied with a valid id that does not exist', async () => {
        const nonExistingID = '5a422aa71b54a676234d17f9'
        await api
            .get(`/api/blogs/${nonExistingID}`)
            .expect(404)
    })

    test('GET returns a 400 malformatted id -error when given an invalid id', async () => {
        const invalidID = '1'
        await api
            .get(`/api/blogs/${invalidID}`)
            .expect(400)
    })
})

describe('Testing PUT', () => {
    test('PUT correctly updates the blog', async () => {
        const oldBlog = helper.initialBlogs[0]
        const updateID = oldBlog._id
        const newBody = {
            title: oldBlog.title,
            author: oldBlog.author,
            url: oldBlog.author,
            likes: 10
        }
        const response = await api
            .put(`/api/blogs/${updateID}`)
            .send(newBody)
            .expect(200)
        expect(response.body.likes).toBe(10)
    })
})







afterAll(() => {
    mongoose.connection.close()
})