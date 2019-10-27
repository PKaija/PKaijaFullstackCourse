// eslint-disable-next-line no-unused-vars
const _ = require('lodash')
const User = require('../models/user')
const Blog = require('../models/blog')

const initialUsers = [
    {
        name: 'Root name',
        username: 'root',
        password: 'Secret'
    },
    {
        name: 'Ismo Laitela',
        username: 'IsmoL',
        password: 'dsfdss'
    },
    {
        name: 'Seppo Taalasmaa',
        username: 'SeppoT',
        password: 'dfgnjfd'
    }
]

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const initDBWithUsers = async () => {
    await User.deleteMany({})
    const newUsers = initialUsers.map(n => new User(n))
    const promiseArray = newUsers.map(o => o.save())
    await Promise.all(promiseArray)
}


const initDBWithBlogs = async () => {
    await Blog.deleteMany({})
    const newBlogs = initialBlogs.map(n => new Blog(n))
    const promiseArray = newBlogs.map(o => o.save())
    await Promise.all(promiseArray)
}





// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}




const totalLikes = (blogs) => {
    const array = blogs.map(blog => blog.likes)
    return blogs.length === 0
        ? 0
        : array.reduce((sum, item) => sum + item, 0)
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 1){
        return blogs[0]
    }else if(blogs.length === 0){
        return undefined
    }else{
        const likeArray = blogs.map(blog => blog.likes)
        const max = Math.max(...likeArray)
        return blogs.find(blog => blog.likes === max)
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }else if(blogs.length === 1){
        return {
            author: blogs[0].author,
            blogs: 1
        }
    }else{
        const listByBlogs = _.countBy(blogs, (blog) => blog.author)
        const max = _.maxBy(_.keys(listByBlogs), (o) => listByBlogs[o])
        return {
            author: max,
            blogs: listByBlogs[max]
        }
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }else if(blogs.length === 1){
        return {
            author: blogs[0].author,
            likes: blogs[0].likes
        }
    }else{
        const groupedBlogs = _.groupBy(blogs, (o) => o.author)
        const groupedBySum = _.keys(groupedBlogs).map(n => {
            return {
                author: n,
                likes: totalLikes(groupedBlogs[n])
            }
        })
        const max = _.maxBy(groupedBySum, (o) => o.likes)
        return max
    }
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(n => n.toJSON())
}



module.exports = {
    dummy,
    initialBlogs,
    initialUsers,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    usersInDb,
    initDBWithUsers,
    initDBWithBlogs
}