let audio = audioSrc = gain_field = ctx = gain = null, gain_val = 0.5;

let start = () => {
    console.log("started")

    ctx = new AudioContext();
    gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.connect(ctx.destination);

    gain_field = document.querySelector("#gain");

    document.querySelector("#alarm").addEventListener("click", fire_alarm);
    document.querySelector("#dial").addEventListener("click", fire_dial);

    gain_field.addEventListener("input", set);
}

let set = e => {
    if(gain_field.validity.rangeOverflow) {
        gain_field.value = 100;
    }
    else if(gain_field.validity.rangeUnderflow) {
        gain_field.value = 0;
    }
    gain_val = gain_field.value / 100;
    console.log("set gain: " + gain_val);
    if(audio !== null) {
        gain.gain.linearRampToValueAtTime(gain_val, ctx.currentTime + .3);
    }
}

let fire_alarm = e => {
    if(audio != null) {
        audio.pause();
    }
    tempAudio = new Audio("./audio/alarm.m4a");
    if(audio == null || audio.ended || audio.src !== tempAudio.src) {
        audio = tempAudio;
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
        audioSrc = ctx.createMediaElementSource(audio);
        audioSrc.connect(gain);
        audio.play();
    }
    else {
        audio = null;
    }
}

window.onload = start;