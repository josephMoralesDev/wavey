import Component from '@glimmer/component';
import { computed } from '@ember-decorators/object';

export default class AudioWaveComponent extends Component {

  bufferLocation = 0;

  @computed('bufferArray')
  get bufferWidth() {
    return 300 / this.args.bufferArray.length;
  }
  @computed('bufferArray')
  get renderedArray() {
    return this.args.bufferArray.map((bufferHeight) => {
      const rectStyle = {
        width: this.bufferWidth,
        height: bufferHeight,
        x: this.bufferLocation,
        y: 1000 - bufferHeight,
        fill: this.args.fill
      }

      this.bufferLocation = this.bufferLocation + this.bufferWidth;

      return rectStyle;
    });
  }
}
