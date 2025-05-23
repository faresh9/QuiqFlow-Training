import readline from 'readline';
function bs(arr, tar) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === tar) {
            return mid;
        }
        else if (arr[mid] < tar) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1; // Return -1 if target is not found
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
        // input from user
        const arrayInput = await askQuestion('Enter numbers separated by commas (e.g. 1,2,3,4,5): ');
        const userArray = arrayInput.split(',').map((num) => parseInt(num.trim()));
        // target value from user
        const targetInput = await askQuestion('Enter the number to search for: ');
        const target = parseInt(targetInput);
        // objects to track original positions
        const indexedArray = userArray.map((value, index) => ({
            value,
            originalIndex: index,
        }));
        // sort by value
        indexedArray.sort((a, b) => a.value - b.value);
        //the values for binary search
        const sortedValues = indexedArray.map((item) => item.value);
        console.log('Sorted Array:', sortedValues);
        const result = bs(sortedValues, target);
        if (result !== -1) {
            const originalPosition = indexedArray[result].originalIndex;
            console.log(`Found ${target} at position ${result} in sorted array`);
            console.log(`Originally at position ${originalPosition} in input array`);
        }
        else {
            console.log(`${target} was not found in the array`);
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