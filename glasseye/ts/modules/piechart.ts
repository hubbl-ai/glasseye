
export async function piechart(
  div: string = defaultArgumentObject.div,
  data: any = defaultArgumentObject.data,
  size: Size = defaultArgumentObject.size,
  colors: string[] = defaultArgumentObject.colors,
  file?: DataFile,
) {
  const { width, height } = size;
  const radius = Math.min(width, height) / 2;

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
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3
    .scaleOrdinal<string>()
    .domain(processed_data.map((d:any) => d.label))
    .range(d3.schemeTableau10);

  const pie = d3.pie<DataLabeled>().value((d) => d.value);

  const arc: any = d3
    .arc<d3.PieArcDatum<DataLabeled>>()
    .innerRadius(0)
    .outerRadius(radius);

  const arcs = svg
    .selectAll("arc")
    .data(pie(processed_data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d: any) => color(d.processed_data.label));

  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text((d: any) => d.processed_data.label);
}