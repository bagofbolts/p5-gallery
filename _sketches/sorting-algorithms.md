---
title: Sorting Algorithms
date: 2018-07-04
thumbnail: sorting-algorithms
dependencies:
    -   p5
    -   dom
scripts:
    -   ColorGrid
    -   RainbowGradient
    -   Sorter
    -   Sketch
    -   sorting-algorithms
---
To visualize the sorting iterations, I chose a color gradient, a rainbow. I obtained the left grid by running a shuffling algorithm.
Hitting the refresh button reshuffles only this reference grid.
<div class="row justify-content-center" id="group1">
    <div id="canvas1-1"></div>
    <div id="canvas1-2"></div>
</div>

Each of the following algorithms have the same space complexity. Sorting operations involving shifting a range of elements within the array are completed within one iteration.

<div class="row justify-content-center" id="group2">
    <div id="canvas2-1"></div>
    <div id="canvas2-2"></div>
    <div id="canvas2-3"></div>
    <div id="canvas2-4"></div>
    <div id="canvas2-5"></div>
</div>

The "race" is still fair since all algorithms run at 1 iteration per frame, with each iteration having only one comparison. This means that the running time of each algorithm
is directly proportional to the number of comparisons it had to make. Hence, they only differ by their time complexities.
