"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const auth = {
    register: async (req, res) => {
        try {
            const { name, account, password } = req.body;
            checkDuplicate(account)
                .then(() => hashPassword(password))
                .then((val) => savingData(name, account, val))
                .then((val) => {
                res.json({
                    status: 'OK',
                    msg: 'Register successfully',
                    data: val
                });
            })
                .catch((error) => {
                res.status(401).json({ msg: error.message });
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};
exports.default = auth;
async function checkDuplicate(account) {
    const user = await User_1.default.findOne({ account });
    if (user)
        throw Error('Email already exist');
}
async function hashPassword(password) {
    return await bcrypt_1.default.hash(password, 8);
}
async function savingData(name, account, hash) {
    const USER = new User_1.default({
        name,
        account,
        password: hash
    });
    await USER.save();
    return USER;
}
