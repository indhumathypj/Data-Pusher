const axios = require('axios');
const destinationModel = require('../models/destinationModel');

const handleIncomingData = (req, res) => {
    const { account } = req;
    const data = req.body;

    destinationModel.getDestinationsByAccountId(account.id, (err, destinations) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching destinations' });
        }
        //return res.json({destinations})
        destinations.forEach(destination => {
            const headers = JSON.parse(destination.headers);
            if (destination.http_method.toLowerCase() === 'get') {
                axios.get(destination.url, { params: data, headers })
                    .catch(err => console.error('Error sending data to destination:', err));
            } else {
                axios({
                    method: destination.http_method.toLowerCase(),
                    url: destination.url,
                    data,
                    headers
                }).catch(err => console.error('Error sending data to destination:', err.message));
            }
        });

        res.status(200).json({ message: 'Data sent successfully' });
    });
};

module.exports = { handleIncomingData };
