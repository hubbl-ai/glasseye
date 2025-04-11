Building blocks:


<contour
data='[
  [0, 1, 2, 3, 2],
  [1, 2, 3, 4, 3],
  [2, 3, 4, 5, 4],
  [1, 2, 3, 4, 3],
  [0, 1, 2, 3, 2]
]'
  size='{"width":500,"height":500}'
  colors='pastel'
>
</contour>

<dendrogram
data='{
  "id": 22,
  "distance": 4.09206523,
  "children": [
    {
      "id": 20,
      "distance": 3.39675184,
      "children": [
        {
          "id": 16,
          "distance": 1.20710678,
          "children": [
            {
              "name": "node C",
              "size": 1.0,
              "score": 1.0
            },
            {
              "id": 12,
              "distance": 1.0,
              "children": [
                {
                  "name": "node A",
                  "size": 1.0,
                  "score": 1.0
                },
                {
                  "name": "node B",
                  "size": 1.0,
                  "score": 1.0
                }
              ],
              "size": 2.0,
              "score": 1.0
            }
          ],
          "size": 3.0,
          "score": 1.0
        },
        {
          "id": 17,
          "distance": 1.20710678,
          "children": [
            {
              "name": "node F",
              "size": 1.0,
              "score": 1.0
            },
            {
              "id": 13,
              "distance": 1.0,
              "children": [
                {
                  "name": "node D",
                  "size": 1.0,
                  "score": 1.0
                },
                {
                  "name": "node E",
                  "size": 1.0,
                  "score": 1.0
                }
              ],
              "size": 2.0,
              "score": 1.0
            }
          ],
          "size": 3.0,
          "score": 1.0
        }
      ],
      "size": 6.0,
      "score": 1.0
    },
    {
      "id": 21,
      "distance": 3.39675184,
      "children": [
        {
          "id": 18,
          "distance": 1.20710678,
          "children": [
            {
              "name": "node I",
              "size": 1.0,
              "score": 1.0
            },
            {
              "id": 14,
              "distance": 1.0,
              "children": [
                {
                  "name": "node G",
                  "size": 1.0,
                  "score": 1.0
                },
                {
                  "name": "node H",
                  "size": 1.0,
                  "score": 1.0
                }
              ],
              "size": 2.0,
              "score": 1.0
            }
          ],
          "size": 3.0,
          "score": 1.0
        },
        {
          "id": 19,
          "distance": 1.20710678,
          "children": [
            {
              "name": "node L",
              "size": 1.0,
              "score": 1.0
            },
            {
              "id": 15,
              "distance": 1.0,
              "children": [
                {
                  "name": "node J",
                  "size": 1.0,
                  "score": 1.0
                },
                {
                  "name": "node K",
                  "size": 1.0,
                  "score": 1.0
                }
              ],
              "size": 2.0,
              "score": 1.0
            }
          ],
          "size": 3.0,
          "score": 1.0
        }
      ],
      "size": 6.0,
      "score": 1.0
    }
  ],
  "size": 12.0,
  "score": 1.0
}'
  size='{"width":500,"height":500}'
  colors='pastel'
>
</dendrogram>


<skey
  size='{"width":600,"height":225}'
  file='{"path": "data/energy.json", "format": "json"}'
  n_colors=10
  colors='pastel'
  link_color='"source-target"'
  node_align='"right"'
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

<disjoint
    file='{"path":"data/graph.json","format":"json"}'
    size='{"width":1000,"height":1000}'
    colors='pastel'>
</disjoint>

```{.matplotlib}
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
import numpy as np
import pandas as pd
from scipy.stats import truncnorm
import seaborn as sns

with open('data/factors.txt') as ifp:
    factors = ifp.readlines()

Z = pd.DataFrame(truncnorm.rvs(-3, 3, scale=1.0 / 3.0, size=(len(factors), len(factors))))

Z = pd.DataFrame(np.triu(Z.values) + np.triu(Z.values, 1).T,
    index=factors,
    columns=factors
)

x = range(Z.shape[0])

np.fill_diagonal(Z.values, 1.0)

fig, ax = plt.subplots(figsize=(8, 8))
pastel_cmap = ListedColormap(sns.color_palette("coolwarm").as_hex())
im = ax.imshow(Z, cmap=pastel_cmap)

ax.set_xticks(x, labels=Z.index,
              rotation=45, ha="right", rotation_mode="anchor")
ax.set_yticks(x, labels=Z.index)
fig.tight_layout()
```

<skey
  file='{"path": "data/features.json", "format": "json" }'
  size='{"width": 1000, "height": 1000 }'
  node_align="'right'"
  n_colors=20
  colors='husl'
></skey>
