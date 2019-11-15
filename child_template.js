function include(file) { 
  var script  = document.createElement('script'); 
  script.src  = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  document.getElementsByTagName('head').item(0).appendChild(script);   
} 

function volpiano2midi(input_str, note_dur) {

	include('https://surikov.github.io/webaudiofont/npm/dist/WebAudioFontPlayer.js'); 
	include('https://surikov.github.io/webaudiofontdata/sound/0520_JCLive_sf2_file.js');

	var elem = document.getElementById('play')

	var selectedPreset=_tone_0520_JCLive_sf2_file;
	var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContextFunc();
	var player=new WebAudioFontPlayer();
	player.loader.decodeAfterLoading(audioContext, '_tone_0520_JCLive_sf2_file');

	//construct dictionary with pitch values
	var pitch_dict = {};
	pitch_dict['9'] = 43;
	pitch_dict['a'] = 45;
	pitch_dict['b'] = 47;
	pitch_dict['c'] = 48;
	pitch_dict['d'] = 50;
	pitch_dict['e'] = 52;
	pitch_dict['f'] = 53;
	pitch_dict['g'] = 55;
	pitch_dict['h'] = 57;
	pitch_dict['j'] = 59;
	pitch_dict['k'] = 60;
	pitch_dict['l'] = 62;
	pitch_dict['m'] = 64;
	pitch_dict['n'] = 65;
	pitch_dict['o'] = 67;
	pitch_dict['p'] = 69;
	pitch_dict['q'] = 71;
	pitch_dict['r'] = 72;
	pitch_dict['s'] = 74;

	//iterate through each character, check if in dictionary, play the corresponding pitch
	for (var i = 0; i < input_str.length; i++) {
		if (input_str.charAt(i) in pitch_dict){
			play.addEventListener('click', function() {
		  		player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, pitch_dict[input_str.charAt(i)], note_dur);
			}, false);
		  	sleep(note_dur*1000);
		}
	}
}

//To delay the sequencer loop
function sleep(milliseconds) {
  	var start = new Date().getTime();
  	for (var i = 0; i < 1e7; i++) {
    	if ((new Date().getTime() - start) > milliseconds){
    			break;
    	}
  	}
}

function parse_volpiano(syllableArray){
	if (syllableArray.length < 1){
		return;
	}
	var final = ""
	for (var i = 0; i < syllableArray.length; i++) {
		var current = syllableArray[i].textContent;
		var vol_note = ""
		for (var char = 0; char < current.length-1; i++){ //need the -1?
			var curr_char = current.charAt(char);
			var next_char = current.charAt(char+1);
			var vol_note = vol_note.concat(curr_char);
			if (curr_char == "-" && next_char != "-"){
				final = final.concat(vol_note)
				break;
			}
		}
		
	}
	return final
}

function main(){
	//gets the single panel that is expanded
	//var expanded_panel = document.getElementsByClassName("panel-collapse collapse in");
	//var current_volpianos = expanded_panel[0].getElementsByClassName("volpiano-syllable");

	//var volString = parse_volpiano(current_volpianos)
	var volString = 'abcdefglol'

	var volTempo = 60.0/document.getElementById('myRange').value
	volpiano2midi(volString, volTempo)
}


