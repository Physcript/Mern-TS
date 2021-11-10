import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';

const auth = {
    register: async( req: Request,res: Response ) => {
        try {
            const { name, account, password } = req.body

            checkDuplicate(account)
                .then( () =>  hashPassword(password)  )
                .then( (val) => savingData(name,account,val) )
                .then( (val)=> {
                    res.json
                    ({
                        status: 'OK',
                        msg: 'Register successfully',
                        data: val
                    })
                })
                .catch((error) => {
                    res.status(401).json({msg: error.message})
                });

        }catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default auth



async function checkDuplicate(account: string) {
    const user = await User.findOne({account})
        if(user) throw Error('Email already exist')
}

async function hashPassword(password: string) {
    return await bcrypt.hash(password,8)
}

async function savingData(name:string, account:string,hash: string) {
    const USER = new User({
        name,
        account,
        password: hash
    })
    await USER.save()
    return USER
}
