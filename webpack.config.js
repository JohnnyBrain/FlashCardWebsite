/*
module.exports = {
    resolve:{
        fallback:{ "http": require.resolve("stream-http") },
    },
};
*/

module.exports = {
    resolve: {
        fallback: {
            path: false,
            buffer: false,
            crypto: false
        },
    },
};