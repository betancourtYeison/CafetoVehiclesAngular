var rootService = require('../services/root/root');
var vehicleService = require('../services/vehicle/vehicle');

module.exports = (expressApp) => {
    expressApp.use('/', rootService);
    expressApp.use('/vehicle', vehicleService);

    return expressApp;
};