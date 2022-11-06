import jwt from 'jsonwebtoken';
import pick  from 'lodash';

export const issueToken=async (user)=> {
    const secret=process.env.SECRET;
    let token = await jwt.sign({user},secret,{expiresIn: 20 });
    return `Bearer ${token}`;
};

export const serializeUser = (user) => {
    return pick(user,['id','name','email','role'])};
    