export const parseFilterSort = (request) => {

  const sortRequest = request.query.sort && JSON.parse(request.query.sort)
  const filterRequest = request.query.filter && JSON.parse(request.query.filter)

  const languageRequest = request.query.language

  const isSortExists = sortRequest && Object.keys(sortRequest).length > 1
  const isFilterExists = filterRequest && Object.keys(filterRequest).length
  const isLanguageExists = languageRequest && Object.keys(languageRequest).length

  const sort = isSortExists ? (sortRequest[1] === 'ASC' ? `${sortRequest[0]}` : `-${sortRequest[0]}`) : {}
  const language = isLanguageExists ?  languageRequest : {}

  let filter = {}
  if (isFilterExists){
    if (filterRequest.id)
      filter._id = filterRequest.id
  }

  return {
      sort,filter,language
  }
}
