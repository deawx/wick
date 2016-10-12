/* Wick - (c) 2016 Zach Rispoli, Luca Damasco, and Josh Rispoli */

var audioContext;
    var readyToStartWebAudioContext;


var WickWebAudioPlayer = function (project) {
    
};



WickWebAudioPlayer.prototype.setup = function() {
        
    var AudioContext = window.AudioContext // Default
                    || window.webkitAudioContext // Safari and old versions of Chrome
                    || false;
    audioContext = new AudioContext();

    if(!audioContext) {
        alert("WebAudio not supported! Sounds will not play.");
        return;
    }

    // Setup dummy node and discard it to get webaudio context running
    if(audioContext.createGainNode) {
        audioContext.createGainNode();
    } else {
        audioContext.createGain();
    }

    if(!mobileMode) {
            loadAudio(project.rootObject);
        }

        /* Recursively load audio of wickObj */
    var loadAudio = function (wickObj) {

        if(wickObj.audioData) {
            var rawData = wickObj.audioData.split(",")[1]; // cut off extra filetype/etc data
            var rawBuffer = Base64ArrayBuffer.decode(rawData);
            //wickObj.audioBuffer = rawBuffer;
            audioContext.decodeAudioData(rawBuffer, function (buffer) {
                if (!buffer) {
                    console.error("failed to decode:", "buffer null");
                    return;
                }
                wickObj.audioBuffer = buffer
                wickObj.playSound = function () {
                    playSound(wickObj.audioBuffer, wickObj.loopSound);
                }
            }, function (error) {
                console.error("failed to decode:", error);
            });
        }

        if(wickObj.isSymbol) {
            wickObj.getAllChildObjects().forEach(function(subObj) {
                loadAudio(subObj);
            });
        }
    }

}

WickWebAudioPlayer.prototype.update = function() {
    
}

WickWebAudioPlayer.prototype.playSound = function (buffer, loop) {
    if(!project.muted) {
        var source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.loop = loop;
        source.start(0);
        console.log("started...");
    }
}

WickWebAudioPlayer.prototype.cleanup = function() {
    audioContext.close();
}
