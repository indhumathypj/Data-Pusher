const express = require('express');
const bodyParser = require('body-parser');
const accountRoutes = require('./routes/account');
const destinationRoutes = require('./routes/destination');
const incomingRoutes = require('./routes/incoming');

const app = express();

app.use(bodyParser.json());

app.use('/account', accountRoutes);
app.use('/destination', destinationRoutes);
app.use('/server', incomingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
