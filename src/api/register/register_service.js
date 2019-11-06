import { UserModel } from "../users/user_model"
import { smtpTransport } from '../data/data'
import bcrypt from 'bcryptjs'
import { config } from "../../config";
import { tokenForUser } from "../login/login_service";
import mongoose from 'mongoose'
import { SpecialityModel } from "../specialities/speciality_model";

export const register = async (newCandidate,localeId) => {

    if (!localeId)
        throw({message:`Language is missing`})

    let newUser = {
        username:newCandidate.username,
        firstname:[],
        lastname:[],
        password: '',
        mainSpeciality: [],
        mobile: newCandidate.mobile,
        email: newCandidate.email,
        vcard:[ {localeId,value:[{'url':`${process.env.NODE_ENV.trim() == 'development' ? config.devClient:config.client}/card/${newCandidate.username}`}]} ]
    }

    const emailCount = await UserModel.countDocuments({'email': newCandidate.email})
    let user = await UserModel.findOne({username: newCandidate.username})

    if (user) {
        // username already exists
        throw({message:`Username ${newCandidate.username} already exists`})
    }

    if (emailCount > 2)
        throw({message:`Mail ${newCandidate.email} already been used 3 times`})


    if (newCandidate.firstname){
        newUser.firstname.push({localeId,value:newCandidate.firstname})
    }
    else{
        throw({message:`Firstname is missing`})
    }


    if (newCandidate.lastname){
        newUser.lastname.push({localeId,value:newCandidate.lastname})
    }
    else{
        throw({message:`Lastname is missing`})
    }
      
    // add hashed password to user object
    newUser.password = await bcrypt.hash(newCandidate.password,10)

    const newUserCreated = await new UserModel(newUser).save()

    if (!newCandidate.mainSpeciality.id){
        const newSpecialityObject = {
            locales: [{localeId,value:newCandidate.mainSpeciality.value}],
            by: newUserCreated._id,
            new:true,
        }
        const newSpeciality = await (new SpecialityModel(newSpecialityObject).save())
        newUserCreated.mainSpeciality = [{localeId,value:[newSpeciality._id]}]
    }
    else if (newCandidate.mainSpeciality.id && mongoose.Types.ObjectId.isValid(newCandidate.mainSpeciality.id)){
        newUserCreated.mainSpeciality = [{localeId,value:[newCandidate.mainSpeciality.id]}]
    }
    else {
        if (!newCandidate.editor)
            throw({message:`Main mainSpeciality is missing`})
    }

    await newUserCreated.save()

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
        else {
            UserModel.findByIdAndDelete(newUserCreated._id)
        }
    }
    
    throw({message:'Error occured'})
}