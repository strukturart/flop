"use strict";
export function createAudioRecorder(
  startButtonId,
  stopButtonId,
  playbackElementId
) {
  const startButton = document.getElementById(startButtonId);
  const stopButton = document.getElementById(stopButtonId);
  const playbackElement = document.getElementById(playbackElementId);

  let mediaRecorder;
  let recordedChunks = [];

  async function init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "audio/webm" });
        recordedChunks = [];
        const url = URL.createObjectURL(blob);
        playbackElement.src = url;
      };

      startButton.addEventListener("click", startRecording);
      stopButton.addEventListener("click", stopRecording);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  }

  function startRecording() {
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  }

  function stopRecording() {
    mediaRecorder.stop();
    startButton.disabled = false;
    stopButton.disabled = true;
  }

  init();

  return {
    startRecording,
    stopRecording,
  };
}
