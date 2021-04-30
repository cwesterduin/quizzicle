# Trivia Duck <img src="https://i.imgur.com/kKh40uK.png" width="100" height="100"> 
## Shoot yourself into space ...

[![Netlify Status](url)


## Client

Dear User,

We welcome you to our quizz game based on Open Trivia DB API. We hope it helps you to unwind and have couple of laughs along the way. We even hope it will spark a little bit of nostalgic feeling for you and your family and will encourage you to get together and spend your evening in a good company! Without further ado, fasten your belts: Ready! Steady! Take off! :rocket:

## Aim 
Create multiplayer quizz web app with a space theme design that would allow users to simultaneously answer questions, choose No. of questions for each game and level of difficulty as well as topic of the quiz. Storage of high scores is also to be included. 

## Installation and using the website

### Using Netlify deploy link
[Trivia Duck](https://trivia-quack.netlify.app/)

### Downloading and running locally for open source development
1. Clone the repository into a folder on your local machine
2. cd into clien and api and run installation command `npm install` in each one to install all required dependencies
3. cd into the newly created folder and open code editor of your choice
- Client and server will have to be started separately in the following way:
4. cd into client and run `npm run dev` command
5. cd.. out of client and run `bash _scripts/startDev.sh` command (for other shells replace bash as appropriate)
6. Browser tab should open automatically in your default browser. If page does not render on successful compilation of the client, open it by typing `localhost:8080`.

## Technologies

1. React
2. Redux
3. MongoDB
4. SocketIO
5. Docker Compose
6. Bootstrap front-end framework
7. Express back-end framework
8. SASS/SCSS for styling
9. Axios API for data fetching

## Design Processes

Main stages of the process were:
1. Initial brainstorming:
- whole group collaborated on creating initial PhotoShop mockups of the game;
- came up with initial name ideas;
- chose main theme for the game and icon
- thought out our intended audience to tailor design decisions
2. Implementation of initial design layout and creating routed pages in React.
3. Creating corresponding components for each page.
4. Refining each design page to unify the style of the app. 
5. Adding extra style features like animations and theme transitions

- Design has been greatly enhanced by following React-Redux philosophy. Authors of the app attempted to stay true to the philosophy of these tools and tailored our code to reflect this.

## Teamwork Approaches

1. Agile team working approach 
- Tickets were created as part of a team effort using GitHub Kanban board after initial design specifications were set. 
- Team members would take on whatever tickets they felt capable of and interested in tackling.
- Communication was crucial through central channel on Slack to ensure no duplicate or conflicting work was created. 
- Project was broken down into self-contained short sprints to deliver project on time and mitigate any rolling risks. 

Basic initial design (game page)

![image](https://i.imgur.com/PHJcEi8.png)

<img src="https://i.imgur.com/VZTHhit.png" width="300"> 

## todo / bugs

- when creating a game, user should be able to send parameters from form

- store player icon in redux / db for results
	- icons currently re-reassign whenever playerlist compoennet rerenders (which is often)
	- just move the icon state to the redux store, similar to ready state
	- also send this value to the database when players are created so icon matches on hiscores

- prevent users joining lobby when game is started / completed
- prevent users joining game when game is completed
	- logic for this exists on the server at the game/:id/simple route, just a matter of blocking the rendering on the client

- improve visuals of answer buttons, maybe take a look at how the state is set up here 
- submit event on the button should only fire once. Maybe call the redux action in the parent when it moves to the next question rather than on clicking the submit button

- set usernames? again think this would just be a case of adding this as an attribute to the player store and sending to the db also 

- results page should be formatted using the much more visually pleasing Hiscore page component

- refactor code 
	- there is a lot of reusable code that we could use components / custom hooks for to make testing easier
	- we can split out the redux actions etc again or just structure the project so they are in single files, whatever makes it clearest / easy to test  

- add global hiscore functionality
	- when user scores are calculated we could add each score to a scores document in the db

## API 
- POST /games
  - creates a new game with a unique id and a list of questions, returns the id to redirect the user
  - optional query params like this /games?amount=5&difficulty=easy&category=10&type=multiple
    - if these are left out then random values will be assigned  
 
 - GET /games/:id e.g /games/6086c0c4d44a15002cf791b4
   - returns array of questions for that game
   
```
   {
  "id": "6086c0c4d44a15002cf791b4",
  "questions": [
    {
      "category": "Sports",
      "type": "boolean",
      "question": "Peyton Manning retired after winning Super Bowl XLIX.",
      "possible_answers": [
        "True",
        "False"
      ]
    }, ... 
   ]
  }
```
 - GET /games/:id/simple 
   - returns an object with info about that game but no questions

```
{
  "completed": false,
  "started": true,
  "type": "multiple",
  "category": "Politics",
  "length": 5
}
```

- POST /games/:id/player/:playername e.g /games/6086c0c4d44a15002cf791b4/player/bob
  - no body
  - creates a new player in that game  


- POST /games/:id/player/:playername/answers e.g /games/6086c0c4d44a15002cf791b4/player/bob/answers
  - is sent at the end of the game
  - needs a body of an array of a users answers e.g ["True", "False", "True"] or ["Ozzy Osbourne", "Abigail", "5"]
  - adds users answers to the game

- Get /games/:id/results e.g /games/6086c0c4d44a15002cf791b4/results
  - sends a list of validated answers for the players in a game
  - also sends scores
