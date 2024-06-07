
const http = require('http')
const routeHandler = require('./router')
const PORT = 5000
const server = http.createServer(routeHandler)


async function start () {
    try {
        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`)
          })
    } catch (err) {
        console.log(err);
    }
}


start() 