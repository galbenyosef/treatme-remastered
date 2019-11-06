import { HMOModel } from "./hmos_model";

export const getAll = async ({sort,filter}) => {

  return await HMOModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await HMOModel.findById(id)

}

export const deleteById = async (_id) => {

  return await HMOModel.findByIdAndDelete(_id)

}

export const deleteManyById = async (ids) => {

  return await HMOModel.deleteMany({_id: { $in: ids}})
 
}

export const putById = async (body) => {

  return await HMOModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await HMOModel.create(new HMOModel(req.body))

}
