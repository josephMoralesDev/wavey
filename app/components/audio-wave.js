import Component from '@glimmer/component';
import { computed } from '@ember-decorators/object';

export default class AudioWaveComponent extends Component {

  @computed('bufferArray')
  get bufferWidth() {
    return 300 / this.args.bufferArray.length;
  }
  @computed('bufferArray')
  get renderedArray() {
    const newArray = new Array();

    let bufferLocation = 0;

    this.args.bufferArray.forEach((bufferHeight) => {
      const rectStyle = {
        width: this.bufferWidth,
        height: bufferHeight,
        x: bufferLocation,
        y: 1000 - bufferHeight,
        fill: this.args.fill
      }

      bufferLocation = bufferLocation + this.bufferWidth;

      newArray.push(rectStyle);
    });

    bufferLocation = 0;

    return newArray;
  }
}
