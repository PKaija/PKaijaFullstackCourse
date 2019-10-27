const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

/*
THE TESTS ARE BROKEN
*/

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const user = new User({
        name: 'Root Name',
        username: 'root',
        password: 'Secret'
    })
    await user.save()
})

describe('Testing GET users', () => {
    test('GET users works correctly', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.length).toBe(1)
        expect(response.body.map(n => n.username)).toContain('root')
    })
})

describe('Testing POST user', () => {
    test('Adds valid user', async () => {
        const usersAtStart  = await helper.usersInDb()
        const newUser = {
            username: 'TestUsername1',
            name: 'Test test 1',
            password: 'Password1'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersNow = await helper.usersInDb()
        const usernames = usersNow.map(n => n.username)
        expect(usersNow.length).toBe(usersAtStart.length + 1)
        expect(usernames).toContain(newUser.username)
    })

    test('User without required parameters are not added', async () => {
        const invalidUser = {
            username: 'sf',
            name: 'Fdsa'
        }
        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
        expect(response.body.error).toContain('Password is required')
    })
    test('User with malformed parameters are not added', async () => {
        const invalidUser = {
            username: 'sf',
            name: 'Fdsa',
            password: 'fd'
        }
        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
    })
    test('Users with non-unique usernames are not added', async () => {
        const invalidUser = {
            name: 'Root Name',
            username: 'root',
            password: 'Secret'
        }
        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
    })
})

describe('Testing adding blogs with users', () => {
    test('POST Blog works correctly', async () => {

        const newBlog = {
            title: 'TestBlogWithUser1',
            author: 'Testauthor',
            url: 'fdsdfsdfsdf'
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
        const users = await api.get('/api/users')
        expect(users.body[0].id).toEqual(response.body.userId)
    })
})


afterAll(() => {
    mongoose.connection.close()
})