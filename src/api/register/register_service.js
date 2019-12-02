import { UserModel } from "../users/user_model"
import { smtpTransport } from '../data/data'
import bcrypt from 'bcryptjs'
import { config } from "../../config";
import { tokenForUser } from "../login/login_service";
import mongoose from 'mongoose'
import { SpecialityModel } from "../specialities/speciality_model";

export const register = async (newCandidate) => {
    let newUser = {
        username:newCandidate.username,
        firstname:newCandidate.firstname,
        lastname:newCandidate.lastname,
        password: newCandidate.password,
        mainSpeciality: newCandidate.mainSpeciality,
        mobile: newCandidate.mobile,
        email: newCandidate.email,
/*         vcard:[ {localeId,value:[{'url':`${process.env.NODE_ENV == 'development' ? config.devClient:config.client}/card/${newCandidate.username}`}]} ]
 */    }

    const emailCount = await UserModel.countDocuments({'email': newCandidate.email})
    
    let user = await UserModel.findOne({username: newCandidate.username})

    if (user) {
        // username already exists
        throw({message:`Username ${newCandidate.username} already exists`})
    }

    if (emailCount > 2)
        throw({message:`Mail ${newCandidate.email} already been used 3 times`})


    if (!Object.keys(newUser.firstname).length){
        throw({message:`Firstname is missing`})
    }

    if (!Object.keys(newCandidate.lastname).length){
        throw({message:`Lastname is missing`})
    }

      
    // add hashed password to user object
    newUser.password = await bcrypt.hash(newCandidate.password,10)

    if(!newCandidate.mainSpeciality instanceof Object || Object.keys(newCandidate.mainSpeciality).length < 1)  {
        if (!newCandidate.editor)
            throw({message:`Main mainSpeciality is missing`})
    }

    if (newCandidate.mainSpeciality.__isNew__){
        let name = newCandidate.mainSpeciality.name
        let exists = await SpecialityModel.findOne(name)
        if (exists){
            newUser.mainSpeciality = exists._id
        }
        else{
            const newSpeciality = await SpecialityModel.create(newCandidate.mainSpeciality)
            newUser.mainSpeciality = newSpeciality._id
        }
    }
    else if (!newCandidate.mainSpeciality.__isNew__){
        newUser.mainSpeciality = newCandidate.mainSpeciality.value
    }
    const newUserCreated = await UserModel.create(newUser)

    if (newUserCreated){

        let mailData = {
            to: newUserCreated.email,
            from: 'treatmemailer@gmail.com',
            template: 'user-verification',
            subject: `Treatme account verification for ${newUserCreated.username}`,
            context: {
                url: `${config.client}/verify?token=${tokenForUser(newUserCreated)}`,
                name: newUserCreated.username
            }
        }
        if (await smtpTransport.sendMail(mailData)){
            return {username:newUserCreated.username,token:tokenForUser(newUserCreated)}
        }
    }
    
    throw({message:'Error occured'})
}