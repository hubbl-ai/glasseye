// Warning! THIS FILE WAS GENERATED! DO NOT EDIT!
// Generated Thu Feb  6 16:07:18 CAT 2025


/// base.ts

import * as d3 from "d3";

interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };

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

/// linechart.ts

export function linechart(
  processed_data: DataPoint[],
  div: string,
  size: Size,
  margin: Margin = defaultMargin
) {
  const { width, height } = size;

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
    .curve(d3.curveMonotoneX);

  // Append the line path
  svg
    .append("path")
    .datum(processed_data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
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

export function barchart(
  data: DataLabeled[],
  div: string,
  size: Size,
  margin: Margin = defaultMargin
) {
  const { width, height } = size;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, chartWidth])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => d.value)!])
    .range([chartHeight, 0]);

  // Draw X axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(x));

  // Draw Y axis
  svg.append("g").call(d3.axisLeft(y));

  // Draw bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d: any) => x(d.label)!)
    .attr("y", (d: any) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => chartHeight - y(d.value))
    .attr("fill", "steelblue");
}

/// piechart.ts

export function piechart(
  data: DataLabeled[],
  div: string,
  size: Size,
  margin: Margin = defaultMargin
) {
  const { width, height } = size;
  const radius = Math.min(width, height) / 2;

  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3
    .scaleOrdinal<string>()
    .domain(data.map((d) => d.label))
    .range(d3.schemeTableau10);

  const pie = d3.pie<DataLabeled>().value((d) => d.value);

  const arc: any = d3
    .arc<d3.PieArcDatum<DataLabeled>>()
    .innerRadius(0)
    .outerRadius(radius);

  const arcs = svg
    .selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d: any) => color(d.data.label));

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text((d: any) => d.data.label);
}
