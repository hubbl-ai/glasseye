## A Linechart Typescript Demo

### A line chart

Similarly the line chart can be either created from a csv file (as long as it has columns with heading x and y) or from in line json. Here is an example.


<linechart
data=" [
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 15 },
            { x: 4, y: 25 },
            { x: 5, y: 30 },
            { x: 6, y: 35 }
  ]"
  size="{width:600,height:600}"
  colors="['red','green']"
  options="{curved:true}"
>
</linechart>