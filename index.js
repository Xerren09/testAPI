const express = require('express');
const app = express();
const port = process.env.PORT || 1337;
const logger = require('morgan');
app.use(logger('dev'));
app.use(express.json());

const memStorage = {
    users: []
};

app.post('/auth/login', function(req, res) {
    const id = memStorage.users.findIndex(element => element.username == req.body.username && element.password == req.body.password);
    if (id != -1)
    {
        res.status(200).json({success: true, username: req.body.username, id: id});
    }
    else
    {
        res.status(401).json({success: false, username: undefined, id: undefined, err: "Incorrect username or password."});
    }
});

app.post('/auth/register', function(req, res) {
    if (memStorage.users.findIndex(element => element.username == req.body.username) == -1)
    {
        memStorage.users.push({username: req.body.username, password: req.body.password});
        res.status(200).json({success: true, username: req.body.username, id: memStorage.users.length-1});
    }
    else
    {
        res.status(401).json({success: false, username: undefined, id: undefined, err: "Username already exists."});
    }
});

app.listen(port, () => console.log(`Application listening on port ${port}.`));
