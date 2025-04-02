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
  { "source": 0, "target": 11, "value": 14 },
  { "source": 0, "target": 12, "value": 16 },
  { "source": 0, "target": 13, "value": 17 },
  { "source": 0, "target": 14, "value": 13 },
  { "source": 0, "target": 15, "value": 14 },
  { "source": 0, "target": 16, "value": 14 },
  { "source": 0, "target": 17, "value": 9 },
  { "source": 0, "target": 18, "value": 9 },
  { "source": 0, "target": 19, "value": 12 },
  { "source": 0, "target": 20, "value": 6 },
  { "source": 1, "target": 11, "value": 14 },
  { "source": 1, "target": 12, "value": 16 },
  { "source": 1, "target": 13, "value": 17 },
  { "source": 1, "target": 14, "value": 6 },
  { "source": 1, "target": 15, "value": 14 },
  { "source": 1, "target": 16, "value": 14 },
  { "source": 1, "target": 17, "value": 9 },
  { "source": 1, "target": 18, "value": 9 },
  { "source": 1, "target": 19, "value": 18 },
  { "source": 1, "target": 20, "value": 13 },
  { "source": 2, "target": 11, "value": 5 },
  { "source": 2, "target": 12, "value": 16 },
  { "source": 2, "target": 13, "value": 4 },
  { "source": 2, "target": 14, "value": 6 },
  { "source": 2, "target": 15, "value": 5 },
  { "source": 2, "target": 16, "value": 5 },
  { "source": 2, "target": 17, "value": 9 },
  { "source": 2, "target": 18, "value": 9 },
  { "source": 2, "target": 19, "value": 6 },
  { "source": 2, "target": 20, "value": 6 },
  { "source": 3, "target": 11, "value": 10 },
  { "source": 3, "target": 12, "value": 16 },
  { "source": 3, "target": 13, "value": 17 },
  { "source": 3, "target": 14, "value": 19 },
  { "source": 3, "target": 15, "value": 10 },
  { "source": 3, "target": 16, "value": 10 },
  { "source": 3, "target": 17, "value": 9 },
  { "source": 3, "target": 18, "value": 9 },
  { "source": 3, "target": 19, "value": 6 },
  { "source": 3, "target": 20, "value": 13 },
  { "source": 4, "target": 11, "value": 10 },
  { "source": 4, "target": 12, "value": 5 },
  { "source": 4, "target": 13, "value": 4 },
  { "source": 4, "target": 14, "value": 6 },
  { "source": 4, "target": 15, "value": 10 },
  { "source": 4, "target": 16, "value": 10 },
  { "source": 4, "target": 17, "value": 9 },
  { "source": 4, "target": 18, "value": 9 },
  { "source": 4, "target": 19, "value": 18 },
  { "source": 4, "target": 20, "value": 6 },
  { "source": 5, "target": 11, "value": 19 },
  { "source": 5, "target": 12, "value": 5 },
  { "source": 5, "target": 13, "value": 9 },
  { "source": 5, "target": 14, "value": 6 },
  { "source": 5, "target": 15, "value": 19 },
  { "source": 5, "target": 16, "value": 19 },
  { "source": 5, "target": 17, "value": 9 },
  { "source": 5, "target": 18, "value": 9 },
  { "source": 5, "target": 19, "value": 12 },
  { "source": 5, "target": 20, "value": 6 },
  { "source": 6, "target": 11, "value": 5 },
  { "source": 6, "target": 12, "value": 5 },
  { "source": 6, "target": 13, "value": 4 },
  { "source": 6, "target": 14, "value": 6 },
  { "source": 6, "target": 15, "value": 5 },
  { "source": 6, "target": 16, "value": 5 },
  { "source": 6, "target": 17, "value": 9 },
  { "source": 6, "target": 18, "value": 9 },
  { "source": 6, "target": 19, "value": 6 },
  { "source": 6, "target": 20, "value": 6 },
  { "source": 7, "target": 11, "value": 5 },
  { "source": 7, "target": 12, "value": 5 },
  { "source": 7, "target": 13, "value": 4 },
  { "source": 7, "target": 14, "value": 6 },
  { "source": 7, "target": 15, "value": 5 },
  { "source": 7, "target": 16, "value": 5 },
  { "source": 7, "target": 17, "value": 9 },
  { "source": 7, "target": 18, "value": 9 },
  { "source": 7, "target": 19, "value": 6 },
  { "source": 7, "target": 20, "value": 6 },
  { "source": 8, "target": 11, "value": 10 },
  { "source": 8, "target": 12, "value": 5 },
  { "source": 8, "target": 13, "value": 13 },
  { "source": 8, "target": 14, "value": 19 },
  { "source": 8, "target": 15, "value": 10 },
  { "source": 8, "target": 16, "value": 10 },
  { "source": 8, "target": 17, "value": 9 },
  { "source": 8, "target": 18, "value": 9 },
  { "source": 8, "target": 19, "value": 6 },
  { "source": 8, "target": 20, "value": 13 },
  { "source": 9, "target": 11, "value": 5 },
  { "source": 9, "target": 12, "value": 5 },
  { "source": 9, "target": 13, "value": 4 },
  { "source": 9, "target": 14, "value": 6 },
  { "source": 9, "target": 15, "value": 5 },
  { "source": 9, "target": 16, "value": 5 },
  { "source": 9, "target": 17, "value": 9 },
  { "source": 9, "target": 18, "value": 9 },
  { "source": 9, "target": 19, "value": 6 },
  { "source": 9, "target": 20, "value": 19 },
  { "source": 10, "target": 11, "value": 5 },
  { "source": 10, "target": 12, "value": 5 },
  { "source": 10, "target": 13, "value": 4 },
  { "source": 10, "target": 14, "value": 6 },
  { "source": 10, "target": 15, "value": 5 },
  { "source": 10, "target": 16, "value": 5 },
  { "source": 10, "target": 17, "value": 9 },
  { "source": 10, "target": 18, "value": 9 },
  { "source": 10, "target": 19, "value": 6 },
  { "source": 10, "target": 20, "value": 6 }
  ]
  }'
  size='{"width": 1000, "height": 1000 }'
></skey>
