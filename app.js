const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use((req, res, next) =>{
//     res.status(200).json({
//         message: "it works!!"
//     });
// });
app.use(morgan('dev'));

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: error.message 
        }
    })
})

module.exports = app;