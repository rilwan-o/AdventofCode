import * as fs from 'fs';



const calories = fs.readFileSync("./public/puzzle.txt", 'utf-8');

console.log(calories);

console.log(findElfWithMostCalories(calories));

function findElfWithMostCalories(input: string): number {
  
    const lines = input.split('\n').map(line => line.trim());
  
    let currentElfCalories = 0; 
    let maxCalories = 0; 
  
    for (const line of lines) {
      if (line === '') {
        
        maxCalories = Math.max(maxCalories, currentElfCalories);
        currentElfCalories = 0; 
   
      } else {       
        currentElfCalories += parseInt(line);
      }
    }
  
    maxCalories = Math.max(maxCalories, currentElfCalories);
  
    return maxCalories;
  }


export {}