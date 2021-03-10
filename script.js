const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// all pastas (in for of objects) with acompagnying descriptions and image urls
const gnocchi = {
    name : "Gnocchi",
    text : "Gnocchay-Okay! You can be a little high-maintenance, but dealing with you is totally worth it in the end. You appreciate the finer things in life and you never pass on an opportunity for a nice meal. You're outgoing, adventurous, and always willing to try new things. Sometimes you come across as too particular, so try to remember to go with the flow. Now, go enjoy some caviar!",
    image : "images/pngImages/gnocchi.png",
}

const cavatappi = {
    name : "Cavatappi",
    text : "You're such a Cavatappi, it's not even funny. You're spunky, unique, and are always down for a good time. You're also witty, creative, and fun to be around- you got it all! Sometimes you take things too far, so you should remember to slow it down and think things through. Keep being your awesome self, and you'll shine like a star for all the world to see!",
    image : "images/pngImages/cavatappi.png",
}

const campanelle = {
    name : "Campanelle",
    text : "Hey there, you campanelle!! You're adventurous, spontaneous, witty, and an all-around great person. Everyone loves to be around you because you always bring the party. You're unique and you know it! You probably have a caffeine addiction and you should consider slowing down on the coffee... you're so energetic that you don't even need it! Farewell, campanelle!",
    image : "images/pngImages/campanelle.png",
}

const ravioli = {
    name : "Ravioli",
    text : "You got...RAVIOLIIIIIII! You're everyone's favorite and you know it. You’re extremely flexible, easy-going, and have no problem doing what everyone else wants to do. You're also patient, mature, and unafraid of change. You can sometimes be indecisive because you don't know what you want, so don't be afraid to be bold and speak your mind! Keep going with the flow, bro!",
    image : "images/pngImages/ravioli.png",
}

const penne = {
    name : "Penne",
    text : "Penn-YAY! You like to keep it simple. You know what you like, and you DO NOT like change. You're dependable, trustworthy, and loyal which makes you a great friend. You can often get stressed and overwhelmed at times, so you should remember to not be so hard on yourself. Keep doing what you're doing- you're doing great!",
    image : "images/pngImages/penne.png",
}

const spaghetti = {
    name : "Spaghetti",
    text : "Hey Spaghetti!! You keep it classic. You're very afraid of change and do not like trying new things. You like what you like, and you're happy keeping things just the way they are! Sometimes your stubbornness comes across as immature, so you should try to relax and go with the flow a little more. Now, go eat some plain red sauce and meatballs!",
    image : "images/pngImages/spaghetti.png",
}

// the maxium score possible
const maxAnswer = 30;

// every pasta together
let pastaList = [spaghetti, penne, ravioli, campanelle, cavatappi, gnocchi];

// how we keep track of someone's answers as they go along.
// allows for people to change their answers if they feel like it without us having to go through the code and remove duplicates
// and for them to answer in dissorder
let yourAnswers = {
    q1: 100,
    q2: 100,
    q3: 100,
    q4: 100,
    q5: 100,
    q6: 100,
    q7: 100,
    q8: 100,
    q9: 100,
    q10: 100,
};

// callled when press button. 
// seperated into differnt d3 calls to store the data into the correct location in the yourAnswers object
d3.selectAll(".q1").on("click", function() {
    yourAnswers.q1 = this.value;
    buttonOnClick(1, this);
});

d3.selectAll(".q2").on("click", function() {
    yourAnswers.q2 = this.value;  
    buttonOnClick(2, this);
});

d3.selectAll(".q3").on("click", function() {
    yourAnswers.q3 = this.value;
    buttonOnClick(3, this);
});

d3.selectAll(".q4").on("click", function() {
    yourAnswers.q4 = this.value;
    buttonOnClick(4, this);
});

d3.selectAll(".q5").on("click", function() {
    yourAnswers.q5 = this.value;
    buttonOnClick(5, this);
});

d3.selectAll(".q6").on("click", function() {
    yourAnswers.q6 = this.value;
    buttonOnClick(6, this);
});

d3.selectAll(".q7").on("click", function() {
    yourAnswers.q7 = this.value;
    buttonOnClick(7, this)
});

d3.selectAll(".q8").on("click", function() {
    yourAnswers.q8 = this.value;
    buttonOnClick(8, this);
});

d3.selectAll(".q9").on("click", function() {
    yourAnswers.q9 = this.value;
    buttonOnClick(9, this);
});

d3.selectAll(".q10").on("click", function() {
    yourAnswers.q10 = this.value;
    buttonOnClick(10, this);
});

// function to avoid duplicating code for the button presses
function buttonOnClick(i, object) {
    d3.selectAll(`.q${i}`).attr("class", "notChosen");
    d3.select(object).attr("class", "chosen");

    // calls the getPastaType at every click of a button.
    // only does something if all the questions have been answered
    getPastaType();


};

// function that only does something if all the questions are answered
// if all answered, calls the printFinalPastaType() method

function getPastaType() {
    // calculation to see if all questions are answered
    // for it to pass, need allAnswers to be within -30 and 30
    var allAnswers = 0 - yourAnswers.q1 - yourAnswers.q2 -  yourAnswers.q3 -  yourAnswers.q4 -  yourAnswers.q5 - yourAnswers.q6 - yourAnswers.q7 - yourAnswers.q8 - yourAnswers.q9 - yourAnswers.q10;

    // to make sure calculation is occuring as it should
    console.log(allAnswers);

    // if statement that checks conditions
    if (allAnswers < 31 && allAnswers > -31) {
        // need for finalPasta to be positve
        let finalPastaIndex = Math.abs(allAnswers);
        // need it to be integer
        x =  Math.floor(finalPastaIndex * pastaList.length / maxAnswer);
        printFinalPastaType(x);
    }

};


// prints the final pasta type onto screen based on given integer
function printFinalPastaType(i) {

    // the pasta in question.
    // we can determine its title, image link and description thanks to the objects written above
    pasta = pastaList[i];
    title = `You got: ${pasta.name}!`;
    imageSRC = pasta.image;
    paragraph = pasta.text;

    // change the elements in the html to match the given pasta type

    d3.select(".finalTitle").html(title);
    d3.select(".finalParagraph").html(paragraph);
    d3.select(".finalPicture").attr("src", imageSRC);
    d3.select(".finalPicture").attr("width", 300);
}
