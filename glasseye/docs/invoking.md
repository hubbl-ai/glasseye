# Invoking glasseye

Glasseye is designed to be used in several modes.

- HTML formatter
- HTML server
- PDF/Doc/... formatter
- Analytics notebook charts

In *formatter* mode, glasseye formats a document written in Markdown
(as defined by pandoc), and converts it to an output format. The
output format may be anything that pandoc handles, but HTML is handled
differently.  For HTML, the user has the choice of using the default
formatter mode to generate HTML output (along with secondary files
like plots), and to write the output to a file. The output may then be
viewed with any Web browser.

**Note**: If the output file references data stored in local files,
most if not all browsers will refuse to open them because of security
concerns. If the Markdown references no external files, this
limitation may be ignore.

To accommodate this limitation, two solutions are available:

1. Use the Python `server` module to display the file.
2. Use `glasseye` itself to run a builtin server.

The first solution works well for users who only have access to the
output file(s) and not the source files. If the Markdown file is
available, the `--server` (or `-s`) flag can be given. This will run a
local Web server and open the user's default browser with the
formatted document viewable and fully interactive in a new tab.

Note that, if it is desired to give a copy of the output to a third
party, setting the output to a file with the "`.zip`" suffix
(e.g. `glasseye -o mydoc.zip`) will create a ZIP archive with all
required files in it.

If the output file is not HTML, then only a single file is produced.
Note that the interactions and animations implemented with glasseye
are only available in HTML when the output is a file.

Finally, glasseye may be used in analytics notebooks on platforms like
Jupyter and Colab. This permits the user to call a Python function for
a visualization that renders a fully interactive chart in the
notebook, like this:

```python
%pip install --quiet colorcet seaborn glasseye
import glasseye
glasseye.linechart(data=[
      { "x": 1, "y": 10 }, 
      { "x": 2, "y": 20 },
      { "x": 3, "y": 15 },
      { "x": 4, "y": 25 },
      { "x": 5, "y": 30 },
      { "x": 6, "y": 35 }
    ],
    size={"width":450,"height":450},
    colors=["DarkOrange"],
    curved=True
)
```

which produces this:

<span class="chart-container" id="linechart_0">
  <svg width="450" height="450">
    <path fill="none" stroke="#FF8C00" stroke-width="2" d="M20,312.857C47.333,254.286,74.667,195.714,102,195.714C129.333,195.714,156.667,254.286,184,254.286C211.333,254.286,238.667,166.429,266,137.143C293.333,107.857,320.667,98.095,348,78.571C375.333,59.048,402.667,39.524,430,20" stroke-dasharray="598.513427734375" stroke-dashoffset="0">
    </path>
    <g transform="translate(0,430)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
      <path class="domain" stroke="currentColor" d="M20.5,6V0.5H430.5V6">
      </path>
      <g class="tick" opacity="1" transform="translate(20.5,0)">
        <line stroke="currentColor" y2="6">
        </line>
        <text fill="currentColor" y="9" dy="0.71em">1</text>
      </g>
      <g class="tick" opacity="1" transform="translate(102.5,0)">
        <line stroke="currentColor" y2="6">
        </line>
        <text fill="currentColor" y="9" dy="0.71em">2</text>
      </g>
      <g class="tick" opacity="1" transform="translate(184.5,0)">
        <line stroke="currentColor" y2="6">
        </line>
        <text fill="currentColor" y="9" dy="0.71em">3</text>
      </g>
      <g class="tick" opacity="1" transform="translate(266.5,0)">
        <line stroke="currentColor" y2="6">
        </line>
        <text fill="currentColor" y="9" dy="0.71em">4</text>
      </g>
      <g class="tick" opacity="1" transform="translate(348.5,0)">
        <line stroke="currentColor" y2="6">
        </line>
        <text fill="currentColor" y="9" dy="0.71em">5</text>
      </g>
      <g class="tick" opacity="1" transform="translate(430.5,0)">
        <line stroke="currentColor" y2="6">
        </line>
        <text fill="currentColor" y="9" dy="0.71em">6</text>
      </g>
    </g>
    <g transform="translate(20,0)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
      <path class="domain" stroke="currentColor" d="M-6,430.5H0.5V20.5H-6">
      </path>
      <g class="tick" opacity="1" transform="translate(0,430.5)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">0</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,371.92857142857144)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">5</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,313.3571428571429)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">10</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,254.78571428571428)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">15</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,196.21428571428572)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">20</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,137.64285714285714)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">25</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,79.0714285714286)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">30</text>
      </g>
      <g class="tick" opacity="1" transform="translate(0,20.5)">
        <line stroke="currentColor" x2="-6">
        </line>
        <text fill="currentColor" x="-9" dy="0.32em">35</text>
      </g>
    </g>
  </svg>
  <div width="50" height="50">
    <div class="dropdown">
      <button class="dropdown-button">
        <span class="hamburger">
        </span>
      </button>
      <div class="dropdown-content">
        <a>Download PNG</a>
        <a>Download JPEG</a>
        <a>Download SVG</a>
        <a>Download JSON data</a>
      </div>
    </div>
  </div>
</span>
