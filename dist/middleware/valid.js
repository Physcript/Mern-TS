"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validRegistration = void 0;
const validator_1 = __importDefault(require("validator"));
// TODOS
// CHECK IF NULL NAME ACCOUNT PASSWORD,
// CHECK VALID EMAIL
// CHECK PASSWORD LENGTH
const validRegistration = async (req, res, next) => {
    const { name, password, account } = req.body;
    const e_name = await empty(name);
    const e_password = await empty(password);
    const l_password = await passwordLength(password);
    const v_account = await validEmail(account);
    if (!e_name)
        return res.status(400).json({ msg: 'Name required' });
    if (!v_account)
        return res.status(400).json({ msg: 'Invalid Email' });
    if (!e_password)
        return res.status(400).json({ msg: 'Password required' });
    if (!l_password)
        return res.status(400).json({ msg: 'Minimun 7 characters' });
    next();
};
exports.validRegistration = validRegistration;
async function empty(arg) {
    if (arg.trim() === '')
        return false;
    return true;
}
async function validEmail(arg) {
    return validator_1.default.isEmail(arg);
}
async function passwordLength(arg) {
    return arg.trim().length > 6;
}
