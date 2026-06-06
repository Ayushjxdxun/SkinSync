const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use (express.json());

app.use(cookieParser());

const authRouter = require('./routes/auth.routes');
app.use('/api/auth', authRouter);

// Add this temporarily to test your server
app.get('/test', (req, res) => {
    res.send("Express is working!");
});
module.exports = app;