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
