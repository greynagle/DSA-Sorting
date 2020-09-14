let array = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40];

function mergeSort(array, i) {
    if (array.length <= 1) {
        console.log("");
        return array;
    }

    console.log(`splitting step ${i}`, array);

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left, i + 1);
    right = mergeSort(right, i + 1);
    return merge(left, right, array);
}

function merge(left, right, array) {
    console.log("merge", array);
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
            console.log("while left", array);
        } else {
            array[outputIndex++] = right[rightIndex++];
            console.log("while right", array);
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
        console.log("for left", array);
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
        console.log("for right", array);
    }
    console.log(array);
    return array;
}

mergeSort([5, 1, 7, 9, 2, 0, 12, 8], 0);

// the list after calling mergeSort 3 times is [21,1,26,45]
// the list after calling 16 times is [16,49,39,27,43,34,46,40],
// representing finally getting to the right half of the
// original split

// the first two lists to be merged are [21,1] and [26,45] representing
// the two halves of the list after 3 calls of mergeSort, or else 1 and 21
// if we're considering individual values to be lists
// the two lists merged seventh would be 43 and 34 by the later rules above

// regarding the first quicksort question, we know that everything to the left of
// the pivot's final location has to be less than the pivot. because 14, 17,
// and 24 are all in order and greater than everything to the left of them,
// any of those values could be the pivot value.

// for the second understanding quicksort question, for last pivot steps would be as follows:
// [14ji, 17, 13, 15, 19, 10, 3, 16, 9, *12*] (* * show pivot, ) i=0, j=0
// [14j, 17i, 13, 15, 19, 10, 3, 16, 9, *12*]
// [14j, 17, 13i, 15, 19, 10, 3, 16, 9, *12*]
// [14j, 17, 13, 15i, 19, 10, 3, 16, 9, *12*]
// [14j, 17, 13, 15, 19i, 10, 3, 16, 9, *12*]
// [14j, 17, 13, 15, 19, 10i, 3, 16, 9, *12*]
// [10, 17j, 13, 15, 19, 14, 3i, 16, 9, *12*]
// [10, 3, 13j, 15, 19, 14, 17, 16i, 9, *12*]
// [10, 3, 13j, 15, 19, 14, 17, 16, 9i, *12*]
// [10, 3, 9, 15j, 19, 14, 17, 16, 13, *12*i]
// [10, 3, 9, ^12, 15, 19, 14, 17, 16, 13] (first partition complete, ^ marks final place)
// [10ji, 3, *9*, 12, 15, 19, 14, 17, 16, 13]
// [10j, 3i, *9*, 12, 15, 19, 14, 17, 16, 13]
// [3, 10ji, *9*, 12, 15, 19, 14, 17, 16, 13]
// [3, 10j, *9*i, 12, 15, 19, 14, 17, 16, 13]
// [^3, ^9, ^10, ^12, 15, 19, 14, 17, 16, 13] (second partition complete, ^ marks final place)

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }

    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
}

function part(array, start, end) {
    if (array.length === 1) {
        return array;
    }

    // takes a value from the middle, moves it to the end
    // internet says so for math reasons if it's already sorted
    const midPick = Math.floor((start + end) / 2);
    const pivot = array[midPick];
    swap(array, end - 1, midPick);

    let i = start;
    let j = end - 1;

    // advance left to right until encountering a value greater than pivot
    while (i < end) {
        if (array[i] > pivot) {
            break;
        }
        i++;
    }

    // advance right to left until crossing left or value less than pivot
    while (j - i >= 0) {
        if (array[j] < pivot) {
            break;
        }
        j--;
    }

    if (j < i) {
        swap(array, pivot, i);
    }

    return j;
}

qSort([
    89,
    30,
    25,
    32,
    72,
    70,
    51,
    42,
    25,
    24,
    53,
    55,
    78,
    50,
    13,
    40,
    48,
    32,
    26,
    2,
    14,
    33,
    45,
    72,
    56,
    44,
    21,
    88,
    27,
    68,
    15,
    62,
    93,
    98,
    73,
    28,
    16,
    46,
    87,
    28,
    65,
    38,
    67,
    16,
    85,
    63,
    23,
    69,
    64,
    91,
    9,
    70,
    81,
    27,
    97,
    82,
    6,
    88,
    3,
    7,
    46,
    13,
    11,
    64,
    76,
    31,
    26,
    38,
    28,
    13,
    17,
    69,
    90,
    1,
    6,
    7,
    64,
    43,
    9,
    73,
    80,
    98,
    46,
    27,
    22,
    87,
    49,
    83,
    6,
    39,
    42,
    51,
    54,
    84,
    34,
    53,
    78,
    40,
    14,
    5,
]);
