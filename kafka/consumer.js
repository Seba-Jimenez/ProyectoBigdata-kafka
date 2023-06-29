const Kafka = require("node-rdkafka");
const { readConfigFile } = require("./helper");
const config = readConfigFile("client.properties");
config["group.id"] = "node-group";
var io = require("socket.io-client");

const socket = io("ws://localhost:3000");

// send a message to the server


const consumer = new Kafka.KafkaConsumer(config, {"auto.offset.reset": "earliest" });
consumer.connect();
consumer.on("ready", () => {
    consumer.subscribe(["my-topic"]);
    consumer.consume();

}).on("data", (message) => {
    const data = {
        key: message.key.toString(),
        value: message.value.toString(),
    }
    console.log("Consumed message", JSON.stringify(data));
    socket.emit("consumerDataEvent",JSON.stringify(data));
});