import * as d3 from "d3";
import {
  sankey,
  sankeyLinkHorizontal,
  SankeyGraph,
  sankeyLeft,
  sankeyRight,
  sankeyCenter,
  sankeyJustify,
} from "d3-sankey";
import { SimulationNodeDatum } from "d3";
import { Contours } from "d3-contour";
import {HierarchyCircularNode} from 'd3';

interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

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

interface DataFile {
  path: string;
  format: string;
}

// DataNode is used for Venn diagrams

interface DataNode {
  name?: string;
  size?: number;
  children?: DataNode[];
}

interface ArgumentObject {
  data: any;
  div: string;
  size: Size;
  colors: string[];
  file?: DataFile;
}

interface Join extends Leaf {
  height?: number;
  children?: Join[];
}

interface Leaf {
  name?: string;
  id?: number;
  size?: number;
  score?: number;
}

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };
const defaultSize: Size = { width: 300, height: 300 };

const defaultArgumentObject: ArgumentObject = {
  data: [],
  div: "chart_",
  size: defaultSize,
  colors: ["#081F36", "#004E98", "#1D5E9F", "#C0C0C0", "#EBEBEB", "#FF6700"],
};

const formatters: { [key: string]: Function } = {
  csv: d3.csv,
  tsv: d3.tsv,
  json: d3.json,
  txt: d3.text,
  hsv: (path: string) => d3.dsv("#", path),
};

async function loadData(path: string, format: string = ""): Promise<any> {
  if (format == "") {
    format = path.split(".").slice(-1)[0];
  }
  if (!(format in formatters)) {
    console.log(`Invalid file format ${format}`);
    return [];
  }

  const data = await formatters[format](path);
  return data;
}

interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

type InterpGamma = typeof d3.interpolateRgb;
type InterpPair = typeof d3.interpolateHsl;
type InterpList = typeof d3.interpolateRgbBasis;

const interpolaters: Record<string, InterpList | InterpPair | InterpGamma> = {
  rgb: d3.interpolateRgb,
  hsl: d3.interpolateHsl,
  hslLong: d3.interpolateHslLong,
  lab: d3.interpolateLab,
  rgbBasis: d3.interpolateRgbBasis,
  rgbBasisClosed: d3.interpolateRgbBasisClosed
};

function color_interp(args: any) {
  let interp_name: string = args['interp'] || 'rgb';

  if (!interpolaters.hasOwnProperty(interp_name)) {
    console.log(`invalid interpreter ${interp_name}; using rgb`);
    interp_name = 'rgb';
  }

  const colors: string[] = args['colors'] || [];

  switch (interp_name) {
    case 'rgbBasis':
    case 'rgbBasisClosed':
      const list_interp = interpolaters[interp_name] as InterpList;
      return list_interp(colors);
    case 'rgb':
      let gamma_interp = interpolaters[interp_name] as InterpGamma;
      const gamma = args['gamma'] ?? 0;

      if (gamma > 0) {
        gamma_interp = gamma_interp.gamma(gamma);
      }

      return gamma_interp(colors[0], colors[1]);
    default:
      const pair_interp = interpolaters[interp_name] as InterpPair;
      return pair_interp(colors[0], colors[1]);
  }
}
