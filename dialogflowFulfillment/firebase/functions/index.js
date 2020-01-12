'use strict';
 
// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');
 
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');
 
// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

//Insults of Wit
const smarts = 
	[
		"You have a plentiful lack of wit.",
		"Your wit’s as thick as a Tewkesbury mustard.",
		"Your abilities are too infant-like for doing much alone.",
		"If thou wilt needs marry, marry a fool; for wise men know well enough what monsters you make of them.",
		"More of your conversation would infect my brain.",
		"Thou sodden-witted lord! Thou hast no more brain than I have in mine elbows!",
		"You have not so much brain as ear-wax."
	];
	
//Insults of Looks
const looks = 
	[
		"Out of my sight! thou dost infect my eyes.",
		"You have such a February face, so full of frost, of storm and cloudiness.",
		"I am sick when I do look on thee.",
		"Thou art a boil, a plague sore, an embossed carbuncle in my corrupted blood.",
		"The tartness of your face sours ripe grapes.",
		"Thou lump of foul deformity",
		"You are Like the toad; ugly and venomous.",
		"Thou cream faced loon!"
	];
	
//Insult sense of humor
const humor = 
	[
		"Thou art the cap of all the fools.",
		"Foul spoken coward, that thund’rest with thy tongue, and with thy weapon nothing dares perform.",
		"You are as a candle, the better burnt out.",
		"What a thrice-double ass!"
	];
	
//Insult a liar
const liar = 
	[
		"Heaven truly knows that thou art false as hell.",
		"Thou subtle, perjur’d, false, disloyal man!",
		"Dissembling harlot, thou art false in all.",
		"There’s no more faith in thee than in a stewed prune.",
		"You are a most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality.",
		"Thy tongue outvenoms all the worms of Nile."
	];
	
//Insult a person's character
const character = 
	[
		"You, minion, are too saucy.",
		"I scorn you, scurvy companion.",
		"You are not worth another word, else I’d call you knave.",
		"Would thou wert clean enough to spit upon.",
		"I do desire that we may be better strangers.",
		"A weasel hath not such a deal of spleen as you are toss’d with."
	];
	
//Random Insults
const random = 
	[
		"Thou has clay-brained guts, thou art a knotty-pated fool, thou art a whoreson obscene greasy tallow-catch!",
		"Villain, I have done thy mother.",
		"Away, you three-inch fool!",
		"Thou damned and luxurious mountain goat.",
		"Thou leathern-jerkin, crystal-button, knot-pated, agatering, puke-stocking, caddis-garter, smooth-tongue, Spanish pouch!",
		"You scullion! You rampallian! You fustilarian! I’ll tickle your catastrophe!",
		"Thou art unfit for any place but hell.",
		"Thou flea, thou nit, thou winter-cricket thou!",
		"Would thou wouldst burst!",
		"I’ll beat thee, but I would infect my hands.",
		"Pigeon-liver’d and lack gall."
	];
	
const adjectives = 
    {
      "smart" : ["smart", "intelligent"],
      "funny" : ["funny", "hilarious"],
      "pretty" : ["pretty", "beautiful", "hot", "cute", "handsome"],
      "liar" : ["liar", "fraud", "fake", "imposter"],
      "charming" : ["charming", "loveable"]
    }; 
 
 
// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length;
    // Respond with the user's lucky number and end the conversation.
    conv.close('Your lucky number is ' + luckyNumber);
});

// Handle the Dialogflow intent named 'Shakey Slams'.
// The intent collects a parameter named 'Adjectives'.
app.intent('Shakey Slams', (conv, {ShakeyWords}) => {
  
  conv.close(ChooseInsult(ShakeyWords));
});

function ChooseInsult(ShakeyWords){
  
  if(adjectives.smart.includes(ShakeyWords)){
    return RandomizedInsult("smarts");
  }
  
  if (adjectives.funny.includes(ShakeyWords)){
    return RandomizedInsult("humor");
  }
  
  if (adjectives.pretty.includes(ShakeyWords)){
    return RandomizedInsult("looks");
  }
  
  if (adjectives.liar.includes(ShakeyWords)){
    return RandomizedInsult("liar");
  }
  
  if (adjectives.charming.includes(ShakeyWords)){
    return RandomizedInsult("character");
  }
  
  return RandomizedInsult("random");
}

function RandomizedInsult(type){
	let len = 0;
	let i = 0;
	
	if(type == "looks"){
		len = looks.length;
		i = Math.floor((Math.random() * len));
		return looks[i];
	}
	
	if(type == "character"){
		len = character.length;
		i = Math.floor((Math.random() * len));
		return character[i];
	}
	
	if(type == "humor"){
		len = humor.length;
		i = Math.floor((Math.random() * len));
		return humor[i];
	}
	
	if(type == "liar"){
		len = liar.length;
		i = Math.floor((Math.random() * len));
		return liar[i];
	}
	
	if(type == "smarts"){
		len = smarts.length;
		i = Math.floor((Math.random() * len));
		return smarts[i];
	}
	
	len = random.length;
	i = Math.floor((Math.random() * len));
	return random[i];
}
 
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);