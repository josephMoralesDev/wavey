import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember-decorators/object';

export default class AudioTrackerComponent extends Component {

  @tracked
  bufferArray = [];

  @action
  visualizerSetup() {
    var audio = document.getElementById(this.args.audioId);
    audio.crossOrigin = "anonymous";
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    this.analyser = context.createAnalyser();

    src.connect(this.analyser);
    this.analyser.connect(context.destination);

    this.analyser.fftSize = 256;

    var bufferLength = this.analyser.frequencyBinCount;

    this.dataArray = new Uint8Array(bufferLength);

    audio.play();

    this.renderFrame();
  }

  @action
  renderFrame() {
    this.reqId = requestAnimationFrame(this.renderFrame);
    this.analyser.getByteFrequencyData(this.dataArray);
    this.bufferArray = this.dataArray;
  }

  @action
  cleanup() {
    cancelAnimationFrame(this.reqId);
  }
}
