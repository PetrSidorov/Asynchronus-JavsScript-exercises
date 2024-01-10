function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text",
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************
// The old-n-busted callback way
let files = ["file1", "file2", "file3"];
let storage = {};
function getFile(file) {
  fakeAjax(file, function (text) {
    for (let oneFile of files) {
      if (oneFile == file) {
        console.log(text);
        files.shift();
        break;
      } else {
        storage[file] = text;
        break;
      }
    }
    function getTheRest() {
      console.log(Object.keys(storage).length);
      console.log(files.length);
      if (Object.keys(storage).length > 0 && files.length > 0) {
        console.log(storage);
        for (let i = 0; i < files.length; i++) {
          if (files[i] == storage[file]) {
            console.log(files[i]);
            console.log(storage[file]);
            console.log(storage[file]);
            files.shift();
            break;
          } else {
            // getTheRest(i++);
          }
        }
        // console.log(storage);
        // fakeAjax(storage[file], console.log);
        // fakeAjax(storage);
      }
    }
    getTheRest();
  });
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
