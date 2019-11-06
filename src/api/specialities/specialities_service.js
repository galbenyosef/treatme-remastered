import { SpecialityModel } from "./speciality_model";

export const getAll = async ({sort,filter}) => {

  return await SpecialityModel.find(filter).sort(sort)

}


export const getById = async (id) => {

  return await SpecialityModel.findById(id)

}

export const deleteById = async (_id) => {

  const deleted = await SpecialityModel.findByIdAndRemove({_id})
  const newParent = deleted.parent_id || null
  await SpecialityModel.update({parent_id:_id},{parent_id:newParent})
  return deleted

}

export const putById = async (body) => {

  return await SpecialityModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await SpecialityModel.create(new SpecialityModel(req.body))

}
