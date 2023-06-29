const fs = require('fs');

const Kafka = require("node-rdkafka");
const { readConfigFile } = require('./helper');
const producer = new Kafka.Producer(readConfigFile("client.properties"));
producer.connect();
producer.on("ready", async () => {
    console.log("ready")
    while(true){
        //llamar apis
        //Esperar 1 o 5 segundos
        
        producer.produce("my-topic", -1, Buffer.from("value"), Buffer.from("key"));
    }
   
});