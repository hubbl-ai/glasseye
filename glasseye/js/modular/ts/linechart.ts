import * as d3 from "d3";

interface DataPoint {
  x: number;
  y: number;
}

export function linechart(
  processed_data: DataPoint[], 
  div: string, 
  size: { width: number; height: number }
) {
  const { width, height } = size;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

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
    .domain([
      0,
      d3.max(processed_data, (d: DataPoint) => d.y) ?? 0,
    ])
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
