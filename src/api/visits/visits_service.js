import { VisitModel } from "./visits_model";

export const getAll = async ({sort,filter}) => {

  return await VisitModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await VisitModel.findById(id)

}

export const deleteById = async (_id) => {

  return await VisitModel.findByIdAndDelete(_id)

}


export const deleteManyById = async (ids) => {

  return await CustomSpecialityModel.deleteMany({_id: { $in: ids}})
 
}

export const putById = async (body) => {

  return await VisitModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await VisitModel.create(new VisitModel({...req.body,by:req.user.username}))

}
