import {UnAuthenticatedError} from "../errors/index.js"
import jwt from 'jsonwebtoken'

const auth =(req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        throw new UnAuthenticatedError('authentication invalid')
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = (payload.userId === '637de5a8e0edfdf4c32144b8')
        req.user = {userId: payload.userId, testUser}
        next()
    }catch(err){
        throw new UnAuthenticatedError('authentication invalid!')
    }

}

export default auth