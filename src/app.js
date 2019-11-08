import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import path from 'path'
import bodyParser from 'body-parser'
import { jwtLogin } from '../src/passport';
import { config } from './config';
import { specialitiesRouter } from '../src/api/specialities/specialities_routes'
import { loginRouter } from '../src/api/login/login_routes';
import { localesRouter } from '../src/api/locales/locales_routes';
import { titlesRouter } from '../src/api/titles/titles_routes';
import { usersRouter } from '../src/api/users/users_routes';
import { visitsRouter } from '../src/api/visits/visits_routes';
import { hmosRouter } from '../src/api/hmos/hmos_routes';
import { degreesRouter } from '../src/api/degrees/degrees_routes';
import { languagesRouter } from '../src/api/languages/languages_routes';
import { translationsRouter } from '../src/api/translations/translations_routes';
import { adminRouter } from '../src/api/admins/admins_routes';
import { dataRouter } from '../src/api/data/data';
import { registerRouter } from '../src/api/register/register_routes';
import { LocalesModel } from './api/locales/locales_model';
import { UserModel } from './api/users/user_model'
import { AdminModel } from './api/admins/admin_model'

mongoose.connect(config.connectionString,{ useUnifiedTopology:true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, autoReconnect:true, reconnectTries:Number.MAX_VALUE, reconnectInterval:10000 })
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise
let db = mongoose.connection
const app = express()


db.on('connected', async () => {

  app.use(logger('dev'))
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.use(express.static(path.join(__dirname, '/images')))
  app.use(express.static(path.join(__dirname, '/public')))
  app.use(passport.initialize())
  app.use(cors())

  let locales = [
    {
      _id:1,
      name: 'עברית',
      symbol: 'he',
      direction: 'rtl'
    },
    {
      _id:2,
      name: 'English',
      symbol: 'en',
      direction: 'ltr'
    },
    {
      _id:3,
      name: 'Pусский',
      symbol: 'ru',
      direction: 'ltr'
    },
    {
      _id:4,
      name: 'عربيه',
      symbol: 'ar',
      direction: 'rtl'
    }
  ]
/*   try{
    LocalesModel.insertMany(locales)
  }
  catch(e){
    console.log('locales exists')
  } */

  //admin api
  app.use('/titles', titlesRouter);
  app.use('/specialities', specialitiesRouter);
  app.use('/users', usersRouter)
  app.use('/locales', localesRouter);
  app.use('/login', loginRouter);
  app.use('/register', registerRouter);
  app.use('/admins', adminRouter);
  app.use('/visits', visitsRouter);
  app.use('/degrees', degreesRouter);
  app.use('/hmos', hmosRouter);
  app.use('/languages', languagesRouter);
  app.use('/translations', translationsRouter);
  //user api
  app.use('/data',dataRouter)


  passport.use(jwtLogin)

  console.log('Treatme Server running')

});

db.on('error',(err) => {
  console.log('Mongoose error: ' + err)
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected')
});

process.on('SIGINT',() => {
  db.close(() => {
      console.log('Mongoose default connection disconnected through app termination')
      process.exit(0);
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})



export default app