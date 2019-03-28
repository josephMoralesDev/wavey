import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember-decorators/object';

export default class AudioTrackerComponent extends Component {
  @tracked
  bufferArray = [];

  @action
  updateBufferArray(array) {
    this.bufferArray = array;
  }
}
