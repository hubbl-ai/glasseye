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
  colors='["#FF6700","#004E98"]'
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
  colors='["#004E98","#008000"]'
  curved='1'
>
</linechart>


### A line chart FROM .CSV


<linechart
 file='{"path":"data/xy.csv","format":"csv"}'
  size='{"width":800,"height":800}'
  colors='["#FF0000","#008000"]'
  curved='0'
>
</linechart>



### A simplot chart FROM .TSV


<linechart
 file='{"path":"data/xy.tsv","format":"tsv"}'
  size='{"width":400,"height":400}'
  colors='["#FFFF00","#008000"]'
  curved='1'
>
</linechart>





### A line chart FROM .json


<linechart
 file='{"path":"data/xy.json"}'
  size='{"width":400,"height":400}'
  colors='["#FFFF00","#008000"]'
  curved='0'
>
</linechart>



### A line chart FROM .hsv


<linechart
 file='{"path":"data/xy.hsv"}'
  size='{"width":400,"height":400}'
  colors='["#FF0000","#008000"]'
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
  colors='["#FF6700","#008000"]'
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
  colors='["#FF6700","#004E98"]'
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
  colors='["#FF6700","#004E98"]'
  donut = '1'
>
</piechart>





### A Sankey


<skey
data='{
  "nodes": [
    { "name": "Source A" },
    { "name": "Source B" },
    { "name": "Destination X" },
    { "name": "Destination Y" }
  ],
  "links": [
    { "source": 0, "target": 2, "value": 10 },
    { "source": 1, "target": 2, "value": 5 },
    { "source": 1, "target": 3, "value": 15 }
  ]
}'
  size='{"width":500,"height":500}'
  colors='["#FFFF00","#FF0000"]'
  n_colors='10'
  desat='1'
  
>
</skey>





### A Donut chart using Seaborn Pallette


<piechart
data='[
  { "label": "Apples", "value": 10 },
  { "label": "Bananas", "value": 20 },
  { "label": "Cherries", "value": 15 },
  { "label": "Grapes", "value": 25 }
]'
  size='{"width":500,"height":500}'
  colors='deep'
  n_colors='5'
  desat='0.9'
  donut = '1'
>
</piechart>




### A gantt chart using Seaborn Pallette


<gantt
data='[
  { "task": "Planning", "start": "2024-03-01", "end": "2024-03-05" },
  { "task": "Design", "start": "2024-03-06", "end": "2024-03-12" },
  { "task": "Development", "start": "2024-03-13", "end": "2024-03-25" },
  { "task": "Testing", "start": "2024-03-26", "end": "2024-03-30" },
  { "task": "Deployment", "start": "2024-03-31", "end": "2024-04-02" }
]'
  size='{"width":1000,"height":500}'
  colors='deep'
>
</gantt>




### A dotplot chart 


<dotplot
data='[
    { "category": "A", "value": 10 },
  { "category": "B", "value": 20 },
  { "category": "C", "value": 30 }
]'
  size='{"width":1000,"height":500}'
  colors='deep'
>
</dotplot>




### A scatterplot chart 


<scatterplot
data='[
     { "x": 10, "y": 20 },
  { "x": 30, "y": 40 },
  { "x": 50, "y": 60 }
]'
  size='{"width":500,"height":500}'
  colors='deep'
>
</scatterplot>



### A boxplot chart 


<boxplot
data='[
   { "category": "A", "value": 10 },
  { "category": "A", "value": 15 },
  { "category": "A", "value": 20 },
  { "category": "B", "value": 30 },
  { "category": "B", "value": 35 },
  { "category": "B", "value": 40 }
]'
  size='{"width":500,"height":500}'
  colors='deep'
>
</boxplot>




### A heatmap chart 


<heatmap
data='[
  { "x": "A", "y": "1", "value": 5 },
  { "x": "A", "y": "2", "value": 10 },
  { "x": "B", "y": "1", "value": 15 },
  { "x": "B", "y": "2", "value": 20 }
]'
  size='{"width":500,"height":500}'
  colors='deep'
>
</heatmap>




### A treemap chart 


<treemap
data='{
  "name": "root",
  "children": [
    { "name": "A", "value": 10 },
    { "name": "B", "value": 20 },
    { "name": "C", "value": 30 },
    { "name": "D", "value": 40 }
  ]
}
'
  size='{"width":500,"height":500}'
  colors='deep'
>
</treemap>




### A tree diagram 


<tree
data='{
  "name": "Root",
  "children": [
    { "name": "Child 1", "children": [{ "name": "Grandchild 1" }, { "name": "Grandchild 2" }] },
    { "name": "Child 2", "children": [{ "name": "Grandchild 3" }] }
  ]
}
'
  size='{"width":500,"height":500}'
  colors='deep'
>
</tree>



### A venn diagram 


<venn
data='
{
  "children": [
    { "name": "A", "size": 10 },
    { "name": "B", "size": 20 },
    { "name": "C", "size": 30 }
  ]
}
'
  size='{"width":500,"height":500}'
  colors='deep'
>
</venn>


```{.matplotlib}
import seaborn as sns
df = sns.load_dataset("penguins")
sns.pairplot(df, hue="species")
```