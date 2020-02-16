sky-shark
===

![Screenshot](https://raw.githubusercontent.com/NathanielWroblewski/sky-shark/master/public/images/screenshot.png)

Running locally
---

On a mac, clone the repo, and run a server:

```
$ git clone https://github.com/NathanielWroblewski/sky-shark.git
$ cd sky-shark
$ open http://localhost:8000 && python -m SimpleHTTPServer
```

TODO:
  - Loading states
  - Add a favicon
  - Add social tag descriptions


  - add tree shadow
  - add tanks
  - fix targeting computer, maybe focus on navigation routes/shapes?
    U,I,J,L,P,Q
    individual,congaline,flying-v,wingman
  - add bombers with HP
  - add water
  - add gunboats
  - add runway
  - add bombing


Make patterns/routes multiples of width/height instead of raw numbers
Make a `target` method for atan2
Reuse it for bullets
Make a pass to clean up the code before adding enemy bullets
Fix tank stopping with last velocity
Tanks pull player to deadly edge
Look at collision and bounding code and make sure it's not split between models and game objects, make a separate class if necessary
Reverse some trees
Change ground color
Enemy bullets yellow orange orbs?
With tail?
Title screen with controls
Music
Make grass dark dirt
Thinking about water, tanks become gunboats, have traversable or non traversable tiles?  Maybe odd numbered sections are non traversable?  Bridge/docks
Break up the tedium of the jungle
Score is based on tile row count?  And tile row count is used to change the venue?
Score + lives + bombers with hp + boss?



wave selector based on difficulty/points
-> start by implementing points
-> increase waves from 1 to 2 to 3 to 4 to 5 every 100 tiles? based on points
tiles 0..25, 1
      26..50, 2
      51..100, 3
      101..300, 4
      301..501, 5,
       ...



