// script.js

// Helper function to create a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let array = [];

// Function to generate a new array
function resetArray() {
    array = [...Array(30).keys()].map(() => Math.floor(Math.random() * 100));
    displayArray();
}

// Display the array in the array container
function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

// Asynchronous Bubble Sort with animation
async function bubbleSort(arr, delay = 1000) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                // Update the display
                displayArray();
                // Wait for a bit before moving on to the next iteration
                await sleep(delay);
            }
        }
    }
}

// Asynchronous Selection Sort with animation
async function selectionSort(arr, delay = 1000) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            // Swap elements
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
            // Update the display
            displayArray();
            // Wait for a bit before moving on to the next iteration
            await sleep(delay);
        }
    }
}

// Asynchronous Quick Sort with animation
async function quickSort(arr, delay = 1000, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end, delay);
    await Promise.all([
        quickSort(arr, delay, start, index - 1),
        quickSort(arr, delay, index + 1, end)
    ]);
}

async function partition(arr, start, end, delay) {
    let pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Swap elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
            // Update the display
            displayArray();
            // Wait for a bit before moving on to the next iteration
            await sleep(delay);
        }
    }
    // Swap the pivot element with the element at the pivot index
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    // Update the display
    displayArray();
    await sleep(delay);
    return pivotIndex;
}

// Functions to start sorting
function startBubbleSort() {
    bubbleSort([...array]);
}

function startSelectionSort() {
    selectionSort([...array]);
}

function startQuickSort() {
    quickSort([...array]);
}

// Initialize array on load
window.onload = resetArray;