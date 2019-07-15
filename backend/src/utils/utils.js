var fileSystem = require('fs');


function filterVehicle(array, filterType, filterValue) {
    return new Promise((resolve, reject) => {
        const data = array.filter((result) => {
            return result[filterType].toUpperCase().indexOf(filterValue.toUpperCase()) > -1
        })

        if (!data || data.length === 0) {
            reject({
                message: `There are not result for the filter ${filterType} and the value ${filterValue}`
            })
        }
        resolve(data)
    })
}

function inputNewRegisterInJsonFile(pathFile, newRegister) {
    fileSystem.writeFileSync(pathFile, JSON.stringify(newRegister), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    filterVehicle,
    inputNewRegisterInJsonFile
}