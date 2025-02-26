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
    .style("fill", (d, i) => colors[i % colors.length]);
}