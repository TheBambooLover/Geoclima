const axios = require('axios');

console.log(process.argv);

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Buenos Aires'];

    constructor() {
        //TODO:leer DB si existe
    }

    get paramsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        }
    }

    async ciudad(lugar = '') {
        try {
            //Petición HTTP
            const instance = axios.create({
                baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
                params: this.paramsMapbox
            });
            const resp = await instance.get(`${lugar}.json`);
            console.log(resp.data)
            return [];

        } catch (error) {
            console.log(`No se encontró ninguna información`.red);
            console.log(error);
            return [];
        }

        //Retonarlos lugares quecoincidancon lo solicitado
    }


}


module.exports = Busquedas;