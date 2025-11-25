let playAudio = true;

const soundEffects = {

  click: new Audio('./assets/click.mp3')
};



function playClickSound() {
  console.log('Tocando som de clique');
  const sound = soundEffects.click;
  sound.volume = 0.5;
  sound.currentTime = 0;
  sound.play().catch(err => console.log('Erro ao tocar som:', err));
}


function startBackgroundMusic() {
  const bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;

  bgMusic.volume = 0.5;

  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      console.log('Música de fundo iniciada');
    }).catch(error => {
      console.log('Aguardando interação para tocar música...');
    });
  }
}

function stopBackgroundMusic() {
  const bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;

  bgMusic.pause();
  bgMusic.currentTime = 0;
  console.log('Música parada');
}


document.addEventListener('DOMContentLoaded', () => {

  document.body.addEventListener('click', function (event) {

    const clickedButton = event.target.closest('button');
    if (clickedButton) {
      playClickSound();
    }
  });


  const handleAudioButton = document.getElementById('handleAudio');

  if (handleAudioButton) {

    document.addEventListener('click', startBackgroundMusic, { once: true });
    document.addEventListener('touchstart', startBackgroundMusic, { once: true });

    handleAudioButton.addEventListener('click', (e) => {

      e.stopPropagation();
      playClickSound();

      const bgMusic = document.getElementById('bgMusic');

      if (!bgMusic) return;

      if (bgMusic.paused) {
        startBackgroundMusic();
        handleAudioButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
      } else {
        stopBackgroundMusic();
        handleAudioButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
      }
    });
  }
});