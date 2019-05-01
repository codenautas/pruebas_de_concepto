async function sleepAndReturn(ms, returned) {
    return new Promise((resolve, _reject) => {
        setInterval(function () {
            resolve(returned);
        }, ms);
    });
}
async function main() {
    sleepAndReturn(100, 'X');
    var x = await sleepAndReturn(100, 'z');
    var y = sleepAndReturn(300, 3);
    console.log(x, y);
}
main();
