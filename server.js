const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require("./Database/db");
const listRoutes = require('./Routes/listRoutes');
const userRoutes = require('./Routes/userRoutes');
const emailRoutes = require('./Routes/emailRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connectDB();


app.use('/lists', listRoutes);
app.use('/users', userRoutes);
app.use('/emails', emailRoutes);

const PORT = process.env.PORT || 2000;
app.get('/', (req, res) => {
    res.send('Hello!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
