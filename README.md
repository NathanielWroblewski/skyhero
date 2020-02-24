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

TODO
===
Make a `target` method for atan2
Reuse it for bullets
refactor
callbacks on collisions to change audio, set game over text
  audio.setAttribute('src', `/public/audio/stage-${track}.mp3`)
move boundaries constants from views into constants file
Look at collision and bounding code and make sure it's not split between models and game objects, make a separate class if necessary
Improve title screen
boss
dive bombers
move audio and images to s3
change inbounds logic to be direction + offscreen
bomber-1.png could be boss? vs tank car
helix should come in from side, not behind
formation flyers should be smoother, borrow angle code
upgraded cannons should do more damage
clean-up start screen rendering
