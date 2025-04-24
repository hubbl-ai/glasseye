import numpy as np
import pandas as pd
from scipy.stats import truncnorm
import json

# Read factors (remove newlines and strip whitespace)
with open('data/factors.txt') as ifp:
    factors = [line.strip() for line in ifp.readlines()]

# Create upper triangular matrix of random values
Z_raw = truncnorm.rvs(-3, 3, scale=1.0 / 3.0, size=(len(factors), len(factors)))
Z = pd.DataFrame(Z_raw)

# Make symmetric matrix
Z = pd.DataFrame(np.triu(Z.values) + np.triu(Z.values, 1).T,
                 index=factors,
                 columns=factors)

# Set diagonal to 1.0
np.fill_diagonal(Z.values, 1.0)

# Flatten to list of triples
triples = []
for i, row in enumerate(factors):
    for j, col in enumerate(factors):
        triples.append({
            "x": row,
            "y": col,
            "value": round(Z.values[i][j], 4)
        })

# Write to JSON file
with open('data/symmetric_matrix.json', 'w') as out_fp:
    json.dump(triples, out_fp, indent=2)