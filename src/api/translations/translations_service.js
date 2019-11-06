import { TranslationModel } from "./translations_model";

export const getAll = async ({sort,filter}) => {

  const list = await TranslationModel.find(filter).sort(sort)

  return list

}

export const getById = async (id) => {

  const doc = await TranslationModel.findById(id)

  return doc

}

export const deleteById = async (id) => {

  return await TranslationModel.findByIdAndDelete(id)

}

export const deleteManyById = async (ids) => {

  return await TranslationModel.deleteMany({_id: { $in: ids}})
 
}

export const putById = async (body) => {

  const doc = await getById(body._id)
  const parentId = body.parent_id

  if (!doc)
    return
  if (parentId === body._id)
    return doc
  //movement
  doc.parent_id = parentId
  doc.locales = body.locales
  return await doc.save()
}

export const post = async (req) => {

  const doc = await TranslationModel.create(new TranslationModel(req.body))
  return doc

}
