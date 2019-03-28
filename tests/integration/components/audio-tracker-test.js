import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | audio-tracker', function(hooks) {
  setupRenderingTest(hooks);

  let link = 'https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music6/v4/13/22/67/1322678b-e40d-fb4d-8d9b-3268fe03b000/mzaf_8818596367816221008.plus.aac.p.m4a';

  test('it renders wave when given valid link and is playing', async function(assert) {
    this.set('isPlaying', true);
    this.set('link', link);

    await render(hbs`
      <AudioTracker @audioId={{'audio-1'}} @link={{this.link}} @isPlaying={{this.isPlaying}} as |audio|>
        {{#if audio.bufferArray}}
          <AudioWave @bufferArray={{audio.bufferArray}} @fill={{'red'}}/>
        {{/if}}
      </AudioTracker>
    `);

    let bufferCount = this.element.querySelectorAll('.audio-wave__buffer-bar').length;
    assert.equal(bufferCount, 128, 'audio file is being rendered');
  });

  test('it does not render wave when given valid link and but is NOT playing', async function(assert) {
    this.set('isPlaying', false);
    this.set('link', link);

    await render(hbs`
      <AudioTracker @audioId={{'audio-1'}} @link={{this.link}} @isPlaying={{this.isPlaying}} as |audio|>
        {{#if audio.bufferArray}}
          <AudioWave @bufferArray={{audio.bufferArray}} @fill={{'red'}}/>
        {{/if}}
      </AudioTracker>
    `);

    let bufferCount = this.element.querySelectorAll('.audio-wave__buffer-bar').length;
    assert.equal(bufferCount, 0, 'audio file is being rendered');
  });
});
