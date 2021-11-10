"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes"));
// middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
// ROUTES
app.use('/api', routes_1.default.authRouter);
// database
mongoose_1.default
    .connect(`${config_1.default.MONGODB.url}`, config_1.default.MONGODB.options)
    .then(() => {
    console.log('DATABASE CONNECTED');
})
    .catch((error) => {
    console.log(error);
});
const PORT = config_1.default.SERVER.port;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
