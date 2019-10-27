const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('userId')
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response, next) => {
    try{
        const blog = await Blog.findById(request.params.id)
        if(blog){
            response.json(blog.toJSON())
        }else{
            response.status(404).end()
        }
    }catch(error){
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {

    try{
        const body = request.body
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if(!token || !decodedToken.id){
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            userId: user._id
        })
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)

        await user.save()
        response.json(savedBlog.toJSON())
    }catch(error){
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try{
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id){
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }catch(error){
        next(error)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        response.json(updatedBlog)
    }catch(error){
        next(error)
    }
})

module.exports = blogRouter