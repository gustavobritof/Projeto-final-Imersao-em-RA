let playAudio = true; // Controla se áudio está ativado ou não

const soundEffects = {
  click: new Audio('./assets/click.mp3')
};

function playClickSound() {
  if (!playAudio) return; // Respeita a configuração global

  console.log('Tocando som de clique');
  const sound = soundEffects.click;
  sound.volume = 0.5;
  sound.currentTime = 0;
  sound.play().catch(err => console.log('Erro ao tocar som:', err));
}

function playSound(soundName) {
  if (!playAudio) return; // Respeita a configuração global

  const sound = soundEffects[soundName];
  if (!sound) {
    console.warn(`Som "${soundName}" não encontrado!`);
    return;
  }

  sound.currentTime = 0;
  sound.play().catch(error => {
    console.log(`Erro ao tocar som ${soundName}:`, error);
  });
}

function startBackgroundMusic() {
  if (!playAudio) return; // Respeita a configuração global

  const bgMusic = document.getElementById('bgMusic');
  if (!bgMusic) return;

  bgMusic.volume = 0.3;

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

function toggleAudio() {
  playAudio = !playAudio; // Inverte o estado

  const bgMusic = document.getElementById('bgMusic');
  const handleAudioButton = document.getElementById('handleAudio');

  if (playAudio) {
    // Áudio ativado
    console.log('Áudio ativado');
    startBackgroundMusic();
    if (handleAudioButton) {
      handleAudioButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
    }
  } else {
    // Áudio desativado
    console.log('Áudio desativado');
    stopBackgroundMusic();
    if (handleAudioButton) {
      handleAudioButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  document.body.addEventListener('click', function (event) {
    const clickedButton = event.target.closest('button');
    if (clickedButton && clickedButton.id !== 'handleAudio') {
      playClickSound();
    }
  });

  const handleAudioButton = document.getElementById('handleAudio');

  if (handleAudioButton) {
    document.addEventListener('click', startBackgroundMusic, { once: true });
    document.addEventListener('touchstart', startBackgroundMusic, { once: true });

    handleAudioButton.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio(); // Usa a função de toggle
    });
  }
});

// Exporta para uso global
window.audioSystem = {
  playSound,
  playClickSound,
  startBackgroundMusic,
  stopBackgroundMusic,
  toggleAudio
};