SkyHero
===

![Screenshot](https://raw.githubusercontent.com/NathanielWroblewski/skyhero/master/public/images/screenshot.png)

Watch a video here:
[![Screenshot](https://raw.githubusercontent.com/NathanielWroblewski/skyhero/master/public/images/video_thumbnail.png)](https://youtu.be/HUTJNY7UE8o)

Play [here](https://www.nathaniel.ai/skyhero)

Running locally
---

On a mac, clone the repo, and run a server:

```
$ git clone https://github.com/NathanielWroblewski/sky-shark.git
$ cd sky-shark
$ open http://localhost:8000 && python3 -m http.server
```

TODO
===

 - Make a `target` method for atan2 and reuse it for "rockets"
 - General refactor
 - move boundaries constants from views into constants file
 - Look at collision and bounding code and make sure it's not split between models and game objects, make a separate class if necessary
 - Improve title screen
 - dive bombers
 - change inbounds logic to be direction + offscreen
 - helix should come in from side, not behind
 - formation flyers should be smoother, borrow angle code
