
export function linechart(
  args:ArgumentObject= defaultArgumentObject
) {
  const { width, height } = args.size;

  // Select the container div and clear any existing SVG
  const container = d3.select(args.div);
  container.selectAll("*").remove();

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define X and Y scales
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(args.data, (d: DataPoint) => d.x) ?? 0,
      d3.max(args.data, (d: DataPoint) => d.x) ?? 0,
    ])
    .range([args.margin.left, width - args.margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(args.data, (d: DataPoint) => d.y) ?? 0])
    .range([height - args.margin.bottom, args.margin.top]);

  // Create the line generator
  const line = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX);

  // Append the line path
  svg
    .append("path")
    .datum(args.data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Append X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height - args.margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(6));

  // Append Y axis
  svg
    .append("g")
    .attr("transform", `translate(${args.margin.left},0)`)
    .call(d3.axisLeft(yScale));
}