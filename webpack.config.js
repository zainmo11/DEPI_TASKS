const path = require('path');

module.exports = {
    entry: './src/task1.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'task1.js',
        path: path.resolve(__dirname, 'dist')
    }
};
