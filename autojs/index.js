// launchApp('微信')
// sleep(2000)
// click(576,57,619,100)
// sleep(2000)
// className('android.widget.RelativeLayout').findOne().click()
// sleep(1000)
// setText('享家社区')
// sleep(1000)
// const reg = /mBoundsInScreen\"\:\{(.*?)\}/
// className('android.widget.TextView').find().forEach(item => {
//     if (item.text() === '享家社区小程序') {
//         const [bottom, left, right, top] = JSON.stringify(item).match(reg)[0].split(',').map(cItem => Number(cItem.replace(/[^0-9]/g, '')));
//         sleep(1000)
//         click(bottom, left, right, top);
//     }
// })
// sleep(1000)
// click(116,122,672,252)
// sleep(4000)
// const [bottom, left, right, top] = JSON.stringify(textContains("享家社区小程序来了").findOne()).match(reg)[0].split(',').map(cItem => Number(cItem.replace(/[^0-9]/g, '')));
// console.log(bottom, left, right, top)
// textContains("享家社区小程序来了").findOne().click()
