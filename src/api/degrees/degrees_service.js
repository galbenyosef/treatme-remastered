import { DegreeModel } from "./degrees_model";

export const getAll = async ({sort,filter}) => {

  return await DegreeModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await DegreeModel.findById(id)

}

export const deleteById = async (_id) => {

  return await DegreeModel.findByIdAndDelete(_id)

}

export const deleteManyById = async (ids) => {

  return await DegreeModel.deleteMany({_id: { $in: ids}})
 
}

export const putById = async (body) => {

  return await DegreeModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await DegreeModel.create(new DegreeModel(req.body))

}
