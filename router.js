
const url = require('url');
const path = require('path');
const userRoutes = require('./userRoutes')

const routeHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === '/users' || path.startsWith('/users/')) {
        userRoutes(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}

module.exports = routeHandler