# About

This is my side project Twitch-Recorder.

What the program does is it uses [puppeteer](https://github.com/puppeteer/puppeteer) to open the a twitch stream in a chrome browser then it will use [puppeteer-stream](https://github.com/Flam3rboy/puppeteer-stream) to record it until stream is over. You can set it to a stream that is offline and it will wait for that streamer to start streaming.

This was made for windows and ubuntu so it has not been tested in any other operating system. Though it will most likely still work. Please see Required section.

I made this program out of spite. There is a twitch streamer I like that only streams at 4am my time and their VOD's are sub only. So I just leave this program running on my server so I have the stream saved for later.

Feel free to take as much as you want from this project and use it on your own. No credits needed but much appreciated.

# Features

- Record only audio
- Record only video
- Automatically cut out silence | Still work in progress as there still are some bugs needing to be fixed
- Set custom fps
- Record only certain categories
- Once done recording & encoding automatically wait for streamer to start streaming again
- Enable/Disable recording rerun streams

# Required

This project requires that you have google chrome installed on the machine. [How to install chrome on ubuntu.](https://askubuntu.com/questions/510056/how-to-install-google-chrome) The built in Chromium doesn't work because it has issues with watching streams. Make sure that chrome is installed in the correct directory. If it isn't you have to install it correctly or edit the code. See [Extra](https://github.com/stianwiu/twitchrec#extra) on how to do that.

If you are on ubuntu or any linux machine it is required that you install ffmpeg. For windows there is a exe included.

For both windows and Linux you need [Node.js](https://nodejs.org/) and [npm](https://nodejs.org/) installed.

# Build Setup

```bash
# clone repo
$ git clone https://github.com/StianWiu/TwitchRec/

# install dependencies
$ npm i

# install ffmpeg. Only for linux, there is a ffmpeg exe included in the repository. Gotten from www.ffmpeg.org/
$ sudo apt-get install ffmpeg

# start project with node
$ node index.js --user pignuuuu --windows false --frames 32 --threads 4

# To see all options run
$ node index.js --help
```

# Issues

- `Running as root without --no-sandbox is not supported. `
  - You can't run this program with root permissions without getting a bunch of weird problems. The recommended way of fixing this is to run your command without root permissions and make sure the user you have has full acces to delete, move & rename files. If you are insisting on running it with root. You could go into the sourcecode and add `"--no-sandbox" ` to the `args:` section. [See this for an explaination](https://developers.google.com/web/tools/puppeteer/troubleshooting#setting_up_chrome_linux_sandbox)

# Extra

In order to edit the code you will need to go into the [index.ts](https://github.com/Pignuuu/twitch-recorder/blob/main/index.ts) file and code there.

Then to compile it into javascript

```bash
$ npm run tsc
```
