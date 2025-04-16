function coinCombination(target) {
  const coins = [1, 2, 5, 10, 20, 50, 100, 200];
  const count = Array(target + 1).fill(0);
  count[0] = 1;
  for (let c = 0; c < coins.length; c++) {
    for (let i = coins[c]; i <= target; i++) {
      count[i] += count[i - coins[c]];
    }
  }
  return count[target];
}
console.log(coinCombination(200));
