### Project Description 

For ECE 188 Project M3 EmojiCam I focused on typing different hand emojis.  I used Google's Teachable Machine to train a model that can differentiate a wave,
thumbs up, thumbs down, v-sign, and okay sign from each other (and neutral which means no hands shown).  

### Running the Website 

The website needs a http server in order to run.  I used brew to install http-server on my mac, but you can run http-server through npm alternatively. 

Install http-server: 
```
brew install http-server
```
Setting up and running the website:  
```
cd rootfolder 
http-server . 
```
And then open localhost:8080 in your browser. 
