// Movie Sentiment Analysis Starter Code
// Your Name
// Put the Date Here

let reviewData; //used to load data from text file
let wordScores; //you need to make this a Map that contains the score for each word
let phraseInput, analyseButton;
let result;

function preload() {
  reviewData = loadStrings("assets/movieReviews.txt");
}


function setup() {
  //you shouldn't have to change anything in the setup function...
  phraseInput = createInput("");
  phraseInput.attribute("placeholder", "Enter a phrase to be analyzed...");
  phraseInput.parent("phrase");

  analyseButton = createButton("Analyse Now");
  analyseButton.attribute("type", "button");  // note to self: button type instead of submit type
  analyseButton.parent("phrase");
  analyseButton.mousePressed(runAnalysis);

  result = createP();
  result.parent("container");

  // note that an empty map has already been created for you
  wordScores = new Map();

  learnWordScores();
}

function draw() {

}

function learnWordScores() {
  //need to loop through the information from the text file, and assign appropriate scores to each word
  for (let line=0; line<reviewData.length; line++) {
    let wordList = reviewData[line].split(" ");
    let score = Number(wordList[0]);

    for (let i = 1; i < wordList.length; i++) {
      if (wordScores.has(wordList[i])) {
        //have seen this word Before
        let newScore = wordScores.get(wordList[i]).totalScore + score;
        let newOccurancesSum = wordScores.get(wordList[i]).numberOfOccurances + 1;
        let newAverage = newScore / newOccurancesSum;
        wordScores.set(wordList[i], {
          totalScore: newScore,
          numberOfOccurances: newOccurancesSum,
          average: newAverage,
        });
      }
      else {
        //brand new word
        wordScores.set(wordList[i], {
          totalScore: score,
          numberOfOccurances: 1,
          average: score,
        });
      }
    }

  }
}

function runAnalysis() {
  let wordsToLookup = phraseInput.value().split(" ");
  // you need to look up each word typed in, which is given in the array above.
  // use those to calculate whether the average sentiment of all the words put together
  let totalScore = 0;
  let numberOfWords = 0;
  for (let i = 0; i < wordsToLookup.length; i++) {
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
    result.style("color", "green");
    result.html("Positive Statement<br>An average sentiment of " + averageSentiment);
  }
  else {
    result.style("color", "red");
    result.html("Negative Statement<br>An average sentiment of " + averageSentiment);
  }
}
