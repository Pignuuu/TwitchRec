"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var commander_1 = require("commander");
var puppeteer_stream_1 = require("puppeteer-stream");
var program = new commander_1.Command();
var puppeteer = require("puppeteer");
var randomstring = require("randomstring");
var fs = require("fs");
var noLinkSpecified = function () {
    console.log("Missing argument -l or --link");
    process.exit();
};
var noTimeSpecified = function () {
    console.log("Missing argument -t or --time");
    process.exit();
};
program
    .option("-l, --link <link>", "link to webscrape")
    .option("-t, --time <time>", "how many minutes to record");
program.parse(process.argv);
var options = program.opts();
var checkIfUrlIsValid = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (options.time == undefined)
                    noTimeSpecified();
                if (!options.link) return [3 /*break*/, 7];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, puppeteer.launch({
                        headless: true,
                        args: ["--no-sandbox"]
                    })];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 3:
                page = _a.sent();
                return [4 /*yield*/, page.goto(options.link, { waitUntil: "load", timeout: 0 })];
            case 4:
                _a.sent();
                console.log("Link is valid");
                startRecording();
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                console.log("Link could not be resloved.");
                process.exit();
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                noLinkSpecified();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
var filename = randomstring.generate({
    length: 10,
    charset: "hex"
});
// const file = fs.createWriteStream(__dirname + `/videos/${filename}.mp4`);
// async function startRecording() {
//   const browser = await launch({
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//     defaultViewport: {
//       width: 1920,
//       height: 1080,
//     },
//   });
//   const page = await browser.newPage();
//   await page.goto(options.link);
//   await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
//   await page.keyboard.press("f");
//   try {
//     await Promise.all([
//       await page.click(
//         `#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div > div > div > div.Layout-sc-nxg1ff-0.krOuYh.player-overlay-background.player-overlay-background--darkness-0.content-overlay-gate > div > div.Layout-sc-nxg1ff-0.bzQnIQ.content-overlay-gate__allow-pointers > button`
//       ),
//     ]);
//     console.log("Stream is agerestricted");
//   } catch (err) {
//     console.log("Stream is not agerestricted");
//   }
//   const stream = await getStream(page, { audio: true, video: true });
//   console.log("recording");
//   stream.pipe(file);
//   setTimeout(async () => {
//     await stream.destroy();
//     file.close();
//     console.log("finished");
//     process.exit();
//   }, 15000 * options.time);
// }
var startRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
    var PuppeteerVideoRecorder, recorder, browser, page, _a, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                PuppeteerVideoRecorder = require("puppeteer-video-recorder");
                recorder = new PuppeteerVideoRecorder();
                return [4 /*yield*/, (0, puppeteer_stream_1.launch)({
                        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
                        defaultViewport: {
                            width: 1920,
                            height: 1080
                        }
                    })];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _c.sent();
                return [4 /*yield*/, page.goto(options.link)];
            case 3:
                _c.sent();
                return [4 /*yield*/, page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] })];
            case 4:
                _c.sent();
                return [4 /*yield*/, page.keyboard.press("f")];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                _c.trys.push([6, 9, , 10]);
                _b = (_a = Promise).all;
                return [4 /*yield*/, page.click("#root > div > div.Layout-sc-nxg1ff-0.ldZtqr > div.Layout-sc-nxg1ff-0.iLYUfX > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-588ddc-0.persistent-player > div > div.Layout-sc-nxg1ff-0.video-player > div > div > div > div > div.Layout-sc-nxg1ff-0.krOuYh.player-overlay-background.player-overlay-background--darkness-0.content-overlay-gate > div > div.Layout-sc-nxg1ff-0.bzQnIQ.content-overlay-gate__allow-pointers > button")];
            case 7: return [4 /*yield*/, _b.apply(_a, [[
                        _c.sent()
                    ]])];
            case 8:
                _c.sent();
                console.log("Stream is agerestricted");
                return [3 /*break*/, 10];
            case 9:
                err_1 = _c.sent();
                console.log("Stream is not agerestricted");
                return [3 /*break*/, 10];
            case 10: return [4 /*yield*/, recorder.init(page, "./videos/" + filename + ".mp4")];
            case 11:
                _c.sent();
                return [4 /*yield*/, recorder.start()];
            case 12:
                _c.sent();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
            case 13:
                _c.sent();
                return [4 /*yield*/, recorder.stop()];
            case 14:
                _c.sent();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 15:
                _c.sent();
                process.exit();
                return [2 /*return*/];
        }
    });
}); };
checkIfUrlIsValid();