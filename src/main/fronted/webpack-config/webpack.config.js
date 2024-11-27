module.exports = {
    // ... 다른 Webpack 설정
    devServer: {
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error("webpack-dev-server is not defined");
            }
            // 여기에 기존 onBeforeSetupMiddleware, onAfterSetupMiddleware의 내용을 작성
            return middlewares;
        },
        // 기타 옵션
    },
};

