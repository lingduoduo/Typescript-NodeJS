var http = require('http');
var dt = require("./myfirstmodule")

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   // res.end('Hello World!');
//   // res.write("The date and time are currently: " + dt.myDateTime() + req.url);

//   var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.write(req.url);
//   res.end(txt);
// }).listen(8080);


// File System
var fs = require('fs');
// read files
// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) {
//   fs.readFile('demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080);


// create files
// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// Create a new, empty file using the open() method:
// fs.open('mynewfile2.txt', 'w', function (err, file) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// Create a new file using the writeFile() method:
// fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });


// Append "This is my text." to the end of the file "mynewfile1.txt":
// fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
//   if (err) throw err;
//   console.log('Updated!');
// });


// Replace the content of the file "mynewfile3.txt":
// fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
//   if (err) throw err;
//   console.log('Replaced!');
// });


// Delete "mynewfile2.txt":
// fs.unlink('mynewfile2.txt', function (err) {
//   if (err) throw err;
//   console.log('File deleted!');
// });

// Rename "mynewfile1.txt" to "myrenamedfile.txt":
// fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
//   if (err) throw err;
//   console.log('File Renamed!');
// });


// URL
var url = require('url');
// var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
// var q = url.parse(adr, true);

// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'

// var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
// console.log(qdata.month); //returns 'february'


// var http = require('http');
// var url = require('url');
// var fs = require('fs');

// http.createServer(function (req, res) {
//   var q = url.parse(req.url, true);
//   var filename = "." + q.pathname;
//   fs.readFile(filename, function(err, data) {
//     if (err) {
//       res.writeHead(404, {'Content-Type': 'text/html'});
//       return res.end("404 Not Found");
//     } 
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }).listen(8080);


  // NPM
  var uc = require('upper-case');
  // http.createServer(function (req, res) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write(uc.upperCase("Hello World!"));
  //   res.end();
  // }).listen(8080);

  // Events
  // var fs = require('fs');
  // var rs = fs.createReadStream('./myrenamedfile.txt');
  // rs.on('open', function () {
  //   console.log('The file is open');
  // });
  var events = require('events');
  // var eventEmitter = new events.EventEmitter();
  // //Create an event handler:
  // var myEventHandler = function () {
  //   console.log('I hear a scream!');
  // }
  // //Assign the event handler to an event:
  // eventEmitter.on('scream', myEventHandler);
  // //Fire the 'scream' event:
  // eventEmitter.emit('scream');

  // Upload Files
  var formidable = require('formidable');
  // Create a Node.js file that writes an HTML form, with an upload field:
  // http.createServer(function (req, res) {
  //   res.writeHead(200, {'Content-Type': 'text/html'});
  //   res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  //   res.write('<input type="file" name="filetoupload"><br>');
  //   res.write('<input type="submit">');
  //   res.write('</form>');
  //   return res.end();
  // }).listen(8080);

  // Parse the Uploaded File
  // var http = require('http');
  // var formidable = require('formidable');
  // http.createServer(function (req, res) {
  //   if (req.url == '/fileupload') {
  //     var form = new formidable.IncomingForm();
  //     form.parse(req, function (err, fields, files) {
  //       res.write('File uploaded');
  //       res.end();
  //     });
  //   } else {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  //     res.write('<input type="file" name="filetoupload"><br>');
  //     res.write('<input type="submit">');
  //     res.write('</form>');
  //     return res.end();
  //   }
  // }).listen(8080);


  // Save the File
  // var http = require('http');
  // var formidable = require('formidable');
  // var fs = require('fs');
  // http.createServer(function (req, res) {
  //   if (req.url == '/fileupload') {
  //     var form = new formidable.IncomingForm();
  //     form.parse(req, function (err, fields, files) {
  //       var oldpath = files.filetoupload.path;
  //       var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
  //       fs.rename(oldpath, newpath, function (err) {
  //         if (err) throw err;
  //         res.write('File uploaded and moved!');
  //         res.end();
  //       });
  //  });
  //   } else {
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  //     res.write('<input type="file" name="filetoupload"><br>');
  //     res.write('<input type="submit">');
  //     res.write('</form>');
  //     return res.end();
  //   }
  // }).listen(8080); 


  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'linghypshen@gmail.com',
      pass: '******'
    }
  });

  var mailOptions = {
    from: 'linghypshen@gmail.com',
    to: 'lhuang@themeetgroup.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  }

  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  }




