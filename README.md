# Cribbage Solver

While I was playing Cribbage one night, I realized that there's a lot of strategy involved that boils down to some straightforward mathematical calculations. This program attempts to automate those calculations, to help the player make informed decisions while playing the game.

## Background
At the beginning of each hand, each player is dealt six cards. The player must choose four of these cards to keep in their hand, and two to put into the crib. The /crib/ is an additional four-card hand that is owned by the dealer for that specific turn. At the end of each turn, each player scores their hand, which is composed of their four cards plus a fifth random card (the /starter/) turned up from the top of the deck. The scoring is a straightforward combinatorial algorithm, which this program implements.

This program allows a player to input their six cards, and it will compute the expected value for each combination of four cards therein, based on the probability of any specific starter card appearing.

## How to use
This is a self-contained web application written in JavaScript, using freely-available frameworks and libraries. Simply download the source, then open index.html in a browser.