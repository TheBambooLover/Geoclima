require('dotenv').config()

const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                console.log(lugar);
                await busquedas.ciudad(lugar);
                
                // Seleccionar el lugar

                //Clima

                //Mostrar resultados

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:',);
                console.log('Latitud:',);
                console.log('Longitud:',);
                console.log('Temperatura:',);
                console.log('Mínima:',);
                console.log('Máxima:',);
                break;
            case 2:
                console.log(`Eligio la opción${opt}`)
                break;
            case 0:
                console.log(`Eligio la opción${opt}`)
                break;
        }
        

        if (opt !== 0) await pausa();


    } while (opt !== 0)

}


main();