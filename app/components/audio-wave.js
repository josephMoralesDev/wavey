import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed, action } from '@ember-decorators/object';

export default class AudioWaveComponent extends Component {

  bufferLocation = 0;

  @tracked renderedArray = [];

  @computed('bufferArray')
  get bufferWidth() {
    return 300 / this.args.bufferArray.length;
  }

  @action
  updateArray(__) {
    this.renderedArray = this.args.bufferArray.map((bufferHeight) => {
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
