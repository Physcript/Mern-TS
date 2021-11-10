"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const valid_1 = require("../middleware/valid");
const router = express_1.default.Router();
router.post('/register', valid_1.validRegistration, auth_1.default.register);
exports.default = router;
