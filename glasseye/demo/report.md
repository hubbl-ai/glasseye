Building blocks:



<skey
  size='{"width":600,"height":225}'
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
        { "source": "Solar", "target": "Electricity", "value": 100 },
        { "source": "Wind", "target": "Electricity", "value": 120 },
        { "source": "Hydro", "target": "Electricity", "value": 80 },
        { "source": "Nuclear", "target": "Electricity", "value": 90 },
        { "source": "Coal", "target": "Electricity", "value": 200 },
        { "source": "Natural gas", "target": "Electricity", "value": 130 },
        { "source": "Natural gas", "target": "Heat", "value": 80 },
        { "source": "Oil", "target": "Fuel", "value": 250 },
        { "source": "Electricity", "target": "Residential", "value": 170 },
        { "source": "Electricity", "target": "Commercial", "value": 160 },
        { "source": "Electricity", "target": "Industrial", "value": 230 },
        { "source": "Heat", "target": "Residential", "value": 40 },
        { "source": "Heat", "target": "Commercial", "value": 20 },
        { "source": "Heat", "target": "Industrial", "value": 20 },
        { "source": "Fuel", "target": "Industrial", "value": 50 },
        { "source": "Fuel", "target": "Transportation", "value": 200 },
        { "source": "Residential", "target": "Energy services", "value": 180 },
        { "source": "Residential", "target": "Losses", "value": 30 },
        { "source": "Residential", "target": "Energy services", "value": 150 },
        { "source": "Commercial", "target": "Losses", "value": 30 },
        { "source": "Industrial", "target": "Energy services", "value": 230 },
        { "source": "Industrial", "target": "Losses", "value": 50 },
        { "source": "Transportation", "target": "Energy services", "value": 150 },
        { "source": "Transportation", "target": "Losses", "value": 50 }
    ]
}'
    n_colors=24
    useGradient=1
    nodeAlign='"right"'
>
</skey>

```{.matplotlib}
import pandas as pd
from scipy.stats import truncnorm
import seaborn as sns

n_companies = 500

data = {
    'margin': truncnorm.rvs(-3, 3, scale=0.05, size=n_companies),
    'growth': truncnorm.rvs(-3, 3, scale=1.0/3.0, size=n_companies),
    'volatility': truncnorm.rvs(-3, 3, loc=0.5, scale=0.5/3.0, size=n_companies),
}

df = pd.DataFrame(data)

df['accept'] = (df.margin / 0.15 + df.growth + (1.0 - df.volatility)) > 1

sns.pairplot(df, hue='accept')
```

<force
  file='{"path":"data/miserables.json","format":"json"}'
  size='{"width":1500,"height":1300}'
  colors='pastel'
>
</force>


```{.matplotlib}
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.stats import truncnorm
import seaborn as sns

factors = [
    'Injury rate',
    'Organic sales growth',
    'Same-store growth %',
    'Greenfield growth %',
    'Aftermarket sales',
    'Subscription sales growth',
    '# suppliers',
    '# employees in R&D',
    '# products launched this year',
    '# sites closed',
    'Cash conversion rate by Region',
    'Male-female board composition',
    '10 largest shareholders % vote',
    '# mentions of “Competitive advantage”',
    '# mentions of “Restructuring”',
    '# mentions of “Distressed”',
    '# mentions of “Low activity”',
    '# mentions of “Short-term cost actions”',
    'Word count of competition section in annual report',
    'Historic market share by year %',
    'Target market share %',
    'Forecast market revenue growth %',
    'X% of orders placed for delivery within 24 hours',
]

Z = pd.DataFrame(truncnorm.rvs(-3, 3, scale=1.0 / 3.0, size=(len(factors), len(factors))))

Z = pd.DataFrame(np.triu(Z.values) + np.triu(Z.values, 1).T,
    index=factors,
    columns=factors
)

x = range(Z.shape[0])

np.fill_diagonal(Z.values, 1.0)

fig, ax = plt.subplots(figsize=(8, 8))
im = ax.imshow(Z)

ax.set_xticks(x, labels=Z.index,
              rotation=45, ha="right", rotation_mode="anchor")
ax.set_yticks(x, labels=Z.index)
fig.tight_layout()
```

<skey
  data='{
  "nodes": [
    { "name": "Price increase" },
    { "name": "Organic sales growth" },
    { "name": "Subscription sales growth" },
    { "name": "Retention" },
    { "name": "Revenue-to-marketing spend" },
    { "name": "Customer lifetime value-to-cost of customer acquisition" },
    { "name": "EBIT margin" },
    { "name": "Overhead % sales" },
    { "name": "Revenue growth" },
    { "name": "# products launched this year" },
    { "name": "Overhead % sales" },
    { "name": "Dominant market position" },
    { "name": "Brand value" },
    { "name": "Trade secrets" },
    { "name": "Local critical scale" },
    { "name": "Network density" },
    { "name": "Legal monopoly" },
    { "name": "Scarce government license" },
    { "name": "Current patents" },
    { "name": "Experimental company" },
    { "name": "Customer centricity" }
  ], "links": [
  { "source":"Price increase", "target":"Dominant market position", "value": 14 },
  { "source":"Price increase", "target":"Brand value", "value": 16 },
  { "source":"Price increase", "target":"Trade secrets", "value": 17 },
  { "source":"Price increase", "target":"Local critical scale", "value": 13 },
  { "source":"Price increase", "target":"Network density", "value": 14 },
  { "source":"Price increase", "target":"Legal monopoly", "value": 14 },
  { "source":"Price increase", "target":"Scarce government license", "value": 9 },
  { "source":"Price increase", "target":"Current patents", "value": 9 },
  { "source":"Price increase", "target":"Experimental company", "value": 12 },
  { "source":"Price increase", "target":"Customer centricity", "value": 6 },
  { "source":"Organic sales growth", "target":"Dominant market position", "value": 14 },
  { "source":"Organic sales growth", "target":"Brand value", "value": 16 },
  { "source":"Organic sales growth", "target":"Trade secrets", "value": 17 },
  { "source":"Organic sales growth", "target":"Local critical scale", "value": 6 },
  { "source":"Organic sales growth", "target":"Network density", "value": 14 },
  { "source":"Organic sales growth", "target":"Legal monopoly", "value": 14 },
  { "source":"Organic sales growth", "target":"Scarce government license", "value": 9 },
  { "source":"Organic sales growth", "target":"Current patents", "value": 9 },
  { "source":"Organic sales growth", "target":"Experimental company", "value": 18 },
  { "source":"Organic sales growth", "target":"Customer centricity", "value": 13 },
  { "source":"Subscription sales growth", "target":"Dominant market position", "value": 5 },
  { "source":"Subscription sales growth", "target":"Brand value", "value": 16 },
  { "source":"Subscription sales growth", "target":"Trade secrets", "value": 4 },
  { "source":"Subscription sales growth", "target":"Local critical scale", "value": 6 },
  { "source":"Subscription sales growth", "target":"Network density", "value": 5 },
  { "source":"Subscription sales growth", "target":"Legal monopoly", "value": 5 },
  { "source":"Subscription sales growth", "target":"Scarce government license", "value": 9 },
  { "source":"Subscription sales growth", "target":"Current patents", "value": 9 },
  { "source":"Subscription sales growth", "target":"Experimental company", "value": 6 },
  { "source":"Subscription sales growth", "target":"Customer centricity", "value": 6 },
  { "source":"Retention", "target":"Dominant market position", "value": 10 },
  { "source":"Retention", "target":"Brand value", "value": 16 },
  { "source":"Retention", "target":"Trade secrets", "value": 17 },
  { "source":"Retention", "target":"Local critical scale", "value": 19 },
  { "source":"Retention", "target":"Network density", "value": 10 },
  { "source":"Retention", "target":"Legal monopoly", "value": 10 },
  { "source":"Retention", "target":"Scarce government license", "value": 9 },
  { "source":"Retention", "target":"Current patents", "value": 9 },
  { "source":"Retention", "target":"Experimental company", "value": 6 },
  { "source":"Retention", "target":"Customer centricity", "value": 13 },
  { "source":"Revenue-to-marketing spend", "target":"Dominant market position", "value": 10 },
  { "source":"Revenue-to-marketing spend", "target":"Brand value", "value": 5 },
  { "source":"Revenue-to-marketing spend", "target":"Trade secrets", "value": 4 },
  { "source":"Revenue-to-marketing spend", "target":"Local critical scale", "value": 6 },
  { "source":"Revenue-to-marketing spend", "target":"Network density", "value": 10 },
  { "source":"Revenue-to-marketing spend", "target":"Legal monopoly", "value": 10 },
  { "source":"Revenue-to-marketing spend", "target":"Scarce government license", "value": 9 },
  { "source":"Revenue-to-marketing spend", "target":"Current patents", "value": 9 },
  { "source":"Revenue-to-marketing spend", "target":"Experimental company", "value": 18 },
  { "source":"Revenue-to-marketing spend", "target":"Customer centricity", "value": 6 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Dominant market position", "value": 19 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Brand value", "value": 5 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Trade secrets", "value": 9 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Local critical scale", "value": 6 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Network density", "value": 19 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Legal monopoly", "value": 19 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Scarce government license", "value": 9 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Current patents", "value": 9 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Experimental company", "value": 12 },
  { "source":"Customer lifetime value-to-cost of customer acquisition", "target":"Customer centricity", "value": 6 },
  { "source":"EBIT margin", "target":"Dominant market position", "value": 5 },
  { "source":"EBIT margin", "target":"Brand value", "value": 5 },
  { "source":"EBIT margin", "target":"Trade secrets", "value": 4 },
  { "source":"EBIT margin", "target":"Local critical scale", "value": 6 },
  { "source":"EBIT margin", "target":"Network density", "value": 5 },
  { "source":"EBIT margin", "target":"Legal monopoly", "value": 5 },
  { "source":"EBIT margin", "target":"Scarce government license", "value": 9 },
  { "source":"EBIT margin", "target":"Current patents", "value": 9 },
  { "source":"EBIT margin", "target":"Experimental company", "value": 6 },
  { "source":"EBIT margin", "target":"Customer centricity", "value": 6 },
  { "source":"Overhead % sales", "target":"Dominant market position", "value": 5 },
  { "source":"Overhead % sales", "target":"Brand value", "value": 5 },
  { "source":"Overhead % sales", "target":"Trade secrets", "value": 4 },
  { "source":"Overhead % sales", "target":"Local critical scale", "value": 6 },
  { "source":"Overhead % sales", "target":"Network density", "value": 5 },
  { "source":"Overhead % sales", "target":"Legal monopoly", "value": 5 },
  { "source":"Overhead % sales", "target":"Scarce government license", "value": 9 },
  { "source":"Overhead % sales", "target":"Current patents", "value": 9 },
  { "source":"Overhead % sales", "target":"Experimental company", "value": 6 },
  { "source":"Overhead % sales", "target":"Customer centricity", "value": 6 },
  { "source":"Revenue growth", "target":"Dominant market position", "value": 10 },
  { "source":"Revenue growth", "target":"Brand value", "value": 5 },
  { "source":"Revenue growth", "target":"Trade secrets", "value": 13 },
  { "source":"Revenue growth", "target":"Local critical scale", "value": 19 },
  { "source":"Revenue growth", "target":"Network density", "value": 10 },
  { "source":"Revenue growth", "target":"Legal monopoly", "value": 10 },
  { "source":"Revenue growth", "target":"Scarce government license", "value": 9 },
  { "source":"Revenue growth", "target":"Current patents", "value": 9 },
  { "source":"Revenue growth", "target":"Experimental company", "value": 6 },
  { "source":"Revenue growth", "target":"Customer centricity", "value": 13 },
  { "source":"# products launched this year", "target":"Dominant market position", "value": 5 },
  { "source":"# products launched this year", "target":"Brand value", "value": 5 },
  { "source":"# products launched this year", "target":"Trade secrets", "value": 4 },
  { "source":"# products launched this year", "target":"Local critical scale", "value": 6 },
  { "source":"# products launched this year", "target":"Network density", "value": 5 },
  { "source":"# products launched this year", "target":"Legal monopoly", "value": 5 },
  { "source":"# products launched this year", "target":"Scarce government license", "value": 9 },
  { "source":"# products launched this year", "target":"Current patents", "value": 9 },
  { "source":"# products launched this year", "target":"Experimental company", "value": 6 },
  { "source":"# products launched this year", "target":"Customer centricity", "value": 19 },
  { "source":"Overhead % sales", "target":"Dominant market position", "value": 5 },
  { "source":"Overhead % sales", "target":"Brand value", "value": 5 },
  { "source":"Overhead % sales", "target":"Trade secrets", "value": 4 },
  { "source":"Overhead % sales", "target":"Local critical scale", "value": 6 },
  { "source":"Overhead % sales", "target":"Network density", "value": 5 },
  { "source":"Overhead % sales", "target":"Legal monopoly", "value": 5 },
  { "source":"Overhead % sales", "target":"Scarce government license", "value": 9 },
  { "source":"Overhead % sales", "target":"Current patents", "value": 9 },
  { "source":"Overhead % sales", "target":"Experimental company", "value": 6 },
  { "source":"Overhead % sales", "target":"Customer centricity", "value": 6 }
  ]
  }'
  size='{"width": 1000, "height": 1000 }'
  nodeAlign="'right'"
></skey>
