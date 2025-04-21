function bs(arr, tar){
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
}
console.log(bs([1,2,3,4,5,6,7,8,9], 5));
console.log(bs([1,2,3,4,5,6,7,8,9], 10));
