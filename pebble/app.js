// Pebble app for broadcasting accelerometer data to node server

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var Accel = require('ui/accel');
var ws = new WebSocket('ws://boiling-fjord-40795.herokuapp.com/');


var main = new UI.Card({
    title: 'Pebble.js',
    icon: 'images/menu_icon.png',
    subtitle: 'Theremin',
    body: 'Click to broadcast.',
    subtitleColor: 'indigo', // Named colors
    bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'select', function(e) {
    broadcast();

    var wind = new UI.Window({
        fullscreen: true
    });
    var textfield = new UI.Text({
        position: new Vector2(0, 65),
        size: new Vector2(144, 30),
        font: 'gothic-24-bold',
        text: 'Broadcasting...',
        textAlign: 'center'
    });
    wind.add(textfield);
    wind.show();
});

main.on('click', 'up', function(e) {
   broadcast();
});

main.on('click', 'down', function(e) {
    broadcast();
});

ws.onclose = function() {
    console.log("websocket dropped");
};

function broadcast() {
    Vibe.vibrate('short');
    Accel.on('data', function(e) {
        console.log('Current acceleration: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
        ws.send(JSON.stringify(e.accel));
    });
}
