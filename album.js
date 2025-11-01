const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get("id");
const albumTitle = document.getElementById("album-title");
const songList = document.getElementById("song-list");

const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const playerTitle = document.getElementById("player-title");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let currentIndex = 0;
let isPlaying = false;
let albumSongs = [];

// ===== Album data =====
if (albumId === "album1") {
  albumTitle.textContent = "Volume Alpha";
  albumSongs = [
    "key","door","subwooferlullaby","death","livingmice","moogcity","haggstrom",
    "minecraft","oxygène","Équinoxe","miceonvenus","dryhands","wethands","clark",
    "chris","thirteen","excuse","sweden","cat","dog","danny","beginning",
    "droopylikesricochet","droopylikesyourface"
  ].map(name => ({
    title: name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
    file: `sounds/alpha/${name}.mp3`
  }));
} else if (albumId === "album2") {
  albumTitle.textContent = "Volume Beta";
  albumSongs = [
    "intro","ki","alpha","deadvoxel","blindspots","flake","moogcity2","concretehalls",
    "biomefest","mutation","hauntmuskie","warmth","floatingtrees","ariamath","kyoto",
    "balladofthecats","taswell","beginning2","dreiton","theend","chirp","wait","mellohi",
    "stal","strad","eleven","ward","mall","blocks","far"
  ].map(name => ({
    title: name.replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
    file: `sounds/beta/${name}.mp3`
  }));
} else {
  albumTitle.textContent = "Unknown Album";
}

// ===== Generate list =====
albumSongs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "song";
  div.textContent = song.title;
  div.onclick = () => loadAndPlay(i);
  songList.appendChild(div);
});

// ===== Player functions =====
function loadAndPlay(index) {
  currentIndex = index;
  const song = albumSongs[index];
  audioPlayer.src = song.file;
  playerTitle.textContent = song.title;
  audioPlayer.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
  document.title = `▶ ${song.title} - ${albumTitle.textContent}`;
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
  currentIndex = (currentIndex + 1) % albumSongs.length;
  loadAndPlay(currentIndex);
};

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + albumSongs.length) % albumSongs.length;
  loadAndPlay(currentIndex);
};

// ===== Progress bar + time =====
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

function goBack() {
  window.location.href = "index.html";
}
