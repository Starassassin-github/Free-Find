const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors())

const api = process.env.API_URL

const postsRouter = require('./routers/post');

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// router
app.use(`${api}/posts`, postsRouter)



// connect Database
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database Connection is Already');
})
.catch((err) => {
    console.log(err);
})

app.listen(3333, () => {
    console.log(api);
    console.log('server is running on port: 3333');
});