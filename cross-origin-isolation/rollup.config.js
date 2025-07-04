import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const src = 'public';
const dst = 'public';

export default [{
  input: path.join(src, 'client.js'),
  output: {
    file: path.join(dst, 'bundle.js'),
    format: 'es'
  },
  plugins: [
    commonjs(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
  ]
}];
