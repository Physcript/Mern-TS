"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    MONGODB: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            wtimeoutMS: 5000,
            keepAlive: true,
            maxPoolSize: 50,
            autoIndex: false,
            retryWrites: false
        },
        url: process.env.MONGO_URL
    },
    SERVER: {
        host: 'localhost',
        port: process.env.PORT || 5000
    }
};
exports.default = config;
