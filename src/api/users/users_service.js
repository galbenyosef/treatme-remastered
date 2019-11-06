import { UserModel } from "./user_model";

export const getAll = async ({sort,filter}) => {

  return await UserModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await UserModel.findById(id)
 
}

export const deleteById = async (_id) => {

  return await UserModel.findByIdAndDelete(_id)

}

export const deleteManyById = async (ids) => {

  return await UserModel.deleteMany({_id: { $in: ids}})
 
}

export const putById = async (body) => {

  return await UserModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await UserModel.create(new UserModel(req.body))

}
