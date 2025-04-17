import readline from 'readline';
// time complexity: O(n^2)
// if array is already sorted, time complexity is O(n)

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // swap 
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter numbers separated by spaces: ', (input) => {

    const numbers = input.trim().split(' ').map(num => parseInt(num, 10));
    
    if (numbers.some(isNaN)) {
        console.log('Invalid input. Please enter valid numbers.');
    } else {
        console.log('unsorted array:', numbers);
        const sortedArray = bubbleSort(numbers);
        console.log('sorted array:', sortedArray);
    }
    
    rl.close();
});



