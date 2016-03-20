var Writable = require('stream').Writable
var inherits = require('inherits')

function Theremin(opts) {
  if(!(this instanceof Theremin)) return new Theremin(opts)
  Writable.call(this, {objectMode: true})
  opts = opts || {}

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  this.oscillator = audioCtx.createOscillator()
  this.gainNode = audioCtx.createGain()

  this.oscillator.connect(this.gainNode)
  this.gainNode.connect(audioCtx.destination)

  this.oscillator.type = 'square'
  this.oscillator.detune.value = 100 // value in cents
  this.oscillator.frequency.value = opts.freq || 0
  this.gainNode.gain.value = opts.gain || 0
  this.firstWrite = false
  this.oscillator.start(0)
}
inherits(Theremin, Writable)

Theremin.prototype._write = function (data, enc, done) {
  if(data.freq) this.setFreq(data.freq)
  if(data.gain) this.setGain(data.gain)
  done()
}

Theremin.prototype.setGain = function (gain) {
  this.gainNode.gain.value = gain
}

Theremin.prototype.setFreq = function (freq) {
  this.oscillator.frequency.value = freq
}


module.exports = Theremin