Glasseye is a near-complete rewrite of a [package](http://coppeliamla.github.io/glasseye)
written by Simon Raper at CoppeliaMLA. Like the original, this version of glasseye
brings together three things:

1. The markdown markup language (and, in particular, the [pandoc](https://pandoc.org/) extensions to markdown)
2. The [Tufte wide margin layout](https://github.com/daveliepmann/tufte-css)
3. Data visualization using [d3](http://d3js.org)

The original version was groundbreaking when it was written in 2015,
but it was essentially a personal project that Raper kindly made available
to others as a courtesy. It was not intended to be a generally usable tool.
Our version differs from the original in the following ways:

1. We have upgraded the version of Python from the original 2.7 to 3.12.
2. We have upgraded the version of d3 from version 6 to version 12.
3. As a result of upgrading d3, all of the chart implementations have been
   almost completely rewritten.
4. We have changed the build implementation to use make, and have removed
   any dependencies or references to hard coded personal folder names.
5. We have added a number of new chart types that were not in the original version.
6. The generated Javascript bundles are now referenced from CDNs instead of locally.
7. We have added the ability to add many, many other sources of visualizations using
   [Laurent P. René de Cotret](https://laurentrdc.xyz/)'s
   [Pandoc-Plot](https://github.com/LaurentRDC/pandoc-plot) package

The result is that making and formatting a new document is now just a
matter of installing glasseye, creating a new markdown document, and running
glasseye on the document, which creates an equivalent HTML document.

Following is the README from the original glasseye:

## What is glasseye?

Glasseye is something I'm developing to present the results of statistical analysis in an attractive and hopefully interesting way. It brings together three great things that I use a lot:

1. The markdown markup language.
2. The Tufte wide margin layout
3. Visualisation using d3.js


See a full demo with a more in-depth explanation [here](http://coppeliamla.github.io/glasseye/demo/markdownExample.html)

The idea is to be able to write up work in markdown and have the results transformed into something like a Tufte layout. For the Tufte layout I took the excellent tufte.css style sheet developed by [Dave Liepmann and co](https://github.com/daveliepmann/tufte-css) and adapted it for my purposes. Finally I've added some d3 charts (just a small selection at the moment but this is growing) that can easily invoked from within the markdown. 

## What it can do
### Side notes and margin notes
First there's the `<sidenote>` tag. Anything enclosed in these tags will generate a numbered side note in the wide margin as close as possible to the note number in the main text. These can be used for commentary, links, bits of maths, anything that's peripheral to the main discussion.

You can easily add images to the side notes and margin notes just by including the usual markdown syntax for inserting an image within the tags.

Then there is a `<marginnote>` tag which is the nearly the same as the side note, only there's no number linking it to a particular part in the main text. You'll see to the right an example of a margin note containing a d3 donut chart. 


### d3 charts

I've tried to create charts that are simple and uncluttered with the tooltip taking over some of the work. This is so that they can fit in the margin nicely. I've been thinking about making them as intellegent as possible so that choices are made for you about formatting (for example label positioning). That may prove annoying though so we'll see how it goes. It's easy to include any of the d3 charts into either the main body of the text or into the margin. 

Inserting a plot is again just a matter of using some custom tags. For example to generate a line plot just surround a string containing the path and filname of a csv file with a `<lineplot>` tag.

Alternatively you can write the data in json into the markdown. For example we can create an interactive treemap by inserting the following into the markdown. See the section below for the full json</sidenote>

```

<treemap>
{
    "name": "All",
    "children": [
        {"name": "Bakery",
         "size": 34},
        {"name": "Tinned Goods",
         "children": [
                {"name": "Beans",
                 "size": 34},
                {"name": "Soups",
                 "size": 56},
                {"name": "Puddings",
                 "children": [
                        {"name": "Fruit",
                         "children": [
                               	{"name": "Tangerines",
                                 "size": 15},
                                {"name": "Pears",
                                 "size": 17}
                            ]
                        },
                        {"name": "Apricots",
                         "size": 89}
...
</treemap>
```

## How it works

Glasseye is built using pandoc and the python beautifulsoup library. Pandoc is used to generate the html from the markdown and beautifulsoup is used to manipulate the extra tags and make the appropriate substitutions, including adding in the d3 charts.

## Installing glasseye

I've now added glasseye to pip so installation is fairly straightforward

1. Install pandoc from [here](http://pandoc.org)
2. If you don't have it already install python 2.7
3. Then from the command line run `pip install glasseye` <sidenote>Assumes you already have the pip package. If you don't just run `easy_install pip`</sidenote>

## Using glasseye

Just create your markdown file using a text editor and then from the commandline run

```
glasseye myMarkdownFile.md
```
The html will then be created in the current directory along with the supporting css and javascript.

You can test it out using the demo that comes with the package. You'll find the demo files in `path_to_your_packages/glasseye/demo`. Copy them to a new directory and run

```
glasseye markdownExample.md
```

See the [demo](http://coppeliamla.github.io/glasseye/glasseye_markdownExample/demo.html) for more information.
