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
  curved='0'
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
  curved='1'
>
</linechart>


### A line chart FROM .CSV


<linechart
 file='{"path":"data/xy.csv","format":"csv"}'
  size='{"width":800,"height":800}'
  colors='["red","green"]'
  curved='0'
>
</linechart>



### A simplot chart FROM .TSV


<linechart
 file='{"path":"data/xy.tsv","format":"tsv"}'
  size='{"width":400,"height":400}'
  colors='["yellow","green"]'
  curved='1'
>
</linechart>





### A line chart FROM .json


<linechart
 file='{"path":"data/xy.json"}'
  size='{"width":400,"height":400}'
  colors='["blue","green"]'
  curved='0'
>
</linechart>



### A line chart FROM .hsv


<linechart
 file='{"path":"data/xy.hsv"}'
  size='{"width":400,"height":400}'
  colors='["red","green"]'
  curved='1'
>
</linechart>


### A Bar chart



<barchart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='["#FF6700","green"]'
>
</barchart>




### A Pie chart


<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='["#FF6700","green"]'
>
</piechart>





### A Donut chart


<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='["#FF6700","green"]'
  donut = '1'
>
</piechart>





### A Sankey


<skey
data='{
  nodes: [
    { name: "Source A" },
    { name: "Source B" },
    { name: "Destination X" },
    { name: "Destination Y" }
  ],
  links: [
    { source: 0, target: 2, value: 10 },
    { source: 1, target: 2, value: 5 },
    { source: 1, target: 3, value: 15 }
  ]
}'
  size='{"width":500,"height":500}'
  colors='["#FF6700","green"]'
>
</skey>