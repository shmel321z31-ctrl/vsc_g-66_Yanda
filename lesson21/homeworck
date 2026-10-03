// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

// npm init

// npm install axios



//     https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true


// "type": "commonjs",  ->   "type": "module",

// Example of commonjs module export and import
// const {validateEcmascriptText} = require("./service/validate.js");
// module.exports = {validateEcmascriptText};


// =====================================63-23=

// https://jsonplaceholder.typicode.com/posts

//==========================================

// https://aistudio.google.com/api-keys

//  

// npm install @google/genai
//===================================================


/*
HW_20_TEXT
1.Создайте массив на 10 строк.

2.Создайте функцию comparator(a,b), которая  принимает 2 строки  и 
возвращает 1 - если первое строка длиннее, -1 если вторая строка длиннее, 
0 если равны.  
Используйте синтаксис function declaration, вызовите эту фкнкцию и 
напечатайте результат.
Напишите эту эе функцию используя Function Expression и Arrow Function  
3.Напишите функцию, которая принимает массив и функуию-компаратор, 
и возвращает самое большое значение в массиве. Вызовите эту функцию, передав 
ей массив строк, полученный в первой задаче и функцию, написанную во второй задаче.
*/

//#1
const massive =['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'quisque', 'faucibus']

//#2
function comparator(a,b){
    if (a.length>b.length){
        return 1;
    }
     else if (a.length<b.length){
        return -1;
    }
    else {
        return 0;
    }
} 

const comparator2 = function(a,b){
 if (a.length>b.length){
        return 1;
    }
     else if (a.length<b.length){
        return -1;
    }
    else {
        return 0;
    }
}

const comparator3 =(a,b) =>{
     if (a.length>b.length){
        return 1;
    }
     else if (a.length<b.length){
        return -1;
    }
    else {
        return 0;
    }
}

console.log(comparator(massive[3],massive[0]));
console.log(comparator2(massive[0],massive[3]));
console.log(comparator3(massive[0],massive[1]));

//#3

function filter(massive,comparator){
    let big = massive[0];
    for (let i = 0; i < massive.length; i++) {
        if (comparator(massive[i],big)===1){
            big=massive[i]
        }
    }
return big;
}

// const filter2 = function(massive,comparator2){
//     let big = massive[0];
//     for (let i = 0; i < massive.length; i++) {
//         if (comparator2(massive[i],big)===1){
//             big=massive[i]
//         }
//     }
// return big;
// }

// const filter3 =(massive,comparator3)=>{
//     let big = massive[0];
//     for (let i = 0; i < massive.length; i++) {
//         if (comparator3(massive[i],big)===1){
//             big=massive[i]
//         }
//     }
// return big;
// }

console.log(filter(massive, comparator));
console.log(filter(massive, comparator2));
console.log(filter(massive, comparator3));