

const rows = 3
const columns = 5
const total = rows * columns;

function makeArray(columns, rows) {
    let newArray = []
    for (let i = 0; i < rows; i++) {
        newArray[i] = [];
        for (let j = 0; j < columns; j++) {
            newArray[i][j] = [];
          }
    }
    return newArray;
}
const array = makeArray(columns, rows)
console.log(array)



// for (let i = 0; i < total; i++) {
//     // const element = array[index];

//     if (i < rows){ // first rows
//         array[0][i] = i + ' r0'
//     } else if (i >= rows && i < (rows * 2)) { // rows 2
//         array[1][i - rows] = i + ' r1'
//     } else if (i >= rows * 2 && i < (rows * 3)) { // rows 3
//         array[2][i - rows * 2] = i + ' r2'
//     } else if (i >= rows * 3 && i < (rows * 4)) { // rows 4
//         array[3][i - rows * 3] = i + ' r3'
//     } else if (i >= rows * 4 && i < (rows * 5)) { // rows 5
//         array[4][i - rows * 4] = i + ' r4'
//     } else if (i >= rows * 5 && i < (rows * 6)) { // rows 5
//         array[5][i - rows * 5] = i + ' r5'
//     }
    
// }
// console.log(array);


// let testArray = 
//     [
//     [1,2],
//     [[3],[4]],
//     [{5:'n'},[6],[7]]
//     ]
// testArray[3] = [1, 0]
// // console.log(testArray[3][1])

// const array3 = [];
// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 5; j++) {
//     array3.push([i, j]);
//   }
// }
// console.log(array3)