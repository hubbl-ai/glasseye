import { sankey, sankeyLinkHorizontal, SankeyGraph } from "d3-sankey";

export function sankeyChart(
  div: string,
  data: any, // Assumed to contain 'nodes' and 'links'
  size: Size,
  colors: string[]
) {
  const { width, height } = size;

  // Set up SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define Sankey generator
  const sankeyGenerator = sankey<any, any>()
    .nodeWidth(20)
    .nodePadding(10)
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
    .attr("fill", (d: any) => color(d.name));

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
    .attr("x", (d: any) => d.x0 - 6)
    .attr("y", (d: any) => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .text((d: any) => d.name)
    .attr("fill", "#000");

  return svg.node();
}