Here's my attempt to make this:

<skey
  size='{"width":500,"height":225}'
  data='{
    "nodes": [
        { "name": "Solar", "width": 100, "index": 0 },
        { "name": "Wind", "width": 120, "index": 1 },
        { "name": "Hydro", "width": 80, "index": 2 },
        { "name": "Nuclear", "width": 90, "index": 3 },
        { "name": "Coal", "width": 200, "index": 4 },
        { "name": "Natural gas", "width": 210, "index": 5 },
        { "name": "Oil", "width": 250, "index": 6 },
        { "name": "Electricity", "width": 720, "index": 7 },
        { "name": "Heat", "width": 80, "index": 8 },
        { "name": "Fuel", "width": 250, "index": 9 },
        { "name": "Residential", "width": 210, "index": 10 },
        { "name": "Commercial", "width": 180, "index": 11 },
        { "name": "Industrial", "width": 280, "index": 12 },
        { "name": "Transportation", "width": 200, "index": 13 },
        { "name": "Energy services", "width": 710, "index": 14 },
        { "name": "Losses", "width": 160, "index": 15 }
    ],
    "links": [
        { "source": 0, "target": 7, "value": 100 },
        { "source": 1, "target": 7, "value": 120 },
        { "source": 2, "target": 7, "value": 80 },
        { "source": 3, "target": 7, "value": 90 },
        { "source": 4, "target": 7, "value": 200 },
        { "source": 5, "target": 7, "value": 130 },
        { "source": 5, "target": 8, "value": 80 },
        { "source": 6, "target": 9, "value": 250 },
        { "source": 7, "target": 10, "value": 170 },
        { "source": 7, "target": 11, "value": 160 },
        { "source": 7, "target": 12, "value": 230 },
        { "source": 8, "target": 10, "value": 40 },
        { "source": 8, "target": 11, "value": 20 },
        { "source": 8, "target": 12, "value": 20 },
        { "source": 9, "target": 12, "value": 50 },
        { "source": 9, "target": 13, "value": 200 },
        { "source": 10, "target": 14, "value": 180 },
        { "source": 10, "target": 15, "value": 30 },
        { "source": 11, "target": 14, "value": 150 },
        { "source": 11, "target": 15, "value": 30 },
        { "source": 12, "target": 14, "value": 230 },
        { "source": 12, "target": 15, "value": 50 },
        { "source": 13, "target": 14, "value": 150 },
        { "source": 13, "target": 15, "value": 50 }
    ]
}'
    n_colors=24
>
</skey>

look like this:

![Interactive sankey](https://www.syncfusion.com/blogs/wp-content/uploads/2025/01/Interactive-Sankey-legends-1.png)
