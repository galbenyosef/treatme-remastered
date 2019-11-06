import { TitleModel } from "./titles_model";

export const getAll = async ({sort,filter}) => {

  return await TitleModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await TitleModel.findById(id)

}

export const deleteById = async (_id) => {

  return await TitleModel.findByIdAndRemove({_id})

}

export const deleteManyById = async (ids) => {

  return await TitleModel.deleteMany({_id: { $in: ids}})

}

export const putById = async (body) => {

  return await TitleModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await TitleModel.create(new TitleModel(req.body))

}
