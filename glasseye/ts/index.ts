// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!
// Generated Mon Mar 31 05:55:50 PM EDT 2025


/// base.ts

import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal, SankeyGraph } from "d3-sankey";
import { SimulationNodeDatum } from "d3";


interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface DataPoint {
  x: number;
  y: number;
}

interface DataLabeled {
  label: string;
  value: number;
}

interface Size {
  width: number;
  height: number;
}

interface DataFile {
  path: string;
  format: string;
}

interface DataNode {
  name?: string;
  size?: number;
  children?: DataNode[];
}

interface ArgumentObject {
  data: any;
  div: string;
  size: Size;
  colors: string[];
  file?: DataFile;
}

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };
const defaultSize: Size = { width: 300, height: 300 };

const defaultArgumentObject: ArgumentObject = {
  data: [],
  div: "chart_",
  size: defaultSize,
  colors: ["#081F36", "#004E98", "#1D5E9F", "#C0C0C0", "#EBEBEB", "#FF6700"],
};

const formatters: { [key: string]: Function } = {
  csv: d3.csv,
  tsv: d3.tsv,
  json: d3.json,
  txt: d3.text,
  hsv: (path: string) => d3.dsv('#',path)
};

async function loadData(path: string, format: string = ""): Promise<any> {
  if (format == "") {
    format = path.split(".").slice(-1)[0];
  }
  if (!(format in formatters)) {
    console.log(`Invalid file format ${format}`);
    return [];
  }

  const data = await formatters[format](path);
  return data;
}

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}
/// linechart.ts



export async function linechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file: DataFile | null = null,
  colors: string[],
  curved = 0
) {
  const { width, height } = size;
  const margin:Margin = defaultMargin;

  if(file?.path)
  {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data:DataPoint[] = data as DataPoint[];

  // Select the container div and clear any existing SVG
  const container = d3.select(div);
  container.selectAll("*").remove();

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define X and Y scales
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(processed_data, (d: DataPoint) => d.x) ?? 0,
      d3.max(processed_data, (d: DataPoint) => d.x) ?? 0,
    ])
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(processed_data, (d: DataPoint) => d.y) ?? 0])
    .range([height - margin.bottom, margin.top]);

  // Create the line generator
  const line = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(curved ? d3.curveMonotoneX : d3.curveLinear);

  // Append the line path
  svg
    .append("path")
    .datum(processed_data)
    .attr("fill", "none")
    .attr("stroke", colors[0])
    .attr("stroke-width", 2)
    .attr("d", line);

  // Append X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(6));

  // Append Y axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
}
/// barchart.ts


export async function barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  horizontal = 0 // 0 = Vertical, 1 = Horizontal
) {
  const { width, height } = size;
  const margin: Margin = defaultMargin;

  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }
  const processed_data: DataLabeled[] = data as DataLabeled[];

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;


  const xHorizontal = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([0, chartWidth]);

  const xVertical = d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartWidth]).padding(0.2);

  const yHorizontal =  d3.scaleBand().domain(processed_data.map((d) => d.label)).range([0, chartHeight]).padding(0.2);

  const yVertical = d3.scaleLinear().domain([0, d3.max(processed_data, (d) => d.value)!]).range([chartHeight, 0]);

  // Draw X axis
  svg.append("g")
    .attr("transform", horizontal ? `translate(0,0)` : `translate(0, ${chartHeight})`)
    .call(horizontal ? d3.axisTop(xHorizontal) : d3.axisBottom(xVertical));

  // Draw Y axis
  svg.append("g").call(horizontal ? d3.axisLeft(yHorizontal) : d3.axisLeft(yVertical));

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  // Draw bars
  svg.selectAll(".bar")
    .data(processed_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr(horizontal ? "y" : "x", (d) => horizontal ? yHorizontal(d.label)! : xVertical(d.label)!)
    .attr(horizontal ? "x" : "y", (d) => horizontal ? xHorizontal(d.value) : yVertical(d.value))
    .attr(horizontal ? "height" : "width", horizontal ? yHorizontal.bandwidth() : xVertical.bandwidth())
    .attr(horizontal ? "width" : "height", (d) => horizontal ? xHorizontal(d.value) : chartHeight - yVertical(d.value))
    .attr("fill", colors[0])
    .on("mouseover", function (event, d: any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY}px`)
        .text(d.label);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    });
}
/// piechart.ts


export async function piechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
  donut?: 0
) {
  const { width, height } = size;
  const radius = Math.min(width, height) / 2;

  if(file?.path)
    {
      data = await loadData(file?.path, file?.format);
    }
    const processed_data:DataLabeled[] = data as DataLabeled[];

    if (colors.length < 10)
    {
      colors.push(...defaultArgumentObject.colors);
    }

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3
    .scaleOrdinal<string>()
    .domain(processed_data.map((d:any) => d.label))
    .range(colors);
    // .range(d3.schemeTableau10);

  const pie = d3.pie<DataLabeled>().value((d) => d.value);

  const arc: any = d3
    .arc<d3.PieArcDatum<DataLabeled>>()
    .innerRadius(donut ? radius * 0.5 :0)
    .outerRadius(radius);

    const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  const arcs = svg
    .selectAll("arc")
    .data(pie(processed_data))
    .enter()
    .append("g")
    .attr("class", "arc")
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.data.label);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    });
    

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d: any) => color(d.data.label));

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("fill", "#FFFFFF")
    .text((d: any) => d.data.label);
}
/// skey.ts

export function skey(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
) {
  const { width, height } = size;
  const nodeWidth = 20;
  const nodePadding = 10;

  // Set up SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define Sankey generator
  const sankeyGenerator = sankey<any, any>()
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .extent([
      [0, 0],
      [width, height],
    ]);

  // Process the data
  const graph: SankeyGraph<any, any> = sankeyGenerator(data);

  // Color scale
  const color = d3.scaleOrdinal<string>().domain(data.nodes.map((d: any) => d.name)).range(colors);

  // Draw Links
  svg
    .append("g")
    .selectAll("path")
    .data(graph.links)
    .enter()
    .append("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("stroke", (d: any) => color(d.source.name) || "#999")
    .attr("stroke-width", (d: any) => Math.max(1, d.width))
    .attr("fill", "none")
    .attr("opacity", 0.7);

  // Draw Nodes
  const node = svg
    .append("g")
    .selectAll("rect")
    .data(graph.nodes)
    .enter()
    .append("rect")
    .attr("x", (d: any) => d.x0)
    .attr("y", (d: any) => d.y0)
    .attr("height", (d: any) => d.y1 - d.y0)
    .attr("width", sankeyGenerator.nodeWidth())
    .attr("fill", (d: any) => color(d.name))
    .attr("stroke", "#666A6D")
    .attr("stroke-width", 1);

  // Add Node Labels
  node
    .append("title")
    .text((d: any) => `${d.name}\n${d.value}`);

  svg
    .append("g")
    .selectAll("text")
    .data(graph.nodes)
    .enter()
    .append("text")
    .attr("x", (d: any) => d.x0 == 0 ? nodeWidth + 6 : d.x0 - 6)
    .attr("y", (d: any) => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", (d: any) => d.x0 == 0 ? "start" : "end")
    .attr("font-size", "smaller")
    .text((d: any) => d.name)
    .attr("fill", "#000");

  return svg.node();
}
/// gantt.ts

export async function gantt(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[]= defaultArgumentObject.colors,
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height);

  
  const margin = defaultMargin;
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;

  const x = d3
    .scaleTime()
    .domain([
      d3.min(data, (d: any) => new Date(d.start)) as Date,
      d3.max(data, (d: any) => new Date(d.end)) as Date,
    ])
    .range([0, width]);

  const y = d3
    .scaleBand()
    .domain(data.map((d: any) => d.task))
    .range([0, height])
    .padding(0.2);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g").call(d3.axisLeft(y));

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.selectAll(".task")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "task")
    .attr("x", (d: any) => x(new Date(d.start)))
    .attr("y", (d: any) => y(d.task) as number)
    .attr("width", (d: any) => x(new Date(d.end)) - x(new Date(d.start)))
    .attr("height", y.bandwidth())
    .attr("fill", (d, i) => colors[i % colors.length]);
}

/// dotplot.ts

export async function dotplot(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
 
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(data.map((d: any) => d.category))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => Number(d.value)) as number])
    .nice()
    .range([height, 0]);

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  // Define dots
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => xScale(d.category)! + xScale.bandwidth() / 2)
    .attr("cy", (d: any) => yScale(d.value))
    .attr("r", 5)
    .attr("fill", (d, i) => colors[i % colors.length])
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", 7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(`${d.category}-${d.value}`);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", 5);
      tooltip.style("display", "none");
    });

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));
}
/// scatterplot.ts

export async function scatterplot(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
 
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Define scales
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => +d.x) || 0])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => +d.y) || 0])
    .range([height, 0]);


  const tooltip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "6px")
  .style("background", "#333")
  .style("color", "#fff")
  .style("border-radius", "4px")
  .style("font-size", "12px")
  .style("display", "none");

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d: any) => xScale(+d.x))
    .attr("cy", (d: any) => yScale(+d.y))
    .attr("r", 5)
    .style("fill", (d, i) => colors[i % colors.length])
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", 7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(`${d.x}-${d.y}`);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", 5);
      tooltip.style("display", "none");
    });
}
/// boxplot.ts

export async function boxplot(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
 
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Compute summary statistics (quartiles, median, min, max)
  const groupedData = d3.group(data, (d: any) => d.category);
  const summaryData = Array.from(groupedData, ([key, values]) => {
    const sorted = values.map((d: any) => +d.value).sort(d3.ascending);
    const q1 = d3.quantile(sorted, 0.25) as number;
    const median = d3.quantile(sorted, 0.5) as number;
    const q3 = d3.quantile(sorted, 0.75) as number;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    return { category: key, min, q1, median, q3, max };
  });

  // Define scales
  const xScale = d3
    .scaleBand()
    .domain(summaryData.map((d) => d.category))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(summaryData, (d) => d.min) as number, d3.max(summaryData, (d) => d.max) as number])
    .nice()
    .range([height, 0]);

  // Draw box plot elements
  const boxWidth = xScale.bandwidth() * 0.6;


  const tooltip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("padding", "6px")
  .style("background", "#333")
  .style("color", "#fff")
  .style("border-radius", "4px")
  .style("font-size", "12px")
  .style("display", "none");

  const boxplotGroups = svg
    .selectAll(".boxplot")
    .data(summaryData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${xScale(d.category)!},0)`)
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 0.7);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.category);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 1);
      tooltip.style("display", "none");
    });

  // Draw vertical lines (min to max)
  boxplotGroups
    .append("line")
    .attr("y1", (d) => yScale(d.min))
    .attr("y2", (d) => yScale(d.max))
    .attr("x1", xScale.bandwidth() / 2)
    .attr("x2", xScale.bandwidth() / 2)
    .attr("stroke", "black")
    

  // Draw rectangles for the interquartile range (IQR)
  boxplotGroups
    .append("rect")
    .attr("y", (d) => yScale(d.q3))
    .attr("height", (d) => yScale(d.q1) - yScale(d.q3))
    .attr("width", boxWidth)
    .attr("x", (xScale.bandwidth() - boxWidth) / 2)
    .attr("stroke", "black")
    .attr("fill", (d, i) => colors[i % colors.length]);

  // Draw median lines
  boxplotGroups
    .append("line")
    .attr("y1", (d) => yScale(d.median))
    .attr("y2", (d) => yScale(d.median))
    .attr("x1", (xScale.bandwidth() - boxWidth) / 2)
    .attr("x2", (xScale.bandwidth() + boxWidth) / 2)
    .attr("stroke", "black");

  // Add X Axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add Y Axis
  svg.append("g").call(d3.axisLeft(yScale));
}
/// heatmap.ts

export async function heatmap(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
 
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove previous SVG if exists
  d3.select(div).select("svg").remove();

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const zoomGroup = svg.append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Extract unique X and Y categories
  const xCategories = Array.from(new Set(data.map((d: any) => d.x))) as string[];
  const yCategories = Array.from(new Set(data.map((d: any) => d.y))) as string[];

  // Define scales
  const xScale = d3.scaleBand().domain(xCategories).range([0, width]).padding(0.05);
  const yScale = d3.scaleBand().domain(yCategories).range([height, 0]).padding(0.05);
  const colorScale = d3.scaleSequential(d3.interpolateBlues)
    .domain([d3.min(data, (d: any) => +d.value) as number, d3.max(data, (d: any) => +d.value) as number])

  // Add X Axis
  zoomGroup.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(0))
    .select(".domain").remove();

  // Add Y Axis
  zoomGroup.append("g")
    .call(d3.axisLeft(yScale).tickSize(0))
    .select(".domain").remove();

  // Add heatmap squares
  zoomGroup.selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => xScale(d.x)!)
    .attr("y", (d: any) => yScale(d.y)!)
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", (d: any) => colorScale(d.value));

  // Add color legend
  const legendWidth = 200, legendHeight = 10;
  const legendSvg = svg.append("g").attr("transform", `translate(${width - legendWidth}, -30)`);

  legendSvg.append("text")
  .attr("x", legendWidth / 2)
  .attr("y", 0) 
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .style("font-weight", "bold")
  .style("color", "#000")
  .text("Legend");

  const legendScale = d3.scaleLinear()
    .domain(colorScale.domain())
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale).ticks(5);
  
  const legendGradient = legendSvg.append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%").attr("x2", "100%")
    .attr("y1", "0%").attr("y2", "0%");
  
  legendGradient.selectAll("stop")
    .data([
      { offset: "0%", color: colors[0] },
      { offset: "100%", color: colors[1] }
    ])
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);

  legendSvg.append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight * 2.5)
    .style("fill", "url(#legend-gradient)");

  legendSvg.append("g")
    .attr("transform", `translate(0, ${legendHeight})`)
    .call(legendAxis);

  const zoom = d3.zoom()
    .scaleExtent([1, 5]) // Min and max zoom levels
    .translateExtent([[0, 0], [svgWidth, svgHeight]]) // Restrict panning
    .on("zoom", (event) => {
      zoomGroup.attr("transform", event.transform);
    });

    svg.call(zoom as unknown as (selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) => void);
}
/// treemap.ts

export async function treemap(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);
 // Remove previous SVG if exists
 d3.select(div).select("svg").remove();

 // Create hierarchical data structure
 const root = d3.hierarchy(data).sum((d: any) => d.value);

 // Apply the treemap layout BEFORE accessing `leaves()`
 const treemapRoot = d3.treemap<any>().size([width, height]).padding(2)(root);

 // Now leaves() returns `HierarchyRectangularNode<T>`, which has `x0, y0, x1, y1`
 const leaves = treemapRoot.leaves();

 // Define color scale
 const colorScale = d3.scaleOrdinal<string>().domain(leaves.map(d => d.data.name)).range(colors);

 // Create SVG
 const svg = d3
   .select(div)
   .append("svg")
   .attr("width", svgWidth)
   .attr("height", svgHeight)
   .append("g")
   .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

 // Add rectangles
 svg
   .selectAll("rect")
   .data(leaves)
   .enter()
   .append("rect")
   .attr("x", (d) => d.x0)
   .attr("y", (d) => d.y0)
   .attr("width", (d) => d.x1 - d.x0)
   .attr("height", (d) => d.y1 - d.y0)
   .style("fill", (d) => colorScale(d.data.name))
   .style("stroke", "#FFFFFF");

 // Add labels
 svg
   .selectAll("text")
   .data(leaves)
   .enter()
   .append("text")
   .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2) // Center horizontally
   .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2) // Center vertically
   .attr("text-anchor", "middle") // Align text in the center
   .attr("dominant-baseline", "middle") // Align text vertically
   .attr("font-size", "16px")
   .attr("fill", "#FFFFFF")
   .text((d) => d.data.name);
}

/// tree.ts

export async function tree(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
  vertical = 0
) {
  
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove existing SVG if present
  d3.select(div).select("svg").remove();

  // Create SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0}, ${margin?.top || 0})`);

  // Create hierarchical data structure
  const root = d3.hierarchy(data);

  // Create a tree layout
  const layoutSize : [number, number] = vertical ? [width, height - 100] : [height,  width- 100] ;
  const treeLayout = d3.tree().size(layoutSize);
  treeLayout(root);

  // Define a link generator (curved lines)
  const linkGenerator = vertical
    ?
     d3
    .linkVertical()
    .x((d:any) => (d as d3.HierarchyPointNode<any>).x)
    .y((d:any) => (d as d3.HierarchyPointNode<any>).y)
    :
    d3
    .linkHorizontal()
    .x((d:any) => (d as d3.HierarchyPointNode<any>).y)
    .y((d:any) => (d as d3.HierarchyPointNode<any>).x)
    ;

  // Draw links (lines between nodes)
  svg
    .selectAll("path.link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", (d:any) => linkGenerator(d)!)
    .style("fill", "none")
    .style("stroke",colors[0])
    .style("stroke-width", 2)
    .on("mouseover", function (event, d) {
      
      d3.select(this).transition().duration(200).attr("stroke-width", 1).style("fill", colors[colors.length-1]);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("stroke-width", 2).style("fill", "none");
    })
    ;

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  let children_store:any[] = [];
  const node_radius = 6;

  // Draw nodes (circles)
  const nodes = svg
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${vertical? d.x: d.y},${vertical ? d.y: d.x})`)
    .on("mouseover", function (event, d) {
      
      d3.select(this).select("circle").transition().duration(200).attr("r", node_radius * 2).style("fill", colors[colors.length-1]);

     
      tooltip
        .style("display", "block")
        .style("left", `${event.pageX + node_radius * 3}px`)
        .style("top", `${event.pageY - node_radius * 4}px`)
        .text(d.data.name);
    })
    .on("mouseout", function () {
      d3.select(this).select("circle").transition().duration(200).attr("r", node_radius).style("fill", (_, i) => colors[i % colors.length]);

      tooltip.style("display", "none");
    })
    .on("click", function (event, d) {
      console.log("Clicked node:", d.data);

      // 🌟 Expand/Collapse nodes on click
      if (d.children) {
        children_store = d.children;
        d.children = undefined;
      } else {
        d.children = children_store;
        children_store = [];
      }

      // Redraw tree with updated structure
      tree(div, data, size, file, colors, vertical);
    });

  nodes
    .append("circle")
    .attr("r", node_radius)
    .style("fill", (d, i) => colors[i % colors.length])
    .style("stroke", colors[0])
    .style("stroke-width", 1.5);

  // Add text labels
  nodes
    .append("text")
    .attr("dy", -10) // Position text slightly above nodes
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("fill", colors[0])
    .text((d) => d.data.name);
}
/// venn.ts

export async function venn(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;
  const margin = defaultMargin;
  const svgWidth = width + (margin?.left || 0) + (margin?.right || 0);
  const svgHeight = height + (margin?.top || 0) + (margin?.bottom || 0);

  // Remove existing SVG if present
  d3.select(div).select("svg").remove();

  // Create SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

  // Define a pack layout to determine circle positions
  const pack = d3.pack<DataNode>().size([width, height]).padding(10);

  // Convert data to a hierarchy structure
  const root = d3.hierarchy<DataNode>(data).sum((d: any) => d.size);

  // Apply pack layout to get node positions
  const nodes = pack(root).leaves();

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px")
    .style("background", "#333")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("display", "none");

  // Draw circles
  svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x - width / 2) // Center circles
    .attr("cy", (d) => d.y - height / 2)
    .attr("r", (d) => d.r)
    .style("fill", (d, i) => colors[i % colors.length])
    .style("opacity", 0.7)
    .style("stroke", colors[0])
    .style("stroke-width", 1.5)
    .on("mouseover", function (event, d:any) {
      d3.select(this).transition().duration(200).style("opacity", 1);
      d3.select(this).transition().duration(200).attr("r", (d:any) => d.r * 1.05);

      tooltip
      .style("display", "block")
      .style("left", `${event.pageX}px`)
      .style("top", `${event.pageY}px`)
      .text(d.data.name);

    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("opacity", 0.7);
      d3.select(this).transition().duration(200).attr("r", (d:any) => d.r);
      tooltip.style("display", "none");
    });

  // Add text labels
  svg
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("x", (d) => d.x - width / 2)
    .attr("y", (d) => d.y - height / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .style("fill", colors[0])
    .style("font-size", "14px")
    .text((d:any) => d.data.name);
}
/// force.ts

export async function force(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }


  const { width, height } = size;
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3
    .forceSimulation<Node>(data.nodes)
    .force("link", d3.forceLink<Node, Link>(data.links).id((d:any) => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6);

  const node = svg
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", (d:any, i) => colors[d.group % colors.length])
    .call(
      d3.drag<any, any>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  simulation.on("tick", () => {
    link
      .attr("x1", (d:any) => (d.source as Node).x!)
      .attr("y1", (d:any) => (d.source as Node).y!)
      .attr("x2", (d:any) => (d.target as Node).x!)
      .attr("y2", (d:any) => (d.target as Node).y!);

    node.attr("cx", (d:any) => d.x!).attr("cy", (d:any) => d.y!);
  });
}
/// chord.ts

export async function chord(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors
) {
  if (file?.path) {
    data = await loadData(file?.path, file?.format);
  }

  const { width, height } = size;

  const innerRadius = Math.min(width, height) * 0.4;
  const outerRadius = innerRadius + 20;

  const color = d3.scaleOrdinal(colors || d3.schemeCategory10);

  const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const ribbon = d3.ribbon().radius(innerRadius);

  const chords = chord(data);

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // Draw arcs
  const group = svg
    .append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter()
    .append("g");

  group
    .append("path")
    .attr("d", arc as any)
    .style("fill", (_, i) => color(i.toString()))
    .style("stroke", "#000");

  group
    .append("text")
    .attr("dy", ".35em")
    .attr("x", (d) => (outerRadius + 5) * Math.cos((d.startAngle + d.endAngle) / 2 - Math.PI / 2))
    .attr("y", (d) => (outerRadius + 5) * Math.sin((d.startAngle + d.endAngle) / 2 - Math.PI / 2))
    .attr("text-anchor", (d) => ((d.startAngle + d.endAngle) / 2 > Math.PI ? "end" : "start"))
    .text((d, i) => `Group ${i}`)
    .style("font-size", "12px")
    .style("fill", "#000");

  group
    .append("title")
    .text((d, i) => `Group ${i}: ${d.value}`);

  // Draw ribbons
  svg
    .append("g")
    .selectAll("path")
    .data(chords)
    .enter()
    .append("path")
    .attr("d", ribbon as any)
    .style("fill", (d) => color(d.source.index.toString()))
    .style("stroke", "#000");
}
