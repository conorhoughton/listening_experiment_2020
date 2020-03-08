
console.log("starting")


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.seededRandom() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


/*stimulus vectors*/


var an_vector=["stimulus/an/ANAN_10.wav","stimulus/an/ANAN_11.wav","stimulus/an/ANAN_12.wav","stimulus/an/ANAN_13.wav"]

var an_probes=["stimulus/probes/ANAN_89.wav"]

var av_vector=["stimulus/av/AVAV_11.wav","stimulus/av/AVAV_13.wav","stimulus/av/AVAV_14.wav","stimulus/av/AVAV_18.wav"]

var av_probes=["stimulus/probes/AVAV_83.wav"]

var mp_vector=["stimulus/mp/phrase_mix_10.wav","stimulus/mp/phrase_mix_11.wav","stimulus/mp/phrase_mix_12.wav","stimulus/mp/phrase_mix_13.wav"]

var mp_probes=["stimulus/probes/phrase_mix_38.wav"]

var rr_vector=["stimulus/rr/rrrr_10.wav","stimulus/rr/rrrr_11.wav","stimulus/rr/rrrr_12.wav","stimulus/rr/rrrr_13.wav"]

var rr_probes=["stimulus/probes/rrrr_17.wav"]

var all_stims=[];
all_stims=all_stims.concat(an_vector);
//all_stims=all_stims.concat(av_vector);
all_stims=all_stims.concat(mp_vector);
all_stims=all_stims.concat(rr_vector);

console.log(all_stims);


var all_probes=[];
all_probes=all_probes.concat(an_probes);
//all_probes=all_probes.concat(av_probes);
all_probes=all_probes.concat(mp_probes);
all_probes=all_probes.concat(rr_probes);

var n_stim=12;
var n_probe=3;

/* define welcome message block */

var welcome_block = {
  type: 'survey-text',
  questions: [{prompt: '<b>one line</b><br>'+' next line'}]
};

// function created to ensure check box in consent form is checked, otherwise alert pops up
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate you must check the box 'I have read and understood the information provided and agree to take part in this study'.");
    return false;
  }
  return false;
};

// External page with consent form
var consent = {
  type:'external-html',
  url: "consent_form.html",
  cont_btn: "start",
  check_fn: check_consent
};

var check_instructions = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to continue you must check the box 'I have read and understood the information provided'.");
    return false;
  }
  return false;
};

// External page with instructions form
var instructions = {
  type:'external-html',
  url: "instructions.html",
  cont_btn: "start",
    check_fn: check_instructions
};


// External page with debrief form
var debrief = {
  type:'external-html',
  url: "debrief.html",
  cont_btn: "done",
};



// Participant Number to be entered
var participant=-1

var pno_block = {
    type: 'survey-text',
    questions: [{prompt: "Please enter your participant ID. Please do not include any spaces."}],
    on_finish: function(pno_block){participant=set_details(pno_block.responses);
				   console.log(participant);
				  }
};

var age = {
   type: 'survey-text',
   questions: [{prompt: "What is your age?",required: true,horizontal: true}],
};


var gender = {
 type: 'survey-multi-choice',
    questions: [{prompt:'Sex:',options: ['Female','Male','Other','Prefer not to say'],required: true}]
};


var language = {
   type: 'survey-text',
   questions: [{prompt: "What is your first language?",required: true,horizontal: true}],
};




//http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// the initial seed
var d = new Date();
Math.seed = d.getTime()%233280;
 
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
//To randomly choose the order of the images 
Math.seededRandom = function(max,min) {
    max = max || 1;
    min = min || 0;
 
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280.0;
 
    return min + rnd * (max - min);
}

hashCode = function(this_id) {
  var hash = 0, i, chr;
  if (this_id.length === 0) return hash;
  for (i = 0; i < this_id.length; i++) {
    chr   = this_id.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};



set_details = function(id) {
    participant=Math.abs(hashCode(id.trim()))%n_stim;
    jsPsych.data.write({participant: participant});
    return participant;
}



//get_score = function() {
  //final_score=Math.abs(jsPsych.data.getLastTrialData(score));
//}
//var final_score=0


var audio_check = 0;

var audio_check_question = {
    type: 'html-button-response',
    stimulus: "<p>We need to check your headphones or speakers are working well enough for the experiment to run.</p><p>When you click continue you will hear a voice name a <b>colour</b> and you will be asked to identify the colour.</p>",
    choices: ['Continue'],	    
};


var button_press


var stimulus_colour_1 = {
    type: 'audio-button-response',
    stimulus: "stimulus/colour1.ogg",
    choices: ["black","red","green","yellow","purple","orange","blue","white","<b>no audio</b>"],
    prompt: "<p>Name the colour!</p>",
    trial_ends_after_audio : false,
    on_finish: function(stimulus_colour_1) {
	//6 is the number of the "blue" button"
	button_press=stimulus_colour_1.button_pressed;
        if (stimulus_colour_1.button_pressed == 6) {
            audio_check=1;
        }
    },
};


var audio_check_result = {
    on_start: function(audio_check_result){
	if (audio_check == 0){
    	    audio_check_result.stimulus= "<p>That does <b>not</b> seem to have worked; let's try again.</p>";
	}
	else{
            audio_check_result.stimulus= "<p>Great, that worked; just one more check! </p>";
	}
    },
    type: 'html-button-response',
    stimulus: "",
    //for testing only
    choices: ['Continue'],	    
};


var stimulus_colour_2 = {
    on_start: function(stimulus_colour_2){
	if (audio_check==0){
	    console.log("failed first test");
	    stimulus_colour_2.type= 'audio-button-response';
	    stimulus_colour_2.stimulus= "stimulus/colour2.ogg";
	    stimulus_colour_2.choices= ["black","red","green","yellow","purple","orange","blue","white","<b>no audio</b>"];
	    stimulus_colour_2.prompt= "<p>Name the colour!</p>";
	    stimulus_colour_2.trial_ends_after_audio = false;
	}
	else{
	    stimulus_colour_2.type= 'call-function';
	    stimulus_colour_2.func= function(){};
	}
	console.log("stimulus ",stimulus_colour_2.stimulus);
    },
    type: 'audio-button-response',
    stimulus: "",
    choices: [],
    prompt: "",
    trial_ends_after_audio : false,
    func:function(){},
    on_finish: function(stimulus_colour_2) {
	//2 is the number of the "green" button"
	button_press=stimulus_colour_2.button_pressed;
        if (stimulus_colour_2.button_pressed == 2) {
            audio_check=2;
        }
    },
};


var audio_check_2_result = {
    on_start: function(audio_check_2_result){
	if(audio_check==1){
	    audio_check_2_result.type="call-function";
	    audio_check_2_result.func= function(){};
	}
	else if(audio_check==2){
	    audio_check_2_result.type="html-button-response";
            audio_check_2_result.stimulus= "<p>Great, that worked; just one more check! </p>";
	    audio_check_2_result.choices= ['Continue'];	    
	}
	else{
	    jsPsych.endExperiment('This is not going to work out.');
	}
    },
    type:"html-button-response",stimulus:"",choices:[],func:function(){}
}



var stimulus_colour_3 = {
    type: 'audio-button-response',
    stimulus: "stimulus/colour3.ogg",
    choices: ["black","red","green","yellow","purple","orange","blue","white","<b>no audio</b>"],
    prompt: "<p>Name the colour!</p>",
    trial_ends_after_audio : false,
    on_finish: function(stimulus_colour_3) {
	//7 is the number of the "white" button"
	button_press=stimulus_colour_3.button_pressed;
        if (stimulus_colour_3.button_pressed == 7) {
            audio_check=3;
        }
    },
};



var audio_check_3_result = {
    on_start: function(audio_check_3_result){
	if(audio_check==3){
	    audio_check_3_result.type="html-button-response";
	    audio_check_3_result.stimulus= "<p>Great, that worked! </p>";
	    audio_check_3_result.choices= ['Continue'];	    
	}
	else{
	    jsPsych.endExperiment('This is not going to work out.');
	}
    },
    type:"html-button-response",stimulus:"",choices:[],func:function(){}
}


var start = {
    type: 'html-button-response',
    stimulus: "<p>Press continue to start the experiment! The word streams will start after you press <b>continue</b></p>",
    choices: ['Continue'],	    
//    prompt: "<b>Press any key to continue</b></p>",
};



var actual_stims=[];

var probe1_loc=4;
var probe2_loc=10;

function load_stimulus_vector(){

    var probe1=Math.floor(Math.seededRandom() * n_probe);
    var probe2=probe1;
    while(probe2==probe1){
	probe2=Math.floor(Math.seededRandom() * n_probe);
    }


    
    var new_stims=[];
    for (i=0;i<n_stim;i++){
	if(i!=participant){
	    new_stims.push(all_stims[i]);
	}
    }
    new_stims=shuffle(new_stims);

    
    for (i=0;i<probe1_loc;i++){
	actual_stims.push(new_stims[i]);
    }
    actual_stims.push(all_probes[probe1]);
    for (i=probe1_loc;i<probe2_loc-1;i++){
	actual_stims.push(new_stims[i]);
    }
    
    actual_stims.push(all_probes[probe2]);

    for (i=probe2_loc-1;i<n_stim-1;i++){
	actual_stims.push(new_stims[i]);
    }
    
    actual_stims.push(all_stims[participant]);

    jsPsych.data.write({stimulus: actual_stims});

    
/*
    for(i=0;i<18;i++){
	console.log(i," ",actual_stims[i]);
    }
*/
}

var duration_length=250;

 var pause = {
     type: 'html-button-response',
     stimulus: "<html></html>",
     prompt: "<p>+</p>",
     choices: ["a","b"],
     button_html: "<html></html>",
     //     response_ends_trial: false,
     trial_duration: function(){return duration_length;}
 };

var duration_length_long=500;

 var pause_long = {
     type: 'html-button-response',
     stimulus: "<html></html>",
     prompt: "<p>+</p>",
     choices: ["a","b"],
     button_html: "<html></html>",
     //     response_ends_trial: false,
     trial_duration: function(){return duration_length_long;}
 };



var stimulus_question = {
    type: 'html-keyboard-response',
    stimulus: '<p>Did you hear any <b>four-word</b> phrases?',
    choices: ['y', 'n'],
    prompt: "<p>Please respond by pressing the <b>y</b> or <b>n</b> key</p>"
};



var start_final = {
    type: 'html-button-response',
    stimulus: "<p>We will now ask you some additional questions.</p>",
    choices: ['Continue'],	    
//    prompt: "<b>Press any key to continue</b></p>",
};



var final_question_1 = {
    type: 'html-keyboard-response',
    stimulus: '<p>In the <b>last stream of words</b> you hear any <b>two-word</b> phrases?',
    choices: ['y', 'n'],
    prompt: "<p>Please respond by pressing the <b>y</b> or <b>n</b> key</p>"
};



var final_question_2 = {
    type: 'survey-text',
    questions: [{prompt: "Write down as many things from the <b>last stream of words</b> you have just heard as you can remember in the comments box below.", rows: 5, columns: 50}],

};

var final_question_3 = {
    type: 'survey-text',
    questions: [{prompt: "Are there any other things you can remember from streams of words presented <b>earlier</b> in the experiment?", rows: 5, columns: 50}],

};


var final_feedback = {
    type: 'survey-text',
    questions: [{prompt: "We are just about done now, do you have any <b>feedback</b> for us about the experiment?", rows: 5, columns: 50}],

};


var stimulus={

    type: 'audio-button-response',
    stimulus: function(){store_s=this_s;this_s++;console.log(actual_stims[store_s]);return actual_stims[store_s];},
    choices: [],
    prompt: "<p>+</p>",
    trial_ends_after_audio: true,
    
};

function saveData(filename, filedata){
   $.ajax({
      type:'post',
      cache: false,
      url: 'save_data.php',
      data: {filename: filename, filedata: filedata}
   });
}



console.log("making timeline")

/* create experiment definition array */
var timeline = [];
/*timeline.push(welcome_block);*/
timeline.push(consent);
timeline.push(instructions);
//timeline.push(age);
//timeline.push(gender);
timeline.push(language);

timeline.push(audio_check_question)
timeline.push(stimulus_colour_1)
timeline.push(audio_check_result)
timeline.push(stimulus_colour_2)
timeline.push(audio_check_2_result)
timeline.push(stimulus_colour_3)
timeline.push(audio_check_3_result)


timeline.push(pno_block);

timeline.push(start);

timeline.push(pause_long);

timeline.push({
    type:"call-function",
    func:function(){load_stimulus_vector();}
});


//18
for(this_s=0;this_s<14;this_s++){
    timeline.push(stimulus);
    timeline.push(stimulus_question);
    if(this_s!=13){
	timeline.push(pause);
    }
}
var this_s=0

timeline.push(start_final);
timeline.push(final_question_1);
timeline.push(final_question_2);
timeline.push(final_question_3);

timeline.push(final_feedback);

//debrief now included in the finished_experiment page
//timeline.push(debrief);


var audio=['stimulus/colour1.ogg','stimulus/colour2.ogg','stimulus/colour3.ogg'];

audio=audio.concat(an_vector);
audio=audio.concat(av_vector);
audio=audio.concat(mp_vector);
audio=audio.concat(rr_vector);

audio=audio.concat(an_probes);
audio=audio.concat(av_probes);
audio=audio.concat(mp_probes);
audio=audio.concat(rr_probes);


/* start the experiment */
jsPsych.init({
    timeline: timeline,
    preload_audio: audio,
    
    on_finish: function(data) {

	console.log('The experiment is over!');
	saveData("listening",jsPsych.data.get().csv());

	if(audio_check!=3){
	    window.location.assign("failed_audio.html");
	}
	else{
	    window.location.assign("finished_experiment.html");
	}

    }
});


