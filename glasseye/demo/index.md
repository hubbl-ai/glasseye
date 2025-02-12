## A Linechart Typescript Demo

### A line chart

Similarly the line chart can be either created from a csv file (as long as it has columns with heading x and y) or from in line json. Here is an example.


<linechart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  size='{"width":600,"height":600}'
  colors='["#FF6700","green"]'
  options='{"curved":0}'
>
</linechart>



### A simplot chart

Similarly the line chart can be either created from a csv file (as long as it has columns with heading x and y) or from in line json. Here is an example.


<linechart
data='[
  { "x": 1, "y": 10 }, 
  { "x": 2, "y": 20 },
  { "x": 3, "y": 15 },
  { "x": 4, "y": 25 },
  { "x": 5, "y": 30 },
  { "x": 6, "y": 35 }
  ]'
  size='{"width":600,"height":600}'
  colors='["#004E98","green"]'
  options='{"curved":1}'
>
</linechart>


### A line chart FROM .CSV


<linechart
 file='{"path":"data/xy.csv","format":"csv"}'
  size='{"width":800,"height":800}'
  colors='["red","green"]'
  options='{"curved":0}'
>
</linechart>




### A line chart FROM .TSV


<linechart
 file='{"path":"data/xy.tsv","format":"tsv"}'
  size='{"width":400,"height":400}'
  colors='["yellow","green"]'
  options='{"curved":1}'
>
</linechart>





### A line chart FROM .json


<linechart
 file='{"path":"data/xy.json"}'
  size='{"width":400,"height":400}'
  colors='["blue","green"]'
  options='{"curved":1}'
>
</linechart>



### A line chart FROM .hsv


<linechart
 file='{"path":"data/xy.hsv"}'
  size='{"width":400,"height":400}'
  colors='["red","green"]'
  options='{"curved":1}'
>
</linechart>
