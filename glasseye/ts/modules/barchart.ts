
export async function barchart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  file?: DataFile,
  colors: string[] = defaultArgumentObject.colors,
) {
  const { width, height } = size;
  const margin:Margin = defaultMargin;


  if(file?.path)
    {
      data = await loadData(file?.path, file?.format);
    }
    const processed_data:DataLabeled[] = data as DataLabeled[];

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
    .domain(processed_data.map((d: any) => d.label))
    .range([0, chartWidth])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(processed_data, (d: any) => d.value as number)!])
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
    .data(processed_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d: any) => x(d.label)!)
    .attr("y", (d: any) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => chartHeight - y(d.value))
    .attr("fill", colors[0]);
}