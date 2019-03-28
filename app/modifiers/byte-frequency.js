import functionalModifier from 'ember-functional-modifiers';

export function byteFrequency(audio, [action]) {
  audio.crossOrigin = "anonymous";
  audio.load();

  const context = new AudioContext();
  const src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();

  src.connect(analyser);
  analyser.connect(context.destination);

  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  audio.play();

  let nextCancelId;

  function updateFrequencyData() {
    analyser.getByteFrequencyData(dataArray);
    action(dataArray);

    nextCancelId = requestAnimationFrame(updateFrequencyData);
  }

  updateFrequencyData();

  return () => cancelAnimationFrame(nextCancelId);
}

export default functionalModifier(byteFrequency);
