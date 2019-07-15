// Requires
var express = require('express');
var app = express();
var vehicles = require('../../data/vehicle-model.json')

// Import utils
var utils = require('../../utils/utils');

// Global variables
var pathFileData = './src/data/vehicle-model.json';

// Get all vehicles
app.get('/', (req, res) => {
    
    if(vehicles && vehicles.length <= 0){
        return res.status(200).json({
            succes: true,
            message: 'The list of the vehicles is empty.',
            data: {}
        })
    }

    res.status(200).json({
        succes: true,
        data: vehicles
    });
});

// Get vehicle by any propierty
app.get('/filterVehicle', (req, res) => {
    
    var expectFilterType = ['color', 'brand', 'line', 'model', 'id'],
        filterType = req.query.filterType,
        filterValue = req.query.filterValue;

    if(expectFilterType.includes(filterType)) {
        // Call function to filter array
        utils.filterVehicle(vehicles, filterType, filterValue)
            .then( response => {
                res.status(200).json({
                    succes: true,
                    data: response
                });
            })
            .catch( err => {
                res.status(404).json({
                    succes: false,
                    message: err.message
                });
            })
    } else{
        return res.status(400).json({
            succes: false,
            message: "Must provide any enum 'color', 'brand',  'line', 'model' or 'id' filter."
        })
    }
});

// Create a new vehicle
app.post('/create', (req, res) => {

    var id = req.body.id,
        brand = req.body.brand,
        line = req.body.line,
        model = req.body.model,
        color = req.body.color;
        

    if(id && brand && line && model && color){
        var newVehicle = {
            id,
            brand,
            line,
            model,
            color
        }
        
        // Include new vehicle in array of vehicles
        vehicles.push(newVehicle);

        // Write in JSON file
        utils.inputNewRegisterInJsonFile(pathFileData, vehicles);

        res.status(200).json({
            succes: true,
            message: "The vehicle has been created success."
        })
    } else{
        res.status(400).json({
            succes: false,
            message: "Must provide the next params 'color', 'brand',  'line', 'model' or 'id'."
        })
    }
});

// Update a vehicle by id
app.post('/update', (req, res) => {

    var id = req.body.id,
        color = req.body.color,
        brand = req.body.brand,
        line = req.body.line,
        model = req.body.model;

    if(id){
        var index = vehicles.findIndex( (result) => {
            return String(result.id).toUpperCase() === String(id).toUpperCase()
        });
        
        if(index > -1) {
            vehicles[index].color = color ? color : vehicles[index].color;
            vehicles[index].brand = brand ? brand : vehicles[index].brand;
            vehicles[index].line = line ? line : vehicles[index].line;
            vehicles[index].model = model ? model : vehicles[index].model;

            // Write in JSON file
            utils.inputNewRegisterInJsonFile(pathFileData, vehicles);

            res.status(200).json({
                succes: true,
                message: "The vehicle has been updated success."
            });
        } else {
            res.status(404).json({
                succes: false,
                message: `Could not update because does not exist a vehicle with id ${id}`
            });
        }
    } else {
        res.status(400).json({
            succes: false,
            message: "Must provide the id param."
        });
    }
});

// Delete one vehicle by id
app.post('/delete', (req, res) => {
    var id = req.body.id;

    if(id){
        var index = vehicles.findIndex( (result) => {
            return String(result.id).toUpperCase() === id.toUpperCase()
        });
        
        if(index > -1) {
            vehicles = vehicles.filter( (result) => {
                return String(result.id).toUpperCase() !== String(id)
            });

            // Write in JSON file
            utils.inputNewRegisterInJsonFile(pathFileData, vehicles);

            res.status(200).json({
                succes: true,
                message: `The vehicle with id ${id} has been deleted success.`
            });
        } else {
            res.status(404).json({
                succes: false,
                message: `Could not update because does not exist a vehicle with id ${id}`
            });
        }
    } else {
        res.status(400).json({
            succes: false,
            message: "Must provide the id param."
        });
    }

});

module.exports = app;