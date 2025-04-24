import readline from 'readline';
//Time complexity: O(n! * n) 😫😫😓
function allAnagrams(str) {
    if (str.length === 1) {
        return [str];
    }
    const result = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const rest = str.slice(0, i) + str.slice(i + 1);
        const perms = allAnagrams(rest);
        for (const anagram of perms) {
            result.push(char + anagram);
        }
    }
    return result;
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
        const input = await askQuestion('Enter a string to generate anagrams: ');
        if (!input || input.trim().length === 0) {
            console.log('Please provide a non-empty string.');
            return;
        }
        console.log(`Generating anagrams for '${input}'...`);
        const result = allAnagrams(input);
        console.log(`\nFound ${result.length} anagrams:`);
        console.log(result.join(', '));
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