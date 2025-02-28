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
  const pack = d3.pack().size([width, height]).padding(10);

  // Convert data to a hierarchy structure
  const root = d3.hierarchy({ children: data }).sum((d: any) => d.size);

  // Apply pack layout to get node positions
  const nodes = pack(root).leaves();

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
    .on("mouseover", function () {
      d3.select(this).style("opacity", 1);
    })
    .on("mouseout", function () {
      d3.select(this).style("opacity", 0.7);
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