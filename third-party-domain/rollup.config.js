import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

const src = path.join('public', 'reporting-endpoint');
const dst = path.join('public', 'reporting-endpoint');

export default [{
  input: path.join(src, 'index.js'),
  output: {
    file: path.join(dst, 'bundle.js'),
    format: 'es'
  },
  plugins: [
    commonjs({ extensions: ['.js'] }),
    nodeResolve({
      browser: true,
      preferBuiltins: true
    }),
    builtins(),
    globals(),
  ]
}];
