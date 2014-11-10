var spawn = require("child_process").spawn;
//composite ..\..\test\TodoMVC\capture\expect\0\1_.png ..\..\test\TodoMVC\capture\actual\0\1_.png -compose difference ..\..\test\TodoMVC\capture\diff\0\1_.png

//compare -metric AE -fuzz 5% bag_frame1.gif bag_frame1.jpg   compare_fuzz.gif
var child = spawn(".\ImageMagick-6.8.9-5\compare.exe", ["..\test\TodoMVC\capture\expect\0\1_.png ..\test\TodoMVC\capture\actual\0\1_.png test.png"]);
console.log("CHILD", child);
child.stdout.on("data", function (data) {
  console.log("spawnSTDOUT:", JSON.stringify(data))
});
child.stderr.on("data", function (data) {
  console.log("spawnSTDERR:", JSON.stringify(data))
});
child.on("exit", function (code) {
  console.log("spawnEXIT:", code)
});

var execFile = require("child_process").execFile;
execFile("dir", [], null, function (err, stdout, stderr) {
    console.log(err);
  console.log("execFileSTDOUT:", JSON.stringify(stdout))
  console.log("execFileSTDERR:", JSON.stringify(stderr))
});

var exec = require("child_process").exec;


//setTimeout(function () {
//  phantom.exit(0);
//}, 5000);