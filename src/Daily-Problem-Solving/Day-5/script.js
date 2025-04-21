import readline from 'readline';

function bs(arr, tar) {
    let left = 0;
    let right = arr.length - 1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        if(arr[mid] === tar){
            return mid;
        }else if(arr[mid] < tar){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return -1; // Return -1 if target is not found
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and get user input
function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

async function main() {
    try {
        // Get array input from user
        const arrayInput = await askQuestion("Enter numbers separated by commas (e.g. 1,2,3,4,5): ");
        const userArray = arrayInput.split(',').map(num => parseInt(num.trim()));

        // Get target value from user
        const targetInput = await askQuestion("Enter the number to search for: ");
        const target = parseInt(targetInput);

        // Perform binary search
        userArray.sort((a,b)=> a-b); // Sort the array before searching 
        console.log("Sorted Array:", userArray); // Display the sorted array
       const result = bs(userArray, target);

        // Display the result
        if (result !== -1) {
            console.log(`Found ${target} at position ${result}`);
        } else {
            console.log(`${target} was not found in the array`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        rl.close();
    }
}

main();
