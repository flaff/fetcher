import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-post-replace';

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        strict: false
    },
    plugins: [
        buble(),
        process.env.FORMAT === 'cjs' && replace({
            'module.exports = index;': '',
            'var index =': 'module.exports ='
        }),
        process.env.FORMAT === 'umd' && replace({
            'return index;': '',
            'var index =': 'return'
        })
    ]
}