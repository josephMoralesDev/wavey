import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | audio-wave', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a wave given an array of elements', async function(assert) {
    this.set('bufferArray', [200,500,100,300,500]);
//todo add test for svg styles
    await render(hbs`<AudioWave @bufferArray={{this.bufferArray}} @fill={{'red'}}/>`);

    let bufferCount = this.element.querySelectorAll('.audio-wave__buffer-bar').length;
    await this.pauseTest();
    assert.equal(bufferCount, 5, 'all elements in array have been rendered');

    this.set('bufferArray', [200,500,100,300,500,700]);
    await this.pauseTest();

    bufferCount = this.element.querySelectorAll('.audio-wave__buffer-bar').length;

    assert.equal(bufferCount, 6, 'all elements in array have been re-rendered');

    this.set('bufferArray', []);

    bufferCount = this.element.querySelectorAll('.audio-wave__buffer-bar').length;

    assert.equal(bufferCount, 0, 'all elements in array have been re-rendered');
  });
  //what other test?
});
