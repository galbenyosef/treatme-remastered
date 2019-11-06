import { login as _login } from "./login_service";


export const login = (req, res, next) => {
  _login(req.body.username, req.body.password)
    .then(response => res.status(200).send(response) )
    .catch(err => {
      console.log(err)
      res.status(401).send(err)})
}