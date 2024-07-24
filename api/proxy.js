import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// 代理地址
const PROXY_TARGETS = [
    { path: "/api/proxy/openai", target: "https://api.openai.com" },
    { path: "/api/proxy/google", target: "https://generativelanguage.googleapis.com" },
    { path: "/api/proxy/anthropic", target: "https://api.anthropic.com" },
]

PROXY_TARGETS.forEach(({ path, target }) => {
    app.use(path, createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: {
            [`^${path}`]: '',
        }
    }));
});

export default app;