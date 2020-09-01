const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json()); 

let users = [
    { id: shortid.generate(), name: 'Steve', bio: 'Student'  }
]

server.get("/api/users", (req, res) => {
    try {
    res.status(200).json(users);
    } catch(err) {
        res.status(500).json({ message: "there was an error" })
    }
});

server.post("/api/users", (req, res) => {
    const user = req.body;
    user.id = shortid.generate();
    if (user.name) {
        users.push(user);
        res.status(201).json(users);
    } else {
        res.status(404).json({ message: `There is no name for this user` });
    }

});

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    let found = users.find(u => u.id === id);
    if (found) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ message: `There is no user with id ${id}` });
    }
});

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    let found = users.find(u => u.id === id);
    if (found) {
        Object.assign(found, changes);
        res.status(200).json(users);
    } else {
        res.status(500).json({ message: `There is no user with id ${id}` });
    }
});

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    user = users.filter(u => u.id === id);
    res.status(204).end();
});

const PORT = 8008;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));