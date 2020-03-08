/* define welcome message block */
var welcome_block = {
  type: 'text',
  text: 'This simple survey will require you to vote for candidates in the mayoral election given different types of voting systems. <br> <br>' +
  'This survey will not be used to acquire data about the public\'s political preferences but rather to find out how the public behave given different types of voting systems. <br> <br>' +
  'Please follow the instructions, spoilt votes will not be rewarded. <br><br>' +
  'This survey <b>cannot</b> be used to identify you from the data provided. <br> <br> Please press any key to start.'
};

var pno_entry = ["Please enter your prolific participant ID. Click 'submit answers' when you are ready to start."];
var pno_block = {
  type: 'survey-text',
  questions: [pno_entry]
};

/* define test trials */
var mayoralElectionFPTP = {
  type: "survey-multi-choice",
  questions: ["<b><u>First Past The Post</u></b> <br> The candidate with the majority of the votes wins the election. <br>Who would you vote for out of the following candidates in the mayoral election?"],
  options: [[
    "BERRY, Sian Rebecca - Green Party",
    "FURNESS, David - British National Party",
    "GALLOWAY, George - Respect (George Galloway)",
    "GOLDING, Paul - Britain First - Putting British people first",
    "GOLDSMITH, Zac - The Conservative Party candidate",
    "HARRIS, Lee Eli - Cannabis is Safer Than Alcohol",
    "KHAN, Sadiq Aman - Labour Party",
    "LOVE, Ankit - One Love Party",
    "PIDGEON, Caroline Valerie - London Liberal Democrats",
    "WALKER, Sophie - Women's Equality Party",
    "WHITTLE, Peter Robin - UK Independance Party (UKIP)",
     "ZYLINKSKI, Prince - Independent"
     ]],
  required: [true]
};


var yesno=["Yes","No"];
var app_intervals=[];
var app_labels=[];
for (var i = 0; i < 12; i++) {
    app_labels.push(yesno);
    app_intervals.push(2);
};
var candidates= ["BERRY, Sian Rebecca - Green Party",
    "FURNESS, David - British National Party",
    "GALLOWAY, George - Respect (George Galloway)",
    "GOLDING, Paul - Britain First - Putting British people first",
    "GOLDSMITH, Zac - The Conservative Party candidate",
    "HARRIS, Lee Eli - Cannabis is Safer Than Alcohol",
    "KHAN, Sadiq Aman - Labour Party",
    "LOVE, Ankit - One Love Party",
    "PIDGEON, Caroline Valerie - London Liberal Democrats",
    "WALKER, Sophie - Women's Equality Party",
    "WHITTLE, Peter Robin - UK Independance Party (UKIP)",
		 "ZYLINKSKI, Prince - Independent"];

var mayoralElectionApproval = {
    type: "survey-likert",
    preamble: ["<b><u>Approval Voting</u></b> <br> The most approved candidate is the winner. <br> Answer yes to all the candidates you consider acceptable, otherwise answer no. <br> All questions must be answered to proceed."],
    questions: candidates,
    labels: app_labels
};

var mayoralElectionRanked = {
  type: 'survey-text',
  preamble: "<b><u>Single Transferable Vote</u></b> <br> If a voter's highest candidate (who has not yet been eliminated) is then eliminated, the vote is transferred to the next highest. <br> Rank any number of candidates in order of preference starting with \"1\" being the highest.",
  questions: [
    ["BERRY, Sian Rebecca - Green Party"],
    ["FURNESS, David - British National Party"],
    ["GALLOWAY, George - Respect (George Galloway)"],
    ["GOLDING, Paul - Britain First - Putting British people first"],
    ["GOLDSMITH, Zac - The Conservative Party candidate"],
    ["HARRIS, Lee Eli - Cannabis is Safer Than Alcohol"],
    ["KHAN, Sadiq Aman - Labour Party"],
    ["LOVE, Ankit - One Love Party"],
    ["PIDGEON, Caroline Valerie - London Liberal Democrats"],
    ["WALKER, Sophie - Women's Equality Party"],
    ["WHITTLE, Peter Robin - UK Independance Party (UKIP)"],
    ["ZYLINKSKI, Prince - Independent"]
    ]
};

var mayoralElectionInstantRunoff = {
  type: 'survey-text',
  preamble: "<b><u>Instant Runoff</u></b> <br> If the first preferences of all voters give a candidate the majority of the votes, then that candidate wins. Otherwise, the candidate with the fewest first preferences is eliminated. The candidate who has been eliminated has their voters' second vote distributed among the other candidates. This process repeats until a majority is found. <br> Vote for <b>only two</b> candidates indicating your first choice with <b>\"1\"</b> and your second with <b>\"2\"</b>.",
  questions: [
    ["BERRY, Sian Rebecca - Green Party"],
    ["FURNESS, David - British National Party"],
    ["GALLOWAY, George - Respect (George Galloway)"],
    ["GOLDING, Paul - Britain First - Putting British people first"],
    ["GOLDSMITH, Zac - The Conservative Party candidate"],
    ["HARRIS, Lee Eli - Cannabis is Safer Than Alcohol"],
    ["KHAN, Sadiq Aman - Labour Party"],
    ["LOVE, Ankit - One Love Party"],
    ["PIDGEON, Caroline Valerie - London Liberal Democrats"],
    ["WALKER, Sophie - Women's Equality Party"],
    ["WHITTLE, Peter Robin - UK Independance Party (UKIP)"],
    ["ZYLINKSKI, Prince - Independent"]
    ]
};

/* create experiment definition array */
var timeline = [];
timeline.push(welcome_block);
timeline.push(pno_block,mayoralElectionFPTP, mayoralElectionApproval, mayoralElectionRanked, mayoralElectionInstantRunoff);


function saveData(filename, filedata){
   $.ajax({
      type:'post',
      cache: false,
      url: 'save_data.php',
      data: {filename: filename, filedata: filedata}
   });
   // jsPsych.data.localSave("data.csv", "csv");
}

function endSurvey() {
    if(window.confirm("The survey is now over. Thank You! Press OK to confirm completion.")) {
          window.location.href=' https://prolificacademic.co.uk/submissions/571e84871bdf1a00129166e7/complete?cc=3BWOLO3N';
      }
      saveData("datafile", jsPsych.data.dataAsCSV());
}

/* start the experiment */
jsPsych.init({
    timeline: timeline,
    on_finish: endSurvey
});
