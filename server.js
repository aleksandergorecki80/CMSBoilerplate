const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();

app.get('/', (req, res) => res.send('App is running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

console.log(process.env.NODE_ENV)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

module.exports = server;