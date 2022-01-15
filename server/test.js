var http = require("http");

var express = require("express");

var smartmirror = express();

smartmirror.use(express.static(__dirname + "/public"));

http.createServer(smartmirror).listen(9091, function () {
  console.log("server on 9091...");
});

var exec_photo = require("child_process").exec;

var photo_path = __dirname + "/public/photo/" + Date.now() + ".jpg";

var cmd_photo = "raspistill -o " + photo_path;

exec_photo(cmd_photo, function (error, stdout, stderr) {
  console.log("Photo Saved : ", photo_path);

  require("./mailer").sendEmail(photo_path);
});

function exit() {
  process.exit();
}
