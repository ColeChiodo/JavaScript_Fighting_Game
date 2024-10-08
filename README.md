# JavaScript_Fighting_Game
This project is a 2d 1v1 Fighting Game created in JavaScript. It is a 2-player game. As this is a fighting game, The goal is to reduce the opponent’s health to 0 before they do so to you. The game ends when the timer reaches 0. Or one of the two players’ health reaches 0. Once the game ends, they page reloads to be played again.

![Demo Of Fighting Game Being Played](/assets/Demo.gif)

## How To Play
This game is intended to be played by 2 players on 1 keyboard.
| Action    | Player 1 Control | Player 2 Control |
| -------- | ------- | ------- |
| Left | A | ← |
| Right | D | → |
| Jump | W | ↑ |
| Crouch | S | ↓ |
| Attack | F | K |
| Block | G | L |

## Gameplay
Each player controls their character, with the goal of defeating the other. \
Each player only has 1 point of health. \
Rounds are ~50 seconds. \
The Game ends after either player loses their health, or the time runs out. \
After a result is decided, the game resets. \
## Movement
Players can move Left or Right. \
Players can Jump up to 2 times into the air. \
Players can crouch. |
Players can attack the enemy. \
Players can block the enemy’s attack. \
## Attack
There are 3 types of attacks. \
Standing attack, or ‘mid’ \
Jumping attack, or ‘high’ \
Crouching attack, or ‘low’ \
After pressing the attack button, there is a time when where your character winds up their attack. In this state, they are unable to move or block. You will remain unable to move again until the attack is finished. \
## Block
There are 2 types of blocks. \
Standing Block, and Crouching Block. \
Standing Block is able to block ‘high’ and ‘mid’ attacks, but not ‘low’. \
Crouching Block is able to block ‘mid’ and ‘low’ attacks, but not ‘high’. \
You are unable to block in the air. \
If you successfully block an attack, you are pushed back a bit and are able to move again. \
## Challenges
One of the hardest challenges was just getting started. When creating games before, I would use programs such as Unity or Unreal. Those programs give you the basics for creating and rendering images on the screen. However, using only JavaScript meant that I needed to do all that on my own. I looked through many tutorials on YouTube to learn how to get a box to move and to have basic physics.
After a few tutorials just to get the basics down, I was then able to work through most of the rest of the gameplay mechanics by myself. Another challenge was getting artwork for the game. It was hard finding resources for assets that were to the specification of what I wanted. So, I had to get ripped assets from other fighting games, to which I then made sprite sheets that I can use
for this game. It was a very time-consuming thing to do, so I could only implement
one character. However, I still programmed my game in a way to where if in the
future I wanted to add more, it would be simple to do. If I am to continue this
game after, that would be one of the first things I do.
