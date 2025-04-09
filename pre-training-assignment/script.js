const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("hey there! welcome to this little app");

rl.question('what should i call you? ', (name) => {
  console.log(`nice to meet you, ${name}!`);
  rl.close();
});