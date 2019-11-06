import { LanguageModel } from "./languages_model";

export const getAll = async ({sort,filter}) => {

  return await LanguageModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await LanguageModel.findById(id)

}

export const deleteById = async (_id) => {

  return await LanguageModel.findByIdAndDelete(_id)

}

export const deleteManyById = async (ids) => {

  return await LanguageModel.deleteMany({_id: { $in: ids}})
 
}

export const putById = async (body) => {

  return await LanguageModel.findByIdAndUpdate(body._id,body)

}

export const post = async (req) => {

  return await LanguageModel.create(new LanguageModel(req.body))

}
