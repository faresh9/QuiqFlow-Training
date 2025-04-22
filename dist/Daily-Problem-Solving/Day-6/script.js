import readline from 'readline';
function balancedParens(str) {
    const stack = [];
    const bracketPairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        // If it's an opening bracket
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
        }
        // If it's a closing bracket
        else if (char === ')' || char === ']' || char === '}') {
            //if the stack is empty or the top doesn't match
            if (stack.length === 0 || stack[stack.length - 1] !== bracketPairs[char]) {
                return false;
            }
            // the matching opening bracket
            stack.pop();
        }
    }
    //  all brackets were closed
    return stack.length === 0;
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askQuestion(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}
async function main() {
    try {
        const input = await askQuestion('Enter a string to check for balanced parentheses: ');
        const result = balancedParens(input);
        if (result) {
            console.log('The string has balanced parentheses.');
        }
        else {
            console.log('The string does NOT have balanced parentheses.');
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
    finally {
        rl.close();
    }
}
main();
//# sourceMappingURL=script.js.map