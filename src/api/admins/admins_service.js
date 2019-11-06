import { AdminModel } from "./admin_model";

export const getAll = async ({sort,filter}) => {

  return await AdminModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await AdminModel.findById(id)

}

export const deleteById = async (_id) => {

  return await AdminModel.findByIdAndDelete(_id)

}

export const putById = async (body) => {

  return await AdminModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  if (req.body.id && !req.body._id)
    req.body._id = req.body.id
  return await AdminModel.create(new AdminModel(req.body))

}

export const deleteManyById = async (ids) => {

  return await AdminModel.deleteMany({_id: { $in: ids}})
 
}