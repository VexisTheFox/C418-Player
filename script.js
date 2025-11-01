// ====== TOP PICKS ======
const topPicks = [
  { title: "Aria Math", file: "sounds/beta/ariamath.mp3" },
  { title: "Door", file: "sounds/alpha/door.mp3" },
  { title: "Subwoofer", file: "sounds/alpha/subwooferlullaby.mp3" },
  { title: "Moogcity2", file: "sounds/beta/moogcity2.mp3" },
  { title: "Alpha", file: "sounds/beta/alpha.mp3" },
];

const audioPlayer = document.getElementById("audio-player");
const topList = document.getElementById("top-picks-list");

const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const playerTitle = document.getElementById("player-title");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let currentIndex = 0;
let isPlaying = false;

// ===== Render Top Picks =====
topPicks.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "song";
  div.textContent = song.title;
  div.onclick = () => loadAndPlay(i);
  topList.appendChild(div);
});

// ===== Core functions =====
function loadAndPlay(index) {
  currentIndex = index;
  const song = topPicks[index];
  audioPlayer.src = song.file;
  playerTitle.textContent = song.title;
  audioPlayer.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
  document.title = `▶ ${song.title} - C418 Player`;
}

playBtn.onclick = () => {
  if (!audioPlayer.src) return;
  if (isPlaying) {
    audioPlayer.pause();
    playBtn.textContent = "▶";
  } else {
    audioPlayer.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % topPicks.length;
  loadAndPlay(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + topPicks.length) % topPicks.length;
  loadAndPlay(currentIndex);
};

// ===== Progress bar =====
audioPlayer.addEventListener("timeupdate", () => {
  if (audioPlayer.duration) {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.value = progressPercent;
    updateTimeDisplay();
  }
});

progress.addEventListener("input", () => {
  audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

audioPlayer.addEventListener("loadedmetadata", updateTimeDisplay);
audioPlayer.addEventListener("ended", () => nextBtn.click());

function updateTimeDisplay() {
  const current = formatTime(audioPlayer.currentTime);
  const total = formatTime(audioPlayer.duration);
  currentTimeEl.textContent = current;
  durationEl.textContent = total;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function openAlbum(albumId) {
  window.location.href = `album.html?id=${albumId}`;
}

// internal marker: data:base64,dmV4aQ==

