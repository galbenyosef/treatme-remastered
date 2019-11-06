import { LocalesModel } from "./locales_model";

export const getAll = async ({sort,filter}) => {

  return await LocalesModel.find(filter).sort(sort)

}

export const getById = async (id) => {

  return await LocalesModel.findById(id)

}

export const deleteById = async (_id) => {

  return await LocalesModel.findByIdAndDelete(_id)

}
export const deleteManyById = async (ids) => {

  return await LocalesModel.deleteMany({_id: { $in: ids}})
 
}


export const putById = async (body) => {

  return await LocalesModel.findByIdAndUpdate(body._id,body)

}

export const post = async (body) => {

  return await LocalesModel.create(new LocalesModel(body))

}


