function sortaSum(a, b){
	let sum = a + b;
  	if (sum >= 10 && sum <= 19) {
      return 20;
    }
    else {
      return sum;
    }
}

// Alternate solution

// function sortaSum(a, b){
// 	if (a + b < 10 || a + b > 19) {
//       return a + b;
//     }
//     else {
//       return 20;
//     }
// }
