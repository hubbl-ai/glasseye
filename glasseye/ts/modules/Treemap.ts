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

  // Create the SVG container
  const svg = d3
    .select(div)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin?.left || 0},${margin?.top || 0})`);

  // Create hierarchical data structure
  const root = d3.hierarchy(data).sum((d: any) => d.value);

  // Generate treemap layout
  d3.treemap().size([width, height]).padding(2)(root);

  // Define color scale
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(root.leaves().map((d) => d.data.name))
    .range(colors);

  // Add rectangles
  const nodes = svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("fill", (d) => colorScale(d.data.name))
    .style("stroke", "#fff");

  // Add labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => d.x0 + 4)
    .attr("y", (d) => d.y0 + 14)
    .attr("font-size", "12px")
    .attr("fill", "#fff")
    .text((d) => d.data.name)
    .each(function (d) {
      const text = d3.select(this);
      const rectWidth = d.x1 - d.x0;
      if (text.node()?.getComputedTextLength() ?? 0 > rectWidth - 8) {
        text.text("");
      }
    });
}
