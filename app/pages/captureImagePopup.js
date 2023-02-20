let captureImageURL;
let camera = document.querySelector('.capture-camera-snap');
let snaptitle = document.querySelector('.snap-title');



function initCaptureImagePopup() {
  const captureImageBtn = document.querySelector('#captureImage');
  const streamingVideo = document.querySelector('#streamingVideo');
  const captureCanvas = document.querySelector('#captureCanvas');

  navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      },
    })
    .then((stream) => {
      streamingVideo.srcObject = stream;
    });

  streamingVideo.addEventListener('canplay', function () {
    captureCanvas.width = streamingVideo.videoWidth;
    captureCanvas.height = streamingVideo.videoHeight;
  });

  captureImageBtn.addEventListener('click', function () {
    const ctx = captureCanvas.getContext('2d');
    const stream = streamingVideo.srcObject;
    const tracks = stream.getTracks();

    camera.style.display = 'none';
    snaptitle.style.display = 'none'
    ctx.drawImage(streamingVideo, 0, 0);

    const img = captureCanvas.toDataURL('image/png');
    document.querySelector('#preview').src = img;
    location.hash = '#addNewItemPage';
    captureImageURL = img;
    tracks.forEach((track) => {
      track.stop();
    });
  });
}
