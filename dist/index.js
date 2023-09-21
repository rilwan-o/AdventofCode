"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const calories = fs.readFileSync("./public/puzzle.txt", 'utf-8');
//console.log(calories);
//console.log(findElfWithMostCalories(calories));
//findTop3ElfWithMostCalories(calories);
function findElfWithMostCalories(input) {
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
        }
        else {
            currentElfCalories += parseInt(line);
        }
    }
    maxCalories = Math.max(maxCalories, currentElfCalories);
    console.log(index);
    return maxCalories;
}
function findTop3ElfWithMostCalories(input) {
    const lists = splitArrayOnSpace(calories);
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
function splitArrayOnSpace(input) {
    const inputArray = input.trim().split('\r\n').map(line => line.trim());
    console.log("inputArray", inputArray);
    const result = [];
    let currentArray = [];
    for (const num of inputArray) {
        if (num === '') {
            // Start a new sub-array when the value is 0
            if (currentArray.length > 0) {
                result.push(currentArray);
            }
            currentArray = [];
        }
        else {
            currentArray.push(num);
        }
    }
    // Push the last sub-array if it's not empty
    if (currentArray.length > 0) {
        result.push(currentArray);
    }
    return result;
}
function calculateScore(input) {
    const data = input.trim().split('\r\n').map(line => line.trim());
    const mapping = {
        'A': {
            type: 'rock',
        },
        'B': {
            type: 'paper',
        },
        'C': {
            type: 'scissors',
        },
        'X': {
            type: 'rock',
            value: 1,
        },
        'Y': {
            type: 'paper',
            value: 2,
        },
        'Z': {
            type: 'scissors',
            value: 3,
        },
    };
    let score = 0;
    data.forEach((line) => {
        const choices = line.split(' ');
        const opponent = mapping[choices[0]];
        const player = mapping[choices[1]];
        if (player) {
            score += player.value !== undefined ? player.value : 0;
            if (opponent && opponent.type === player.type) {
                score += 3;
            }
            else if (player.type === 'scissors' && (opponent === null || opponent === void 0 ? void 0 : opponent.type) === 'paper') {
                score += 6;
            }
            else if (player.type === 'rock' && (opponent === null || opponent === void 0 ? void 0 : opponent.type) === 'scissors') {
                score += 6;
            }
            else if (player.type === 'paper' && (opponent === null || opponent === void 0 ? void 0 : opponent.type) === 'rock') {
                score += 6;
            }
        }
    });
    return score;
}
const lines = fs.readFileSync("./public/rockpaperscissors.txt", 'utf-8');
const score = calculateScore(lines);
console.log(score);
function calculateScore2(input) {
    const data = input.trim().split('\r\n').map(line => line.trim());
    const mapping = {
        'A': {
            type: 'rock',
            desired_outcomes: {
                'X': 'scissors',
                'Y': 'rock',
                'Z': 'paper',
            },
        },
        'B': {
            type: 'paper',
            desired_outcomes: {
                'X': 'rock',
                'Y': 'paper',
                'Z': 'scissors',
            },
        },
        'C': {
            type: 'scissors',
            desired_outcomes: {
                'X': 'paper',
                'Y': 'scissors',
                'Z': 'rock',
            },
        },
    };
    const playerChoiceScores = {
        rock: 1,
        paper: 2,
        scissors: 3,
    };
    let score = 0;
    for (const line of data) {
        const choices = line.split(' ');
        const opponent = mapping[choices[0]];
        const desiredOutcome = choices[1];
        if (opponent) {
            const player = {
                type: opponent.desired_outcomes[desiredOutcome],
            };
            if (player && playerChoiceScores[player.type]) {
                score += playerChoiceScores[player.type];
                if (opponent.type === player.type) {
                    score += 3;
                }
                else if (player.type === 'scissors' && opponent.type === 'paper') {
                    score += 6;
                }
                else if (player.type === 'rock' && opponent.type === 'scissors') {
                    score += 6;
                }
                else if (player.type === 'paper' && opponent.type === 'rock') {
                    score += 6;
                }
            }
        }
    }
    return score;
}
const score2 = calculateScore2(lines);
console.log(score2);
