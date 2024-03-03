// INITIALIZE YOUTUBE API
// YouTube Player API
var player;

function onYouTubeIframeAPIReady() {
    // Initialize player with the first video ID
    loadVideo(document.getElementById('videoSelector').value);
}

document.addEventListener("DOMContentLoaded", function() {
  // Check if the YouTube IFrame Player API is ready
  if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
      // API is ready, proceed to check for preset query parameter
      checkForPreset();
  } else {
      // Wait for the API to be ready
      window.onYouTubeIframeAPIReady = checkForPreset;
  }

  // Function to check for preset query parameter and load preset settings
  function checkForPreset() {
      // Check if the URL contains a preset query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const presetName = urlParams.get('preset');
      if (presetName) {
          // If a preset query parameter is found, load the preset settings
          loadPresetVideo(presetName);
      }
  }
});

// LOAD VIDEO
function loadVideo(videoId, rates, jumpToggle) {
  // Check if the "Enter Custom ID" option is selected and there's a value in the custom video ID input field
  if (document.getElementById('videoSelector').value === 'custom') {
      var customVideoId = document.getElementById('custom-video-id').value;
      if (customVideoId) {
          videoId = customVideoId;
      }
  }
  
  if (player) {
      player.loadVideoById(videoId);
      // Set playback quality to the lowest possible after the video is loaded
      player.setPlaybackQuality('small');
  } else {
      player = new YT.Player('youtube-player', {
          height: '315',
          width: '560',
          videoId: videoId,
          playerVars: {
              'controls': 0, // Turn off YouTube player controls by default
              'modestbranding': 1, // Enable modest branding
              'showinfo': 0, // Hide YouTube logo
              'enablejsapi': 1, // Enable YouTube Player API
              'disablekb': 1, // Disable keyboard controls
              'fs': 0 // Disable fullscreen mode
          },
          events: {
              'onReady': function(event) {
                  onPlayerReady(event);
                  // Set playback quality to the lowest possible after the video is loaded
                  event.target.setPlaybackQuality('small');
              },
              'onError': onPlayerError
          }
      });
  }

  // Set playback rates and jump toggle if provided
  if (rates && jumpToggle !== undefined) {
    // Set playback rates
    // This part might need to be adjusted based on your specific implementation
    // For example, you might want to set playback rates for different keys separately
    // This is just a demonstration of how you can set playback rates for all keys
    for (const key in rates) {
      // Here you would set the playback rate for the corresponding key
      // For demonstration purposes, I'm just logging the key and rate
      console.log(key + ': ' + rates[key]);
    }

    // Set jump toggle
    // This part also might need to be adjusted based on your specific implementation
    // For example, you might want to handle jump toggle for each key separately
    // This is just a demonstration of how you can set jump toggle
    console.log('Jump Toggle: ' + jumpToggle);
  }
}


// LOAD PRESET VIDEO
// LOAD PRESET VIDEO
function loadPresetVideo(presetName) {
  // Clear the custom video ID field
  document.getElementById('custom-video-id').value = "";

  // Map preset names to corresponding video IDs, timestamps, rates, jump toggles, and volumes
  var presets = {
      "Tetris Attack": {
          videoId: "oxMx-VYlXss",
          timestampQ: "00:00:01.0",
          timestampW: "00:00:10.0",
          timestampE: "00:00:11.0",
          timestampR: "00:00:20.0",
          timestampT: "00:00:25.0",
          rates: { Q: "1.0", W: "2.0", E: "2.0", R: "1.0", T: "1.0" },
          jumpToggle: true,
          // volume: 1.0
      },
      "Tanuki": {
          videoId: "7nHRP-NhD74",
          timestampQ: "00:00:02.0",
          timestampW: "00:00:10.0",
          timestampE: "00:00:15.0",
          timestampR: "00:00:20.0",
          timestampT: "00:00:25.0",
          rates: { Q: "1.0", W: "2.0", E: "1.0", R: "1.0", T: "1.0" },
          jumpToggle: false,
          // volume: 1.0
      },
      "Cloud Dancers | クラウドダンサー": {
          videoId: "9Ynp9IZxGBA",
          timestampQ: "00:00:03.0",
          timestampW: "00:00:10.0",
          timestampE: "00:00:15.0",
          timestampR: "00:00:20.0",
          timestampT: "00:00:25.0",
          rates: { Q: "0.5", W: "2.0", E: "1.0", R: "1.0", T: "1.0" },
          jumpToggle: true,
          // volume: 1.0
      },
      "Murated": {
          videoId: "D377RXqE_ag",
          timestampQ: "00:00:04.0",
          timestampW: "00:00:10.0",
          timestampE: "00:00:15.0",
          timestampR: "00:00:20.0",
          timestampT: "00:00:25.0",
          rates: { Q: "1.0", W: "2.0", E: "1.0", R: "2.0", T: "1.0" },
          jumpToggle: true,
          // volume: 1.0
      },
      // Add more presets as needed
  };

  var preset = presets[presetName];
  if (preset) {
    // Remove symbols that would display as %something and encode the preset name for the query parameter
    // var cleanedPresetName = presetName.replace(/[^a-zA-Z0-9]/g, ''); // Removes all non-alphanumeric characters
    // var queryParams = `preset=${encodeURIComponent(cleanedPresetName)}`;
    var queryParams = `preset=${encodeURIComponent(presetName)}`;

    // Update the URL with the query parameter
    window.history.pushState({}, '', '?' + queryParams);

    // Load preset based on presetName
    loadVideo(preset.videoId, preset.rates, preset.jumpToggle); // Pass rates and jump toggle to loadVideo function
    document.getElementById('timestamp1').value = preset.timestampQ;
    document.getElementById('timestamp2').value = preset.timestampW;
    document.getElementById('timestamp3').value = preset.timestampE;
    document.getElementById('timestamp4').value = preset.timestampR;
    document.getElementById('timestamp5').value = preset.timestampT;
    // Set values for speed inputs
    document.getElementById('speed1').value = preset.rates['Q'];
    document.getElementById('speed2').value = preset.rates['W'];
    document.getElementById('speed3').value = preset.rates['E'];
    document.getElementById('speed4').value = preset.rates['R'];
    document.getElementById('speed5').value = preset.rates['T'];
    document.getElementById('checkboxQ').checked = preset.jumpToggle;
    document.getElementById('checkboxW').checked = preset.jumpToggle;
    document.getElementById('checkboxE').checked = preset.jumpToggle;
    document.getElementById('checkboxR').checked = preset.jumpToggle;
    document.getElementById('checkboxT').checked = preset.jumpToggle;
    // document.getElementById('volumeQ').value = preset.volume;
    // document.getElementById('volumeW').value = preset.volume;
    // document.getElementById('volumeE').value = preset.volume;
    // document.getElementById('volumeR').value = preset.volume;
    // document.getElementById('volumeT').value = preset.volume;

    updateButton(1); // Update button text for Q
    updateButton(2); // Update button text for W
    updateButton(3); // Update button text for E
    updateButton(4); // Update button text for R
    updateButton(5); // Update button text for T

  } else {
    console.error("No settings found for preset:", presetName);
  }
}


// Function to parse URL parameters and load preset if specified
window.onload = function() {
  // Get the preset name from the URL query parameter
  var urlParams = new URLSearchParams(window.location.search);
  var presetName = urlParams.get('preset');

  if (presetName) {
      // Load preset settings if preset name is found in the URL
      loadPresetVideo(presetName);
  }
};


function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60 * 10) / 10; // Round seconds to one decimal place
    seconds = seconds.toFixed(1); // Ensure there's always one decimal place
    seconds = seconds.padStart(4, '0'); // Add leading zeros if necessary

    return pad(hours) + ':' + pad(minutes) + ':' + seconds;
}
function pad(num, size = 2) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

// Event listener for video selector
document.getElementById('videoSelector').addEventListener('change', function() {
    var selectedVideoId = this.value;
    loadVideo(selectedVideoId);
});

// Event listener for presets
document.getElementById('preset-list').addEventListener('click', function(event) {
    if (event.target && event.target.matches("li.preset")) {
        var presetName = event.target.getAttribute("data-preset");
        loadPresetVideo(presetName);
    }
});

// FILTER 
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('filter');
    const presetItems = document.querySelectorAll('.preset');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    // Function to toggle favorite status
    function toggleFavorite(presetName) {
        presetName = presetName.trim().toLowerCase(); // Trim the preset name
        const index = favorites.indexOf(presetName);
        if (index === -1) {
            favorites.push(presetName); // Add to favorites
        } else {
            favorites.splice(index, 1); // Remove from favorites
        }
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Save to localStorage
    }
  
    // Function to update favorite button text based on favorite status
    function updateFavoriteButtonText(button, presetName) {
        const isFavorite = favorites.includes(presetName.toLowerCase());
        button.textContent = isFavorite ? '❤' : '♡';
    }
  
    // Function to update presets display based on selected category
    function updatePresetsDisplay(selectedValue) {
        presetItems.forEach(function(item) {
            const presetName = item.dataset.preset.toLowerCase();
            const presetCategory = item.classList[1];
            const isFavorited = favorites.includes(presetName);
            const isPresetVisible = selectedValue === 'all' ||
                                    (selectedValue === 'favorites' && isFavorited) ||
                                    (selectedValue !== 'favorites' && presetCategory === selectedValue);
            item.style.display = isPresetVisible ? 'block' : 'none';
        });
    }
  
    // Event listener for filter select
    filterSelect.addEventListener('change', function() {
        const selectedValue = filterSelect.value;
        updatePresetsDisplay(selectedValue);
    });
  
    // Event listener for clicking favorite buttons
    favoriteButtons.forEach(function(button) {
        const presetName = button.dataset.preset.toLowerCase();
        updateFavoriteButtonText(button, presetName);
  
        button.addEventListener('click', function() {
            toggleFavorite(presetName);
            updateFavoriteButtonText(button, presetName);
  
            const selectedValue = filterSelect.value;
            if (selectedValue === 'favorites') {
                updatePresetsDisplay('favorites');
            }
        });
    });
  
    // Initial display of presets based on selected filter
    updatePresetsDisplay(filterSelect.value);
});

// Object to store audio elements and their volume sliders
var audioElements = {
    'Q': { audio: null, volumeSlider: null },
    'W': { audio: null, volumeSlider: null },
    'E': { audio: null, volumeSlider: null },
    'R': { audio: null, volumeSlider: null },
    'T': { audio: null, volumeSlider: null }
};

// Function to convert timestamp to seconds
function timestampToSeconds(timestamp) {
    var parts = timestamp.split(":");
    var seconds = parseFloat(parts[2]);
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + seconds;
}

// Function to jump to a specific time in the video
function jumpToTime(timestamp, speed) {
    var seconds = timestampToSeconds(timestamp);
    var player = document.getElementById('youtube-player');
    player.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[' + seconds + ',"true"]}', '*');
    player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[' + speed + ']}', '*');
  }

  // Function to jump to a specific time in the video
function jumpToTime(timestamp, speed) {
    var seconds = timestampToSeconds(timestamp);
    var player = document.getElementById('youtube-player');
    player.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[' + seconds + ',"true"]}', '*');
    player.contentWindow.postMessage('{"event":"command","func":"setPlaybackRate","args":[' + speed + ']}', '*');
  }
  
// Function to update the timestamp button text based on user input
function updateButton(buttonNumber) {
  var speedInputId = 'speed' + buttonNumber;
  var speedValue = document.getElementById(speedInputId).value;
  var timestampValue = document.getElementById('timestamp' + buttonNumber).value;
  var button = document.getElementById('button' + buttonNumber);
  
  var key = getKeyFromButtonNumber(buttonNumber); // Get the key associated with the button number
  
  // Update the button text
  button.innerText = "Jump to " + timestampValue + " at " + speedValue + "x (" + key.toUpperCase() + ")";
}

// Function to get the key associated with the button number
function getKeyFromButtonNumber(buttonNumber) {
  // Map button numbers to keys
  var keyMap = { 1: 'Q', 2: 'W', 3: 'E', 4: 'R', 5: 'T' };
  return keyMap[buttonNumber];
}

  
  // Function to load and play uploaded audio
function loadAudio(key, file) {
  triggerLoadPresetOff(key);
  var audio = new Audio();
  audio.src = URL.createObjectURL(file);
  audioElements[key].audio = audio;
}

// Function to play audio for a given key
function playAudio(key) {
  if (audioElements[key].audio) {
      audioElements[key].audio.currentTime = 0; // Reset audio to start
      audioElements[key].audio.play(); // Play the audio
  }
}
  
  // Function to update volume for a given key
  function updateVolume(key, value) {
    if (audioElements[key].audio) {
      audioElements[key].audio.volume = value;
    }
  }
  
  // Function to handle keyboard shortcuts
  document.addEventListener('keydown', function(event) {
    var key = event.key.toUpperCase();
    var spanElement = document.getElementById('key' + key);
    if (spanElement) {
      spanElement.classList.add('key-active');
      if (audioElements[key] && audioElements[key].audio) {
        audioElements[key].audio.currentTime = 0;
        audioElements[key].audio.play();
      }
    }
    switch(key) {
      case 'Q':
        if (document.getElementById('checkboxQ').checked)
        jumpToTime(document.getElementById('timestamp1').value, document.getElementById('speed1').value);
        break;
      case 'W':
        if (document.getElementById('checkboxW').checked)
        jumpToTime(document.getElementById('timestamp2').value, document.getElementById('speed2').value);
        break;
      case 'E':
        if (document.getElementById('checkboxE').checked)
        jumpToTime(document.getElementById('timestamp3').value, document.getElementById('speed3').value);
        break;
      case 'R':
        if (document.getElementById('checkboxR').checked)
        jumpToTime(document.getElementById('timestamp4').value, document.getElementById('speed4').value);
        break;
      case 'T':
        if (document.getElementById('checkboxT').checked)
        jumpToTime(document.getElementById('timestamp5').value, document.getElementById('speed5').value);
        break;
      default:
        // Do nothing for other keys
    }
  });
  
  document.addEventListener('keyup', function(event) {
    var key = event.key.toUpperCase();
    var spanElement = document.getElementById('key' + key);
    if (spanElement) {
      spanElement.classList.remove('key-active');
    }
  });
  
  // Check if iframe is active and deactivate it periodically
  function deactivateIframe() {
    var iframe = document.getElementById('youtube-player');
    iframe.blur(); // Remove focus from the iframe
  }
  
  setInterval(function() {
    var iframeActive = document.activeElement === document.getElementById('youtube-player');
    if (iframeActive) {
      deactivateIframe();
    }
  }, 1000); // Check every 1 second

  // HINTS //
  // JavaScript to toggle hint visibility
  const hintIcons = document.querySelectorAll('.hint-icon');
  hintIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.nextElementSibling.classList.add('show');
    });
    icon.addEventListener('mouseleave', () => {
      icon.nextElementSibling.classList.remove('show');
    });
  });


// Function to get the current timestamp and update the corresponding input field
function getCurrentTimestamp(inputId) {
    // Get the current playhead timestamp
    var currentTime = player.getCurrentTime();
    // Format the timestamp into HH:MM:SS.S
    var formattedTime = formatTime(currentTime);
    // Update the corresponding input field
    document.getElementById(inputId).value = formattedTime;
    // Update the button text if needed
    updateButtonFromTimestamp(inputId);
}

// Function to update the timestamp button text based on user input
function updateButtonFromTimestamp(inputId) {
    var timestamp = document.getElementById(inputId).value;
    var speed = document.getElementById('speed' + inputId.slice(-1)).value;
    document.getElementById('button' + inputId.slice(-1)).innerText = "Jump to " + timestamp + " at " + speed + "x (Q)";
}


function onPlayerReady(event) {
  // Add event listener to the button after the player is ready
  document.getElementById('getTimestampButton').addEventListener('click', function() {
      // Get the current playhead timestamp
      var currentTime = player.getCurrentTime();
      // Format the timestamp into HH:MM:SS.S
      var formattedTime = formatTime(currentTime);
      // Display the current timestamp
      document.getElementById('currentTimestamp').innerText = 'Current Timestamp: ' + formattedTime;
  });
}

function onPlayerError(event) {
  // Handle errors, if any
  console.error('Error loading YouTube player:', event.data);
}

// Handle Audio Presets
document.addEventListener('keydown', function(event) {
  const key = event.keyCode.toString();
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  const keyElement = document.querySelector(`.drum-pad[data-key="${key}"]`);
  
  if (!audio) return;
  
  keyElement.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
});

const drumPads = document.querySelectorAll('.drum-pad');
drumPads.forEach(pad => pad.addEventListener('transitionend', function(event) {
  if (event.propertyName !== 'transform') return;
  this.classList.remove('playing');
}));


    document.getElementById('load-preset-off-Q').addEventListener('click', function() {
      const audioFiles = [
        { key: '81', src: 'sounds/drums/None' }
      ];
      loadPreset(audioFiles);
    });
    document.getElementById('load-preset-off-W').addEventListener('click', function() {
      const audioFiles = [
        { key: '87', src: 'sounds/drums/None' }
      ];
      loadPreset(audioFiles);
    });
    document.getElementById('load-preset-off-E').addEventListener('click', function() {
      const audioFiles = [
        { key: '69', src: 'sounds/drums/None' }
      ];
      loadPreset(audioFiles);
    });

document.getElementById('load-preset-1').addEventListener('click', function() {
  const audioFiles = [
    { key: '81', src: 'sounds/drums/270276.wav' },
    { key: '87', src: 'sounds/drums/270276.wav' },
    { key: '69', src: 'sounds/drums/270276.wav' }
  ];
  loadPreset(audioFiles);
});

document.getElementById('load-preset-2').addEventListener('click', function() {
  const audioFiles = [
    { key: '81', src: 'sounds/drums/167765.wav' },
    { key: '87', src: 'sounds/drums/167765.wav' },
    { key: '69', src: 'sounds/drums/167765.wav' }
  ];
  loadPreset(audioFiles);
});

function loadPreset(audioFiles) {
  audioFiles.forEach(file => {
    const audio = document.querySelector(`audio[data-key="${file.key}"]`);
    if (audio) {
      audio.src = file.src;
      const fileNameElement = document.querySelector(`.drum-pad[data-key="${file.key}"] .file-name`);
      if (fileNameElement) {
        const filename = file.src.split('/').pop(); // Extract filename from path
        fileNameElement.textContent = "Preset: " + filename; // Prepend "Preset: " to filename
      }
      
      // Set volume for the loaded audio to 1.0
      audio.volume = 1.0;
      
      
      
      // If you want to play the audio immediately after loading the preset, uncomment the following line
      // audio.play();
    }
  });
}




// Function to trigger load-preset-off button click event with key appended
function triggerLoadPresetOff(key) {
  var buttonId = 'load-preset-off-' + key;
  var button = document.getElementById(buttonId);
  if (button) {
    button.click();
  }
}

// Function to clear audio for a given key
function clearAudio(key) {
  if (audioElements[key].audio) {
      audioElements[key].audio.pause(); // Pause the audio
      audioElements[key].audio.currentTime = 0; // Reset audio to start
      audioElements[key].audio.src = ""; // Clear the audio source
      audioElements[key].audio = null; // Clear the audio element
      // Reset the file input
      var fileInput = document.getElementById('audio' + key);
      fileInput.value = ''; // Clear the selected file
      var fileNameSpan = fileInput.nextElementSibling.nextElementSibling; // Get the span element for file name display
      fileNameSpan.innerText = ''; // Clear the file name display
  }
  // Trigger load-preset-off button click event with key appended
  triggerLoadPresetOff(key);
}

// Function to set volume for an audio element
function setVolume(key, volume) {
  const audioElement = document.querySelector(`audio[data-key="${key.charCodeAt(0)}"]`);
  if (audioElement) {
    audioElement.volume = volume;
  }
}

// Function to play audio for key Q with volume control
// function playQ() {
//   const audioQ = document.querySelector('audio[data-key="81"]');
//   const volume = document.getElementById('volumeSliderQ').value;
//   if (audioQ) {
//       audioQ.currentTime = 0; // Reset audio to start
//       setVolume(audioQ, volume); // Set the volume
//       audioQ.play(); // Play the audio
//   }
// }


// Function to play audio for key W with volume control
// function playW() {
//   const audioW = document.querySelector('audio[data-key="87"]');
//   const volume = document.getElementById('volumeSliderW').value;
//   if (audioW) {
//       audioW.currentTime = 0; // Reset audio to start
//       audioW.volume = volume; // Set the volume
//       audioW.play(); // Play the audio
//   }
// }


// Function to play audio for key E with volume control
// function playE() {
//   const audioE = document.querySelector('audio[data-key="69"]');
//   const volume = document.getElementById('volumeSliderE').value;
//   if (audioE) {
//       audioE.currentTime = 0; // Reset audio to start
//       audioE.volume = volume; // Set the volume
//       audioE.play(); // Play the audio
//   }
// }

// Event listeners for play buttons with volume control
document.getElementById('playQButton').addEventListener('click', playQ);
document.getElementById('playWButton').addEventListener('click', playW);
document.getElementById('playEButton').addEventListener('click', playE);

// Do clear of audio for all keys before loading new preset.
function clearAudioForAllKeys() {
  // Array of keys
  var keys = ['Q', 'W', 'E', 'R', /* Add more keys here */];

  // Loop through each key and call clearAudio function
  keys.forEach(function(key) {
      clearAudio(key);
  });
}
