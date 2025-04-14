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
        switch (choice) {
            case '1':
                console.log(`today's date is: ${new Date().toLocaleDateString()}`);
                rl.close();
                break;
            case '2':
                console.log("here's a quote for you: 'the only way to do great work is to love what you do.' – steve jobs");
                rl.close();
                break;
            case '3':
                console.log("see you later!");
                rl.close();
                break;
            default:
                console.log("hmm, that wasn't one of the options. try again next time!");
                rl.close();
                break;
        }
    });
});
export {};
