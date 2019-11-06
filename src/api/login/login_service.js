import { UserModel } from "../../api/users/user_model"
import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple' 
import { config } from "../../config";

export const tokenForUser = user => {
  const timestamp = new Date().getTime()
  const payload = { _id: user._id, username:user.username, iat:timestamp, exp:timestamp + 10000  }
  return jwt.encode(payload, config.secret)
}

export const login = async (candidateUser, candidatePassword) => {

    let identity = candidateUser.toLowerCase()
    const isMail = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(candidateUser)
    
    let users = []
    let authorizedUsers = []

    switch (isMail){
        case (true):{
            users = await UserModel.find({ email: identity })
            authorizedUsers = await UserModel.find({ authorized: identity })
            break;
        }
        case (false):{
            users = await UserModel.find({ username: identity })
            if (users.length && users[0].email)
                authorizedUsers = await UserModel.find({ authorized: users[0].email })
            break;
        }
    }

    let granted = false
    let retVal = []
    if (!users.length)
        throw({message:`Mail ${candidateUser} doesn't exists`})
    if (users.length){
        for ( const user of users ){
            if (await bcrypt.compare(candidatePassword,user.password))
                granted = true
        }
        if (granted){
            users.forEach( user => {
                retVal.push({username:user.username,token:tokenForUser(user)})
            })
        }
        else {
            throw({message:`Password doesn't match`,showForgotPass:true})
        }
    }


    if (authorizedUsers.length){
        for (let i = 0; i < authorizedUsers.length; i++){
            const user = authorizedUsers[i]
            if (user.speciality && user.speciality.length && !retVal.find( val => user.username === val.username)){
                retVal.push({username:user.username,token:tokenForUser(user)})
            }
        }
    }

    if (!retVal.length && !authorizedUsers.length)
        throw({message:'User is editor and no related accounts found'})
    return retVal

}
      