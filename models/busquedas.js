const fs = require('fs')

const axios = require('axios');
console.log(process.argv);

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map(lugar =>{
            let palabras =  lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase()+p.substring(1));

            return palabras.join(' ');
        })
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        }
    }

    get paramsOpenweather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric'
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
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],

            }));

        } catch (error) {
            console.log(`No se encontró ninguna información`.red);
            console.log(error);
            return [];
        }

        //Retonarlos lugares quecoincidancon lo solicitado
    }

    async climaLugar(lat, lon) {
        try {
            //Instance
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsOpenweather, lat, lon }
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                description: weather[0].description,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log("No se encontró temperatira para la ciudad".red)
            console.log(error);
        }
    }


    agregarHistorial(lugar = '') {
        //TODO: prevenir duplicados
        if (this.historial.includes(lugar.toLowerCase())) {
            return;
        }
        this.historial=this.historial.splice(0,4);
        this.historial.unshift(lugar.toLowerCase());

        //Grabar en DB
        this.guardarDB()
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;

    }


}


module.exports = Busquedas;