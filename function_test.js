
var check = 2;

check = 4;

function change_audio_check(){
    check=1;
};

var change = {
    type: 'call-function',
    func:  function() {
	change_audio_check();
    }
};

var audio_check_result = {
    type: 'html-button-response',
    stimulus: function(){return "<p>The value of check is "+check+"</p>"},
    choices: ['Continue'],
};

check = 3;

/* create experiment definition array */
var timeline = [];

timeline.push(change)
timeline.push(audio_check_result)

/* start the experiment */
jsPsych.init({
    timeline: timeline
    });
