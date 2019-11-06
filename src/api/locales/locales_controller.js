import { 
  getAll as _getAll,
  getById as _getById,
  putById as _putById,
  post as _post,
  deleteById as _deleteById,
  deleteManyById as _deleteManyById
} from "./locales_service";
import { parseFilterSort } from "../../parseFilterSort";


export const getAll = (req, res, next) => {

  const params = {...parseFilterSort(req)}

  _getAll(params)
  .then(response => {
    res.header("Access-Control-Expose-Headers","content-range")
    res.header("content-range",'50')
    res.status(200).send(response)
  })
  .catch(err => {console.log(err)})

}

export const getById = (req, res, next) => {

  _getById(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {console.log(err)})
}


export const putById = (req, res, next) => {
  _putById(req.body)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {console.log(err)})
}

export const post = (req, res, next) => {

  _post(req.body)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {console.log(err)})
}

export const deleteById = (req, res, next) => {

  _deleteById(req.params.id)
  .then(response => {
    res.status(200).send(response)
  })
  .catch(err => {console.log(err)})

}

export const deleteManyById = (req, res, next) => {

  const ids = JSON.parse(req.query.filter) && JSON.parse(req.query.filter).id || []
  _deleteManyById(ids)
  .then(response => {
    res.status(200).send(ids)
  })
  .catch(err => {console.log(err)})

}