//Using Math functions
function pow(exponent) {
    return function (number) {
      return Math.pow(number, exponent);
    };
  }
  /* I solved it by defining all functions inside pingPongTracker function.*/
  function pingPongTracker() {
    let totalTime = 0;
    function playOneGame() {
      totalTime += 15;
      return "Game played";
    }
    function timeSpentPlaying() {
      return totalTime;
    }
    function myLevel() {
      if (totalTime < 30) {
        return "I need to improve my game";
      } else if (totalTime <= 100) {
        return "You need to improve your game";
      } else {
        return "Wow, I have wasted a lot of time";
      }
    }
    return {
      playOneGame: playOneGame,
      timeSpentPlaying: timeSpentPlaying,
      myLevel: myLevel
    };
  }
  
  
  var square = pow(2);
  var cube = pow(3);
  
  console.log(square(3)); // should return 9
  console.log(cube(3));   // should return 27
  
  
  
  var myGame = pingPongTracker();
  console.log(myGame.playOneGame());         // should return "Game played";
  console.log(myGame.playOneGame());         // should return "Game played";
  console.log(myGame.timeSpentPlaying());    // should return 30;
  console.log(myGame.myLevel());             // should return "You need to improve your game"
  