# Sudoku Solver
Online sudoku puzzle solver that also generates random puzzles. 

#### How to run locally:
1. Clone this repo
2. Run <code>npm install</code> to install dependencies
3. Run <code>npm start</code> to launch the app  

![screenshot](https://github.com/phoebeli23/image-archive/blob/master/spanish.png)


## Project Log 

### Day 1
- Read [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)
- Drew mockup
- Determined component heirarchy
- Built static version
- Issue: I built the grid by creating a div for each row. This does not allow for the squares/grid to resize according to the window, as the rows get broken up when the window width becomes too narrow. I will have to look into re-implementing it with CSS grid tomorrow. 

### Day 2
- Implemented css grid by getting rid of row divs and adding each square component to the grid directly
- This allowed a quick resolution of rows splitting up
- I couldn't get the squares to resize dynamically with grid properties
- Managed to fiddle with view-height and max-width/height to get sizing down

### Day 3
- Handled button and key board events 
- Installed react-keyboard-event-handler
- Highlighted grid cols and rows in focus
- Added state variable to keep track of all Square values in Grid
- Issue: Put state of grid in Grid.js, but the buttons in the button bar, which reside in App.js, also modify state. Need to migrate state variables to App, passing them to Gris as props.
- Resolved above issue
- Implemented reset button and highlighting of invalid input

### Day 4
- Completed backtracking search algorithm to solve puzzle

### Day 5
- Fetched random sudoku puzzle from online API
- Touched up aethestics  
