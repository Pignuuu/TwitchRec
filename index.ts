const logo = require("asciiart-logo");
const printLogo = () => {
  console.log(
    logo({
      name: "Pignuuu",
      font: "Chunky",
      lineChars: 10,
      padding: 2,
      margin: 3,
    })
      .emptyLine()
      .right("V1.0.0")
      .emptyLine()
      .center(
        'Twitch recording software. Developed by Pignuuu :) "--help" for options'
      )
      .render()
  );
};
printLogo();

import { Command } from "commander";
import { Timer } from "timer-node";
const program = new Command();
const randomstring = require("randomstring");
var nrc = require("node-run-cmd");
const { launch, getStream } = require("puppeteer-stream");
const fs = require("fs");

// Add options for command
const noUserSpecified = () => {
  console.log("Missing argument -u or --user");
  process.exit();
};
const noOsSpecified = () => {
  console.log("Missing argument -w or --windows");
  process.exit();
};

program.option("-u, --user <username>", "Twitch user to record [Required]");
program.option(
  "-w, --windows <boolean>",
  "Using windows true or false [Required]"
);
program.option("-f, --frames <num>", "How many fps to export to [Optinal]");
program.option(
  "-t, --threads <num>",
  "How many threads to use when encoding [Optinal]"
);

program.parse(process.argv);
const options = program.opts();

let windows = undefined;
let fps = undefined;
let threads = undefined;
let rerunStream = undefined;

const checkConfiguration = () => {
  if (options.user) {
    if (options.windows == "true" || options.windows == "false") {
      if (options.windows == "true") {
        windows = true;
      } else {
        windows = false;
      }
      if (options.frames) {
        fps = options.frames;
      } else {
        fps = 24;
      }
      if (options.threads) {
        threads = options.threads;
      } else {
        threads = 1;
      }
    } else noOsSpecified();
  } else noUserSpecified();
};
checkConfiguration();

const filename = randomstring.generate({
  length: 10,
  charset: "hex",
});

async function startRecording() {
  const timer = new Timer({ label: "test-timer" });
  timer.start();
  let browser = undefined;
  if (windows == true) {
    browser = await launch({
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe ",
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
  } else {
    browser = await launch({
      executablePath: "/usr/bin/google-chrome-stable",
      defaultViewport: {
        width: 1024,
        height: 768,
      },
    });
  }
  console.log("Opening browser.");
  const page = await browser.newPage();
  console.log("Opening twitch stream");
  await page.goto(`https://www.twitch.tv/${options.user}`);
  const originalUrl = page.url();

  const checkIfLive = async () => {
    if (
      (await page.$(
        `#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.channel-root--watch-chat.channel-root--live.channel-root--watch.channel-root--unanimated > div.Layout-sc-nxg1ff-0.bDMqsP.channel-root__main--with-chat > div.channel-root__info.channel-root__info--with-chat > div > div.Layout-sc-nxg1ff-0.jLilpG > div > div > div > div.Layout-sc-nxg1ff-0.iMHulU > div > div > div > a > div.Layout-sc-nxg1ff-0.ScHaloIndicator-sc-1l14b0i-1.dKzslu.tw-halo__indicator > div > div > div`
      )) !== null
    )
      return true;
    else return false;
  };
  const checkIfRerun = async () => {
    if (
      (await page.$(
        `#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.channel-root--watch-chat.channel-root--live.channel-root--watch.channel-root--unanimated > div.Layout-sc-nxg1ff-0.bDMqsP.channel-root__main--with-chat > div.channel-root__info.channel-root__info--with-chat > div > div.Layout-sc-nxg1ff-0.jLilpG > div > div > div > div.Layout-sc-nxg1ff-0.iMexhI > div.Layout-sc-nxg1ff-0.dglwHV > div.Layout-sc-nxg1ff-0.kBOtQI > div > div:nth-child(2) > div > div > div.Layout-sc-nxg1ff-0.ftYIWt > a > span`
      )) !== null
    )
      return true;
    else return false;
  };

  console.log("Waiting for page to load");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("Checking if streamer is live");
  while ((await checkIfLive()) == false) {
    console.log("Streamer is not live");
    await new Promise((resolve) => setTimeout(resolve, 60000));
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  }
  console.log("Checking if stream is a rerun");
  if ((await checkIfRerun()) == false) {
    console.log("This stream is a rerun \nContinuing to record anyways");
    rerunStream = true;
  } else {
    rerunStream = false;
  }

  console.log("Reloading webpage");
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  console.log("Fullscreening stream");
  await page.keyboard.press("f");
  console.log("Checking if stream is agerestricted");
  try {
    await Promise.all([
      await page.click(
        `#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div > div > div > div.Layout-sc-nxg1ff-0.krOuYh.player-overlay-background.player-overlay-background--darkness-0.content-overlay-gate > div > div.Layout-sc-nxg1ff-0.bzQnIQ.content-overlay-gate__allow-pointers > button`
      ),
    ]);
    console.log('Stream is agerestricted\nClicked "Start Watching" button');
  } catch (err) {
    console.log("Stream is not agerestricted");
  }
  const file = fs.createWriteStream(
    `./videos/${options.user}-${filename}.webm`
  );
  const stream = await getStream(page, { audio: true, video: true });
  console.log("Now recording");
  console.log(
    "Recording will stop when:\nStreamer goes offline / Streamer raids different stream / Streamer starts a rerun"
  );

  stream.pipe(file);

  while ((await checkIfLive()) == true) {
    if (originalUrl != page.url()) {
      console.log("Stopping recording because streamer raided someone else");
      break;
    }
    if ((await checkIfRerun()) == false && rerunStream == false) {
      console.log("Stream is a rerun");
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }

  await stream.destroy();
  stream.on("end", () => {});
  await new Promise((resolve) => setTimeout(resolve, 2500));
  console.log(
    `FFmpeg encoding starting now.\nFps set to ${fps}\nEncoding using ${threads} threads\n`
  );
  if (windows == true) {
    await nrc.run(
      `ffmpeg.exe -i videos/${options.user}-${filename}.webm -threads ${threads} -r ${fps} -c:v libx264 -crf 20 -preset fast videos/${options.user}-${filename}.mp4`
    );
  } else {
    await nrc.run(
      `ffmpeg. -i videos/${options.user}-${filename}.webm -threads ${threads} -r ${fps} -c:v libx264 -crf 20 -preset fast videos/${options.user}-${filename}.mp4`
    );
  }
  console.log("Encoding has finished.\nDeleting temporary stream file.");
  await fs.unlinkSync(`./videos/${options.user}-${filename}.webm`);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  console.clear();
  await printLogo();
  console.log(`\n\n Your file is ready.\n`);
  timer.stop();
  console.log(
    timer.format(
      "Entire process took [%d] Days, [%h] hours, [%m] Minutes, [%s] Seconds"
    )
  );
  process.exit();
}

startRecording();
