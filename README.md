# text-based-shooter

A text-based ghost hunting game.

## Setup

```bash
nvm use
npm i
npm run dev
```

# GDD

## REVISIT:

- Events can reduce timer / Non-Violent solution?

## Description

The user moves through rooms in a text based manner. The goal is to input the ghosts info into the banishment unit.The player can reveal this information by searching the room for clues and solving puzzles. If the ghost kills the player, the round is lost. The player is automatically killed after the timer runs out. A player dies if he remains in the possesed room for too long. The timer shortens depending on the level of possession.

## Story

It is 1986. You are an agent of a company that provides robot-assisted exorcisms. Your company sends robots into haunted places. Remote-controlled robots scout these places for information on the ghost, which has to be entered into the banishment unit to kill the ghost.

As an agent, you select a case to play. You then enter commands that move the robot and let it interact with its surroundings. The further the robot progresses, the angrier the ghost gets. The ghost tries to destroy the robot, depleting it's health. The case is limited by the robots battery charge, representing the timer.

When the battery runs out or the robot is destroyed, connection to the robot is lost and the round is over.

## Concepts

### Cases

Cases are playable units within the game. A case consists of playable rooms amd an unique ghost. cases are configured by a global config which has properties at the root of the json.

cases are meant to be one-shot-units with a time frame of about 10-30 minutes.

```json
{
  "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e", // String, uuid
  "name": "My case", // String
  "description": "This is a short description of the case", // String
  "meta": {
    "duration": "!0 mminutes", // String
    "difficulty": 0, // 0 to 5, levels tbd.
    "contentWarnings": ["Violence", "Nudity"] //Array of Strings, selectable
  },
  "startingRoom": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e", // String, uuid
  "timer": 0, // remaining time in milliseconds, 0 for no time limit, represents ghost battery status
  "rooms": [], // Array of Rooms
  "ghost": {}, // ghost object
  "switches": [], // Array of Switches
  "player": {
    "isHidden": false // boolean, represents if robot can be attacked
    "description": "", // String, description of robot model, for immersion
    "health": 4 // Number, reduced by one on each attack
  },
  "theme": {
    "colors": {
      "primary": "#2E1B1B", // String, Hex colour
      "secondary": "#F4F4F4", // String, Hex colour
      "danger": "#E65656", // String, Hex colour
      "success": "#E65656", // String, Hex colour
      "warning": "#E6D356", // String, Hex colour
      "info": "#56A8E6" // String, Hex colour
    }
  }
}
```

### Actions

Actions are organized in two menus:

- Move
- Action

- Move: Move to an adjecent room via an exit, if that exit is unlocked.
  - NORTH
  - SOUTH
  - WEST
  - EAST
- Action
  - INSPECT Object: Print an objects current state onInspect text to the game window
  - USE Object: Triggers an objects current state onUse action
  - STATUS: Prints model, battery charge (remaining time), damage to screen

### Rooms

A level is made up of rooms, through which the player moves. A Room can have objects. A room has up to four exits can be locked. Rooms have descriptions that are read when the room is entered. Rooms have a different description for different levels of possession., those are defined by different room states. Inside of the starting room is the book of banishment, where the player has to enter the ghosts name.

Example room data:

```json
{
  "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
  "states": [
    {
      "label": "Condition state",
      "text": "Room text",
      "objects": [
        "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
        "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
        "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e"
      ],
      "exits": {
        "NORTH": {
          "to": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
          "onExit": {
            "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
            "isActive": true
          }
        }
      },
      "conditions": [
        {
          "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
          "isActive": false
        }
      ]
    },
    {
      // Default case
      "label": "Default state",
      "text": "default room text",
      "objects": ["c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e"],
      "exits": {
        "NORTH": {
          "to": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
          "onExit": {
            "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
            "isActive": true
          }
        }
      },
      "conditions": false
    }
  ]
}
```

### Ghosts

Ghosts are the enemies in the game. They try to kill the player. They can kill players by running out the levels timer or if the player stays in a possessed room for too long.

A ghost changes rooms after its current speed delay if the player is not in them. Moevement patterns and speed can be changed for each possession level. Possible movement patterns are:

- LINEAR (The ghost takes one of the rooms entries)
- RANDOM (The ghost teleports to a random room)
- Pattern (The ghost cycles through an array of Rooom IDs)

Ghosts have a name. If the name is entered in the book of banishment, the round is won. It is also possible to add more data to the ghost. Then the player has to enter all information to win.

The ghost name consists of strings. It is randomly chosen from the first and last names. If no last name is given, it is chosen from the first names. If only one first name is set, it is always the ghosts name. All data is given as an array of strings, from which one value is selected at game start. if the array has one value, it is the default.

When the player encounters the ghost, the attack timer starts. If the timer reaches zero, the players health is depleted by one and the attack text is printed to the console and the counter starts again. If the players health reaches zero, the death text is printed and the game is over. If the player is currently hidden, the timer does not start, even if the ghost and robot are in the same room.

Exapmle ghost data:

```json
{
  "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
  "data": {
    "firstName": ["Jane"], // String Array
    "lastName": ["Doe"], // String Array, optional
    "causeOfDeath": ["Bludgeoned", "Drowned"], // String Array, optional
    "killer": {
      "firstName": ["Jane"], // String Array, optional
      "lastName": ["Doe"] // String Array, optional
    }
  },
  "states": [
    {
      // condition case, Possession level 1
      "label": "Raised ghost state",
      "movement": {
        "pattern": "RANDOM",
        "speed": 300
      },
      "attack": {
        "timer": 300,
        "attackText": ["The ghost attacks you!"],
        "deathText": ["Your senses fade..."]
      },
      "conditions": [
        {
          "id": "ghostState1",
          "isActive": true
        }
      ]
    },
    {
      // Default case, Possession level 0
      "label": "Default ghost state",
      "movement": {
        "pattern": "LINEAR",
        "speed": 300
      },
      "attack": {
        "timer": 0, // Set timer to zero for no attack in this phase
        "attackText": ["The ghost attacks you!"],
        "deathText": ["Your senses fade..."]
      },
      "conditions": false
    }
  ]
}
```

### Objects

Objects give the player information. Objects are organised in rooms. Objects can be inspected to give the objects text. Objects can be used to trigger the objects on use action. in the action, switches are set to a certain state.

### TODO: Make Objects usable

Example Object data:

```json
{
  "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
  "label": "Object text",
  "text": "Lorem ipsum dolor sit amet",
  "onUse": [
    {
      "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
      "isActive": true
    }
  ]
}
```

#### Special Actions

Some objects can trigger special actions, like set the player to hidden, set the timer, print a text to the screen or trigger a game over.

### TODO: WORK THIS OUT

### Switches and Dice

Switches control case state and are mutable after case start.
Dice control game randomization and are immutable after case start.

#### Switches

Switches can be used to alter the game flow on certain conditions. Switches can be ON or OFF. Switches are OFF by default. The game provides certain system switches that are activated on certain game events. Those are always set and manipulated by the system on certain conditions, regardless of case. System switches are divided into certain groups:

- Ghost
- GameState
- Timer

Example switch data:

```json
{
  {
    "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
    "isActive": false,
    "label": "Testswitch"
  }
}
```

Example system switch data:

```json
{
  {
    "id": "ghostState0",
    "isActive": false,
    "label": "Ghost Level is at 0"
  }
}
```

### Dice

Dice take one of several values on game start, like a dice being thrown. This can be used to make certain conditions easier, like displaying one of 6 Objects randomly. There are no system dice. Dice can have a value of up to 20.

```json
{
  {
    "id": "c4a760a8-dbcf-4b7e-8f1a-7b8c5e5a8d0e",
    "value": 6,
    "label": "Random item in kitchen"
  }
}
```

### Timer

The timer starts at the start of the case if a timer is configured. At the end of the timer, the player loses the round. The timer and timer switches are set by the cases clock instance of the clock class.

## Technical

### Stack

- JS
- CSS3
- HTML5

### Views

<!-- - Title Screen / Main Menu – index.htmlx -->

- Loading Screen
- Game View
- Cart select
- Settings
- About

### Supported Controls

- Touch
- Keyboard / Mouse
- Gamepad

## Style

The game is text-only and in a brutalist style smiliar to a bios. The theme style consists of two colours
