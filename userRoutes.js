
const url = require('url') 
const path = require('path')
const {get, getById, add, update, deleteById} = require('./controllers')

const userRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const method = req.method
    const path = parsedUrl.pathname

    if(method === 'GET' && path === '/users') {
        get(req, res)
    } else if(method === 'GET' && path.startsWith('/users/')) {
        getById(req, res)
    } else if(method === 'POST' && path === '/users') {
        add(req, res)
    } else if(method === 'PUT' && path.startsWith('/users/')) {
        update(req, res)
    } else if(method === 'DELETE' && path.startsWith('/users/')) {
        deleteById(req, res)
    }
}


module.exports = userRoutes