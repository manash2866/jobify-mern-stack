import {UnAuthenticatedError} from '../errors/index.js'

const checkPermission = (requestUser, resourceUserId)=>{
    if(requestUser.userId === resourceUserId.toString()) return
    throw new UnAuthenticatedError('not authorized to access this route')
}

export default checkPermission