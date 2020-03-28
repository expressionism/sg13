let audio = audioSrc = ctx = gain = null, gain_val = 0.5;
let loop_bool = false, k;

let start = () => {
    console.log("started")

    ctx = new AudioContext();
    gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.connect(ctx.destination);

    document.querySelector("#alarm").addEventListener("click", fire_alarm);
    document.querySelector("#dial").addEventListener("click", fire_dial);

    document.querySelector("#gain").addEventListener("input", set);
    document.querySelector("#loop").addEventListener("input", loop);
}

let loop = e => {
    console.log("setting loop: " + e.target.checked);
    if(e.target.checked) {
        if(audio !== null) {
            audio.loop = !0;
        }
        loop_bool = !0;
    }
    else {
        if(audio !== null) {
            audio.loop = !1;
        }
        loop_bool = !1;
    }
}

// Soon to be used generalized sound player.
let set = e => {
    if(e.target.validity.rangeOverflow) {
        e.target.value = 100;
    }
    else if(e.target.validity.rangeUnderflow) {
        e.target.value = 0;
    }
    gain_val = e.target.value / 100;
    console.log("set gain: " + gain_val);
    if(audio !== null) {
        gain.gain.linearRampToValueAtTime(gain_val, ctx.currentTime + .3);
    }
}

let fire_sound = e => {
    k=e
    if(audio != null) {
        audio.pause();
    }
    tempAudio = new Audio("./audio/" + e.target.name + ".m4a");
    if(audio == null || audio.ended || audio.src !== tempAudio.src) {
        audio = tempAudio;
        audio.loop = loop_bool;
        audioSrc = ctx.createMediaElementSource(audio);
        audioSrc.connect(gain);
        audio.play();
    }
    else {
        audio = null;
    }
}

let fire_alarm = e => {
    if(audio != null) {
        audio.pause();
    }
    tempAudio = new Audio("./audio/alarm.m4a");
    if(audio == null || audio.ended || audio.src !== tempAudio.src) {
        audio = tempAudio;
        audio.loop = loop_bool;
        audioSrc = ctx.createMediaElementSource(audio);
        audioSrc.connect(gain);
        audio.play();
    }
    else {
        audio = null;
    }
}

let fire_dial = e => {
    if(audio != null) {
        audio.pause();
    }
    tempAudio = new Audio("./audio/dial.m4a");
    if(audio == null || audio.ended || audio.src !== tempAudio.src) {
        audio = tempAudio;
        audio.loop = loop_bool;
        audioSrc = ctx.createMediaElementSource(audio);
        audioSrc.connect(gain);
        audio.play();
    }
    else {
        audio = null;
    }
}

window.addEventListener("load", start);