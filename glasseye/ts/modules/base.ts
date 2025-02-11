
import * as d3 from "d3";

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

interface ArgumentObject {
  data: DataPoint[];
  div: string;
  size: Size;
  colors: string[];
  options?: any
}

const defaultMargin: Margin = { top: 20, bottom: 20, left: 20, right: 20 };

const defaultArgumentObject: ArgumentObject = {
  data: [],
  div: 'chart_',
  size: {width:300, height: 300},
  colors: ['#081F36','#004E98','#1D5E9F','#C0C0C0','#EBEBEB','#FF6700']
}