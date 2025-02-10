const express = require('express');
const WebSocket = require('ws');
const { SerialPort, ReadlineParser } = require('serialport');

const app = express();
const PORT = 3000;
    
app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

function broadcast(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

const serialPort = new SerialPort({ path: '/dev/tty.usbserial-0001', baudRate: 115200 }); // Adjust port if needed
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));


parser.on('data', (data) => {
    console.log(`Received: ${data}`);
    
    
    const sensorValues = data.split(',').map(value => value.trim());
    broadcast(JSON.stringify(sensorValues));
});

