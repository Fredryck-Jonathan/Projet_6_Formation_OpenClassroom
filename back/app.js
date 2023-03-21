const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');

const helmet = require("helmet");
require('dotenv').config();

const corsOption = {origin:"*"};


const app = express();

app.use(mongoSanitize());
app.use(cors(corsOption))
app.use(helmet({crossOriginEmbedderPolicy: false}));


mongoose.connect(process.env.MONGO_ADDRESS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', corsOption.origin)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
    next();
});

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);




module.exports = app;