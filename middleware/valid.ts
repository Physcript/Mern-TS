
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

    // TODOS
    // CHECK IF NULL NAME ACCOUNT PASSWORD,
    // CHECK VALID EMAIL
    // CHECK PASSWORD LENGTH

export const validRegistration = async (req: Request,res: Response,next: NextFunction) => {
    const { name, password, account } = req.body

    const e_name = await empty(name)
    const e_password = await empty(password)
    const l_password = await passwordLength(password)
    const v_account = await validEmail(account)

    if( !e_name) return res.status(400).json({msg: 'Name required'})
    if( !v_account) return res.status(400).json({msg: 'Invalid Email'})
    if( !e_password) return res.status(400).json({msg: 'Password required'})
    if( !l_password) return res.status(400).json({msg: 'Minimun 7 characters'})

    next()

}

async function empty(arg: string) {
    if(arg.trim() === '') return false
    return true
}

async function validEmail(arg: string) {
    return validator.isEmail(arg)
}

async function passwordLength(arg: string){
    return arg.trim().length > 6

}
