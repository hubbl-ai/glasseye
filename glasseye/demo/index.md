## A Linechart Typescript Demo

### A line chart

Similarly the line chart can be either created from a csv file (as long as it has columns with heading x and y) or from in line json. Here is an example.


<linechart>
 [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 15 },
            { x: 4, y: 25 },
            { x: 5, y: 30 },
            { x: 6, y: 35 }
  ]
</linechart>



### A pie chart


A pie created from inline json.
<piechart>
[
{ label: "Category A", value: 30 },
{ label: "Category B", value: 70 },
{ label: "Category C", value: 45 },
{ label: "Category D", value: 55 },
{ label: "Category E", value: 20 }
]
</piechart>


### A simple bar chart

A simple bar chart can be created using the barchart tags.


<barchart>
[
{"label":"Apples", "value":"33"},
{"label":"Pears", "value":"12"},
{"label":"Oranges", "value":"9"},
]
</barchart>