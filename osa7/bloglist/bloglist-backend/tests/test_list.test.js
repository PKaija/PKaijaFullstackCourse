const listHelper = require('../utils/list_helper')
const blogs = [
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
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

test('dummy returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('Total likes', () => {

    test('If list has one blog, returns the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('Returns correct sum', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
    test('Returns 0 with empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})

describe('Blog with most likes', () => {
    test('If list has one blog, the function returns it', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })
    test('If list has no blogs, the function returns undefined', () => {
        const result = listHelper.favouriteBlog([])
        expect(result).toEqual(undefined)
    })
    test('If list has more than one blog, returns the blog with the most likes', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})

describe('Author with most blogs', () => {
    test('If list has one blog, returns corresponding object', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        const expected = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        expect(result).toEqual(expected)
    })
    test('If list has no blogs, the function returns undefined', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(undefined)
    })
    test('If list has more than one blog, returns an object with the name of the author and number of blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expected)
    })
})

describe('Author with most likes', () => {
    test('If list has one blog, returns corresponding object', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expected)
    })
    test('If list has no blogs, the function returns undefined', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual(undefined)
    })
    test('If list has more than one blog, returns an object with the name of the author and number of likes', () => {
        const result = listHelper.mostLikes(blogs)
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expected)
    })
})