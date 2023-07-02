const fs = require('fs');

//const axios = require('axios');
const Kafka = require('node-rdkafka');
const { readConfigFile } = require('./helper');
const producer = new Kafka.Producer(readConfigFile("client.properties"));
producer.connect();
producer.on("ready", async () => {
    console.log("Ready")
    while(true){
        try {
            //llamar apis
            //1era API
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
            let data1;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data1 = await response.json();
                console.log(data1.results[0].name);
            } else {
                const text = await response.text();
                data1 = JSON.parse(text);
            }
            // Enviar datos a confluent
            producer.produce("my-topic", -1, Buffer.from(JSON.stringify(data1)), Buffer.from("key"));

        } catch (error) {
        console.error('Error al llamar a la API 1: ', error);
        }
        try{
            //2da API
            const response = await fetch('https://www.swapi.tech/api/people/');
            let data2;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data2 = await response.json();
                console.log(data2.results[0].name);
            } else {
                const text = await response.text();
                data2 = JSON.parse(text);
            }
            // Enviar datos a confluent
            producer.produce("my-topic", -1, Buffer.from(JSON.stringify(data2)), Buffer.from("key"));
        } catch (error) {
        console.error('Error al llamar a la API 2: ', error);
        }
        try{
            //3er API
            const response = await fetch('https://rickandmortyapi.com/api/character/');
            let data3;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data3 = await response.json();
                console.log(data3.results[0].name);
            } else {
                const text = await response.text();
                data3 = JSON.parse(text);
            }
            // Enviar datos a confluent
            producer.produce("my-topic", -1, Buffer.from(JSON.stringify(data3)), Buffer.from("key"));
        } catch (error) {
        console.error('Error al llamar a la API 2: ', error);
        }
        //Esperar 1 o 5 segundos
        await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos
    }
   
});