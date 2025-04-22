import readline from 'readline';

// Define interfaces
interface IndexedItem {
  value: number;
  originalIndex: number;
}

function bs(arr: number[], tar: number): number {
  let left: number = 0;
  let right: number = arr.length - 1;
  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    if (arr[mid] === tar) {
      return mid;
    } else if (arr[mid] < tar) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // Return -1 if target is not found
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main(): Promise<void> {
  try {
    // input from user
    const arrayInput: string = await askQuestion(
      'Enter numbers separated by commas (e.g. 1,2,3,4,5): '
    );
    const userArray: number[] = arrayInput.split(',').map((num) => parseInt(num.trim()));

    // target value from user
    const targetInput: string = await askQuestion('Enter the number to search for: ');
    const target: number = parseInt(targetInput);

    // objects to track original positions
    const indexedArray: IndexedItem[] = userArray.map((value, index) => ({
      value,
      originalIndex: index,
    }));

    // sort by value
    indexedArray.sort((a, b) => a.value - b.value);

    //the values for binary search
    const sortedValues: number[] = indexedArray.map((item) => item.value);
    console.log('Sorted Array:', sortedValues);

    const result: number = bs(sortedValues, target);

    if (result !== -1) {
      const originalPosition: number = indexedArray[result].originalIndex;
      console.log(`Found ${target} at position ${result} in sorted array`);
      console.log(`Originally at position ${originalPosition} in input array`);
    } else {
      console.log(`${target} was not found in the array`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
}

main();
