import Component from '@glimmer/component';
import { computed } from '@ember-decorators/object';

export default class AudioWaveComponent extends Component {

  get bufferWidth() {
    return 300 / this.args.bufferArray.length;
  }

  get renderedArray() {
    const newArray = new Array();

    let bufferLocation = 0;
    //use Array.from
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
