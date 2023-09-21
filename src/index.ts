import * as fs from 'fs';



const calories = fs.readFileSync("./public/puzzle.txt", 'utf-8');

//console.log(calories);

//console.log(findElfWithMostCalories(calories));
findTop3ElfWithMostCalories(calories);

function findElfWithMostCalories(input: string): number {
  
    const lines = input.trim().split('\n').map(line => line.trim());
  // let linesArrayint: number[][] =[];

    let currentElfCalories = 0; 
    let maxCalories = 0; 
    let index = 0;
    for (const line of lines) {
      if (line === '') {
        index++;
        maxCalories = Math.max(maxCalories, currentElfCalories);
        currentElfCalories = 0; 
   
      } else {     
        currentElfCalories += parseInt(line);
      }

    }
  
    maxCalories = Math.max(maxCalories, currentElfCalories);
    console.log(index)
    return maxCalories;
  }

    function findTop3ElfWithMostCalories(input: string) {

        const lists: String[][] = splitArrayOnSpace(calories);

        // Calculate the sum of each list and store it along with the index
        const listSums = lists.map((list, index) => ({
        index,
        sum: list.reduce((acc, num) => acc + Number(num), 0),
        }));

        // Sort the list sums in descending order
        listSums.sort((a, b) => b.sum - a.sum);

        // Get the top 3 lists
        const top3Lists = listSums.slice(0, 3);

        // Print the results
        console.log("Top 3 Lists with their Sum Totals (in descending order):");
        let tsum = 0;
        for (const { index, sum } of top3Lists) {
        console.log(`List ${index + 1}: Sum = ${sum}`);
         tsum = tsum + sum;
        }

        console.log(`Total of 3 is ${tsum}`);
    }



function splitArrayOnSpace(input: String): String[][] {
    const inputArray = input.trim().split('\r\n').map(line => line.trim());
    console.log("inputArray", inputArray);
  const result: String[][] = [];
  let currentArray: String[] = [];

  for (const num of inputArray) {
    if (num === '') {
      // Start a new sub-array when the value is 0
      if (currentArray.length > 0) {
        result.push(currentArray);
      }
      currentArray = [];
    } else {
      currentArray.push(num);
    }
  }

  // Push the last sub-array if it's not empty
  if (currentArray.length > 0) {
    result.push(currentArray);
  }

  return result;
}




    

export {}