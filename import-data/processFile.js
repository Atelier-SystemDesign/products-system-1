const { createReadStream } = require('fs');
const readline = require('readline');

function processLine(inputString) {
  const line = [];
  let currentElement = '';
  let insideQuote = false;

  for (let i = 0; i < inputString.length; i += 1) {
    const char = inputString[i];

    if (char === ',' && !insideQuote) {
      line.push(currentElement.trim());
      currentElement = '';
    } else if (char === '"' && inputString[i + 1] !== '"') {
      insideQuote = !insideQuote;
    } else {
      currentElement += char;
    }
  }

  if (currentElement.trim() !== '') {
    line.push(currentElement.trim());
  }

  return line.map((element) => (element === 'null' ? '' : element));
}

const fileToDb = async (filePath, perLineCb) => {
  try {
    // Create read stream with buffer
    const rl = readline.createInterface({
      input: createReadStream(filePath, { encoding: 'utf8' }),
      crlfDelay: Infinity,
    });

    let isFirstLine = true;

    // For each line in stream
    for await (const line of rl) {
      console.log(line);

      // Skip the very first line
      if (isFirstLine) {
        isFirstLine = false;
        continue;
      }

      if (line.length > 0) {
        // Check the array of each line into the database (via the perLineCb)
        let processed = processLine(line);
        await perLineCb(...processed);
      }
    }
  } catch (err) {
    console.error(err.stack);
  }
};

module.exports = fileToDb;
