// Get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');



// Build out functions
function togglePlay() {
  // if(video.paused) { //paused is property of video already
  //   video.play();
  // } else {
  //   video.pause();
  // }

  // below is a refactored version of the if statement

  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon
}

function handleRangeUpdate(){
  video[this.name] = this.value; // this refers to value that was changed, name will be either volume or playbackrate from html
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100; // using properties of video object, *100 makes it a percent
  progressBar.style.flexBasis = `${percent}%`; //changes the flexbasis(length) of the progress bar
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip); //this is an object with dataset in it with skip property
} //parseFloat changes string to integer

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; //offsetX is event property showing where on the X axis the cursor is then divide by total width of bar
  video.currentTime = scrubTime //resets video to point where bar was clicked
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);

//Listen to the video for when it is paused or played
video.addEventListener('play', updateButton);   
video.addEventListener('pause', updateButton);   
video.addEventListener('timeupdate', handleProgress); // runs the function when the time is updating on the video (as long as it is playing)   


toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip)); //listen to each button for a click

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false; // flag for later use
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // when someone moves their mouse on progress bar it checks if mouse is down, if true it runs scrub to set new time spot for video
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);



