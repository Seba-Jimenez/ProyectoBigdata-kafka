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
            const response = await fetch('https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/');
            let data;
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = JSON.parse(text);
            }

            // Enviar datos a confluent
            producer.produce("my-topic", -1, Buffer.from("value"), Buffer.from("key"));

        } catch (error) {
        console.error('Error al llamar a la API: ', error);
        }
        //Esperar 1 o 5 segundos
        await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos
    }
   
});