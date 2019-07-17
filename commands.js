const fs = require('fs');

//write out data
function done(output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
	//parses the user input to understand which command was typed
	const userInputArray = userInput.split(' ');
	const command = userInputArray[0];
	switch (command) {
	case 'echo':
		//we will add the functionality of echo next within the object commandLibrary
		commandLibrary.echo(userInputArray.slice(1).join(' '));
		break;
	case 'cat':
		commandLibrary.cat(userInputArray.slice(1));
		break;
	case 'head':
		commandLibrary.head(userInputArray.slice(1));
		break;
	case 'tail':
		commandLibrary.tail(userInputArray.slice(1));
		break;
	default:
      commandLibrary.errorHandler(userInputArray[0]);
	}
}

//where we will store the logic of our commands
const commandLibrary = {
  'echo': function(userInput) {
    done(userInput);
  },
  cat: function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  'head': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var array = data.toString().split('\n');
      let lines = [];
      for (let i = 0; i < 5; i++) {
        lines.push(array[i]);
      }
      data = lines.join('\n');
      done(data);
    });
  },
  'tail': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var array = data.toString().split('\n');
      let lines = [];
      for (let i = array.length - 6; i < array.length; i++) {
        lines.push(array[i]);
      }
      data = lines.join('\n');
      done(data);
    });
  },
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;