const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("hey there! welcome to this little app");

rl.question('what should i call you? ', (name) => {
  console.log(`nice to meet you, ${name}!`);

  const menu = `
  what would you like to do?
  1. see today's date
  2. get a motivational quote
  3. exit
  `;

  rl.question(menu, (choice) => {
    console.log(`you selected option ${choice}, but functionality coming soon!`);
    rl.close();
  });
});