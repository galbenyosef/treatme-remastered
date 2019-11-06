import { register as _register } from "./register_service";


export const register = (req, res, next) => {
  const user = req.body
  const localeId = req.query.localeId

  _register(user,localeId)
    .then(response => res.status(200).send(response) )
    .catch(err => {console.log(err) ;return res.status(403).send(err)})
}