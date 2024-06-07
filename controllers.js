
const data = require('./controllers_DB')
module.exports = {
     async get(req, res) { 
        try {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(await data.getUsers()));
        } catch (e) {
            console.log(e)
        }
    },
     async add(req, res) {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const parsedBody = new URLSearchParams(body)
                const name = parsedBody.get('name')
                const age = parsedBody.get('age')
                if (name && age) {
                    const user = {name, age: parseInt(age)};
                    const createdUser = await data.addUser(user);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(createdUser));
                }
            });
        } catch (e) {
            console.log(e)
        }
     },
      async update(req, res) {
        try {
            const id = parseInt(req.url.split('/')[2]);
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                const parsedBody = new URLSearchParams(body)
                const updatedData = {}
                for (const [key, value] of parsedBody) {
                    updatedData[key] = key === 'age' ? parseInt(value):value
                }
                const user = await data.updateUser(id, updatedData);
                
                if(user) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({message: 'Updated'}));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User not found' }));
                }
            })
            
            
                
        } catch (e) {
            console.log(e)
        }
      },
     async getById(req,res) {
        try {
            const id = parseInt(req.url.split('/')[2]);
            const user = await data.getUserById(id);;
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        } catch(e) {
            console.log(e)
        }
     },
     async deleteById(req,res) {
        try {
            const id = parseInt(req.url.split('/')[2]);
            const deleted = await data.deleteUser(id);
            if (deleted) {
                res.writeHead(200)
                res.end(JSON.stringify({message: 'User deleted successfully'}));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        } catch (e) {
            console.log(e)
        }
     },
}

 