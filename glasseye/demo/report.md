Building blocks:

<skey
  size='{"width":600,"height":225}'
  file='{"path": "data/energy.json", "format": "json"}'
  n_colors=16
  colors='pastel'
  link_color='"target"'
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
im = ax.imshow(Z, cmap='coolwarm')

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
