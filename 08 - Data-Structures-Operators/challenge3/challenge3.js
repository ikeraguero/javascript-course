'use strict';

/* Let's continue with our football betting app! This time, we have a map called
'gameEvents' (see below) with a log of the events that happened during the
game. The values are the events themselves, and the keys are the minutes in which
each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL */

// 1

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

// Converting map to object
const gameEventsObject = Object.fromEntries(gameEvents);

// Creating new set (because we don't want duplicate values)
const events = new Set([]);

// Looping over gameEventsArray object values and adding them to events set
for (const event of Object.values(gameEventsObject)) {
  events.add(event);
}

console.log(events);

// 2

gameEvents.delete(64);
console.log(gameEvents);

// 3

// Getting the length of the array that contains all the keys from the gameEventsObject object, because it'll represent the number of events that happened in the game

const numberEvents = Object.keys(gameEventsObject).length;

// Calculating the average
const avgEvent = 90 / numberEvents;

console.log(`An event happened, on average, every ${avgEvent} minutes`);

// 4

// Looping over the map and destructuring it into key and values
for (const [key, value] of gameEvents) {
  // Using a tenery operator to check in which half an event took place
  const half = key < 45 ? 'FIRST HALF' : 'SECOND HALF';
  console.log(`[${half}] ${key}': ${value}`);
}
