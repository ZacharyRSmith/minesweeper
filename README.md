This README is for ZacharyRSmith's JS recreation of the classic video game "minesweeper". It is for an assigned project (see link and instructions below).

jQuery: 2.1.0

Project link:
http://www.theodinproject.com/javascript-and-jquery/minesweeper

Project instructions:

Project: Minesweeper in Javscript

As you continue to expand your knowledge of Javascript, the programs you build should keep feeling more and more natural. In this project, you'll get a chance to build another classic browser game -- Minesweeper. It'll take some thought to work out the different logic cases, but it's really rewarding to be able to play something like this.

Your Task

Build Minesweeper in the browser. Stick with a small board (9x9 with 10 mines) to start.

The basic rules are that the player must flag every mine on the board without clicking on it. The player gets enough information to solve this because every square that is immediately next to a mine will display the number of mines it is touching. The player only has exactly as many flags as mines. Victory is declared when all squares have been cleared except the mines.

Set up a Github Repo for this project. Follow the instructions atop the Google Homepage project if you need help.
Set up a blank HTML document
Think about how you would set up the different elements within the game. What objects and functions will you need? A few minutes of thought can save you from wasting an hour of coding. The best thing you can do is whiteboard the entire solution before even touching the computer.
Build your board object and the render() function which displays and updates it.
To start the game, randomly place the mines within the board and update your board squares to each show the appropriate number of mines it is touching.
Create the logic necessary to update the board whenever a user clicks in a square. You will want to differentiate between when the user places a flag and when they would like to reveal the square, so see this Stack Overflow post on listening for Right Clicks with jQuery.
Now create the main game logic which checks for failure or victory and then re-renders the board. You'll need to reveal the clicked square and, if that square doesn't directly touch a mine, also appropriately reveal nearby squares until you get to those that do touch mines directly (play the sample game above to see this behavior in action).
Now add a user input for a new game which asks which board size to use.
Create a timer which counts how long it takes for the user to win the game.
Play!
Push your solution to Github and include it below.