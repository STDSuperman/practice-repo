auto()
requestScreenCapture(true);
launchApp('微信')
const mine = images.read("./images/mine.png");
log(mine)
sleep(2000)
//截图并找图
const mineRegin = findImage(captureScreen(), mine, {
    region: [0, 50],
    threshold: 0.8
});
log(mineRegin)