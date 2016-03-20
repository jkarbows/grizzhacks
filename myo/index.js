var Myo = require('myo')
var WebSocket = require('ws')
var ws = new WebSocket('ws://boiling-fjord-40795.herokuapp.com/')

Myo.connect('com.jer.the')

Myo.on("connected", function(data, timestamp) {
    console.log("Myo successfully connected. Data: " + JSON.stringify(data) + ". Timestamp: " + timestamp + ".")
})

Myo.on('fist'), function() {
    console.log('dun fist me bby')
    this.vibrate()
}

Myo.on("fingers_spread", function() {
    console.log("Fingers spread!")
    ws.send("synth.stop()")
})
