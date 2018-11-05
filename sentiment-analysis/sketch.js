// Movie Sentiment Analysis
// Dan Schellenberg
// Nov 3, 2018

let reviewData; //used to load data from text file
let wordScores; //you need to make this a Map that contains the score for each word
let phraseInput, analyseButton;
let result;

function preload() {
  reviewData = loadStrings("assets/movieReviews.txt");
}


function setup() {
  phraseInput = createInput("");
  phraseInput.attribute("placeholder", "Enter a phrase to be analyzed...");
  phraseInput.parent("phrase");

  analyseButton = createButton("Analyse Now");
  analyseButton.attribute("type", "button");  //will not reload page automatically when pressed
  analyseButton.parent("phrase");
  analyseButton.mousePressed(runAnalysis);

  result = createP();
  result.parent("container");

  wordScores = new Map();
  learnWordScores();
}

function draw() {

}

function learnWordScores() {
  for (let line=0; line<reviewData.length; line++) {
    let wordList = reviewData[line].split(" ");
    let sentiment;
    for (let i = 0; i < wordList.length; i++) {
      if (i === 0) {
        sentiment = Number(wordList[0]);
      }
      else {
        if (wordScores.has(wordList[i])) {
          //add another
          let newScore = wordScores.get(wordList[i]).totalScore + sentiment;
          let newOccurancesSum = wordScores.get(wordList[i]).numberOfOccurances + 1;
          let newAverage = newScore / newOccurancesSum;
          wordScores.set(wordList[i], {totalScore: newScore, numberOfOccurances: newOccurancesSum, average: newAverage});
        }
        else {
          //start a new entry
          wordScores.set(wordList[i], {totalScore: sentiment, numberOfOccurances: 1, average: sentiment});
        }
      }
    }
  }
}

function runAnalysis() {
  let wordsToLookup = phraseInput.value().split(" ");
  let totalScore = 0;
  let numberOfWords = 0;
  for (let i=0; i<wordsToLookup.length; i++) {
    if (wordScores.has(wordsToLookup[i])) {
      totalScore += wordScores.get(wordsToLookup[i]).average;
      numberOfWords++;
    }
  }
  let averageSentiment = totalScore / numberOfWords;
  displayResults(averageSentiment);
}

function displayResults(averageSentiment) {
  if (averageSentiment > 2) {
    console.log("Positive, ", averageSentiment);
    //positive
    result.style("color", "green");
    result.html("Positive Statement<br>An average sentiment of " + averageSentiment);
  }
  else {
    console.log("Negative, ", averageSentiment);
    //negative
    result.style("color", "red");
    result.html("Negative Statement<br>An average sentiment of " + averageSentiment);
  }
}
