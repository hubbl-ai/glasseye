import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './linechart.ts',
  output: {
    file: '../../../demo/js/bundle.js',
    format: 'iife', 
    name: 'ChartModule',
  },
  plugins: [resolve(), typescript()]
};