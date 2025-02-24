import logging
import sys, os, re, pypandoc as py
import json
from bs4 import BeautifulSoup
import seaborn
from getopt import *
from tempfile import NamedTemporaryFile

fonts = [
    'http://fonts.googleapis.com/css?family=Raleway',
    'http://fonts.googleapis.com/css?family=Droid%20Sans',
    'http://fonts.googleapis.com/css?family=Lato',
]

prod_stylesheets = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css',
    'https://dev.hubbl.ai/css/tufte.css',
    'https://dev.hubbl.ai/css/glasseyeCharts.css',
]

dev_stylesheets = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css'
    'css/tufte.css',
    'css/glasseyeCharts.css',
]

base_scripts = [
    "https://cdn.jsdelivr.net/npm/d3@7",
    "https://unpkg.com/d3-array@1",
    "https://unpkg.com/d3-collection@1",
    "https://unpkg.com/d3-path@1",
    "https://unpkg.com/d3-shape@1",
    "https://unpkg.com/d3-sankey@0",
    "http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js",
    "https://benfred.github.io/venn.js/venn.js",
]

dev_scripts = base_scripts + [
    "js/glasseyechart.js"
]

prod_scripts = base_scripts + [
    'https://dev.hubbl.ai/js/glasseyeChart.css'
]

formatted_scripts = [
    '''<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.7/require.min.js"
 integrity="sha512-J5ha2LF4Le+PBQnI5+xAVJDR+sZG9uSgroy4n/A6TLjNkvYQbqZA8WHZdaOvJ0HiKkBC9Frmvs10rFDSHKmveQ=="
 crossorigin="anonymous"
 referrerpolicy="no-referrer"></script>'''
 ]

tpl = '''<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>{title}</title>
        {fonts}
        {stylesheets}
        {scripts}
    </head>

    <body>
        <div id = "tufte_container">
            {soup}
        </div>
        <script type="text/javascript">
            {code}
        </script>

        <script type="text/javascript">
            (function () {{
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
                document.getElementsByTagName("head")[0].appendChild(script);
            }})();
        </script>
    </body>
</html>
'''

# Mode is 'dev' for development mode (with the '-D' flag), and 'prod'
# for production mode.

mode = 'prod'

module_name = 'ChartModule'
logger = None

# Function to wrap with tags
def wrap(to_wrap, wrap_in):
    contents = to_wrap.replace_with(wrap_in)
    wrap_in.append(contents)

def resolve_color_palette(colors, n_colors, desat=0):
    palette = seaborn.color_palette(
        palette=colors, desat=desat, n_colors=n_colors)

    if palette:
        palette = [
            '#%02X%02X%02X' % tuple(
                map(
                    lambda x: int(255 * x),
                    hue
                )
            ) for hue in [c for c in palette]]
        
    return palette

# Function to add charts
def add_chart(chart_id, fields, soup, code_string):
    all_fields = {
        'data':[],
        'size':{},
        'colors':[],
        'file':{}
    }

    palette_fields = {
        'colors':'pastel',
        'desat':0,
        'n_colors':10
    }

    if fields:
        all_fields |= fields

    for d in enumerate(soup.find_all(chart_id)):
        attrs = d[1].attrs
        args = [f"'#{chart_id}_{str(d[0])}'"]   # Insert the div ID

        # Figure out the colors

        for field, dv in palette_fields.items():
            if field in attrs:
                try:
                    palette_fields[field] = json.loads(attrs[field])
                except:
                    breakpoint()

        # Compute the palette
        logger.info(palette_fields)
        all_fields['colors'] = resolve_color_palette(**palette_fields)

        # Resolve everything but color.

        for field,dv in all_fields.items():
            if field == 'colors':
                args.append(str(all_fields['colors']))
            elif field in palette_fields:
                continue
            elif field in attrs:
                args.append(str(json.loads(attrs[field])))
            else:
                args.append(str(dv))

        code_string += f"{module_name}.{chart_id}({','.join(args)});"
        d[1].name = "span"
        d[1].contents = ""
        d[1]['id'] = chart_id + "_" + str(d[0])
        tag = soup.new_tag("br")
        d[1].insert_after(tag)

    return code_string

def main():
    global mode
    global logger

    filters = []
    extras = ['--mathjax']
    title = None
    input_file = None
    output_file = None
    verbosity = logging.WARNING
    errors = 0
    usage = '''Usage: glasseye args input_file
where args arg one of:
-D|--dev               # Run this script in development mode
-f|--filter	filter # Add a filter to be passed to pandoc
-h|--help              # Print this message
-o|--output	file   # File to which to store HTML document
-p|--plt	       # Short cut for adding the pandoc-plot filter
-t|--title	       # Title for generated HTML document
-v|--verbose           # Increase debugging output. May be repeated

In dev mode, the script must be run in the same folder as the script.
'''

    opts, args = getopt(
        sys.argv[1:],
        'Df:o:pt:v',
        ('dev', 'filter', 'output', 'plt', 'title', 'verbose')
    )

    for k, v in opts:
        if k in ['-D', '--dev']:
            mode = 'dev'
        elif k in ['-f', '--filter']:
            filters.append(v)
        elif k in ['-o', '--output']:
            output_file = v
        elif k in ['-p', '--plt']:
            filters.append('pandoc-plot')
        elif k in ['-t', '--title']:
            title = v
        elif k in ['-v', '--verbose']:
            verbosity -= 10
        elif k in ['-?', '-h', '--help']:
            errors += 1
    

    logging.basicConfig(level=verbosity)

    logger = logging.getLogger()

    logger.info(f'running in {mode} mode')

    if len(args) != 1:
        errors += 1

    if errors:
        sys.stderr.write(usage)
        sys.exit(0)

    input_file = args[0]

    if output_file is None:
        base, ext = os.path.splitext(args[0])

        if ext != '.md':
            logger.error('file must have ".md" extension')
            errors += 1
            sys.exit(0)

        output_file = base + '.html'
    
    if os.path.exists(output_file):
        os.rename(output_file, output_file + '~')

    if title is None:
        title, _ = os.path.splitext(
            os.path.basename(output_file)
        )
        
        logger.info(f'derived title {title} from file {output_file}')

    logger.info(f'creating {output_file}')

    # Call pandoc and parse the HTML with BeautifulSoup

    with NamedTemporaryFile(suffix='html', delete_on_close=False) as pfp:
        pfp.close()

        if hasattr(py, 'convert'):
            convert = py.convert
        else:
            convert = py.convert_file

        convert(
            input_file,
            'html',
            outputfile=pfp.name,
            extra_args=extras,
            filters=filters
        )

        with open(pfp.name, 'r') as rfp:
            pdoc = rfp.read()
            soup = BeautifulSoup(pdoc, 'html.parser')

    # Process the generated HTML to match the Tufte format

    for a in soup.find_all('marginnote'):
        p = soup.new_tag("p")
        a.replace_with(p)
        p.insert(0, a)
        a.name = "span"
        a['class'] = "marginnote"

    for a in enumerate(soup.find_all('sidenote')):
        a[1].name = "span"
        a[1]['class'] = "marginnote"
        a[1].insert(0, str(a[0]+1) + ". ")
        tag = soup.new_tag("sup")
        tag.string = str(a[0]+1)
        a[1].insert_before(tag)

    for a in soup.find_all('checklist'):
        l = a.parent.findNext('ul')
        l['class'] = "checklist"
        a.extract()

    if soup.ol != None:
        for ol in soup.find_all('ol'):
           if ol.parent.name != 'li':
               wrap(ol, soup.new_tag("div", **{'class':'list-container'}))

    if soup.ul != None:
       for ul in soup.find_all('ul'):
           if ul.parent.name != 'li':
               wrap(ul, soup.new_tag("div", **{'class':'list-container'}))

    # Process the charts.

    code_string = ""

    # Standard charts

    standard_charts = {
        'linechart':{'curved':1},
        'piechart':{'donut':0},
        'skey':None,
        'barchart':None,
        'tree':None,
        'vennchart':None,
        'gantt':None,
        'treemap':None,
        'heatmap':None,
        'dotplot':None,
        'scatterplot':None,
        'boxplot':None,
        }

    for s, args in standard_charts.items():
        code_string = add_chart(s, args, soup, code_string)

    # Account for Apple's tendency to be a nanny

    code_string = re.sub('[“”]', '"', code_string)
    code_string = re.sub("[“’‘”]", "'", code_string)

    # Construct the mode-specificities

    scripts = dev_scripts if mode == 'dev' else prod_scripts
    stylesheets = dev_stylesheets if mode == 'dev' else prod_stylesheets

    # Put it all together into a set of arguments for turning the template
    # into the finished document.

    tpl_args = {
        'title': title,
        'fonts': "\n".join([
            f"<link href='{font}' rel='stylesheet' type='text/css'>" for font in fonts
        ]),
        'scripts': "\n".join(
            [f'<script src="{script}"></script>' for script in scripts] + formatted_scripts
        ),
        'stylesheets': "\n".join(
            f'<link rel="stylesheet" href="{sheet}" />' for sheet in stylesheets
        ),
        'soup': str(soup),
        'code': code_string
    }

    doc = tpl.format(**tpl_args)

    with open(output_file, 'w') as ofp:
        ofp.write(doc)

if __name__ == '__main__':
    main()
