export const getObjectName = (container,object,language) => {


  if (!object || !object._id || !container || !language)
    return

  if (object.name){
    return object.name
  }
  for (let i=0;i<container.length;i++){
    if (container[i]._id === object._id){
      return container[i][language]
    }
  }
}

export const getParents = (data,_id) => {

  let retval = []

  const recursive = (_id) => {
      const value = data.find(val => val._id === _id)
      if (!value)
          return
      for (let i=0; i< value.parents.length;i++){
          const parentId = value.parents[i]
          const parent = data.find(val => val._id === parentId)
          if (parent && !retval.some(parent => parent._id === parentId)){
              retval.push(parent)
              recursive(parentId)
          }
      }
  }
  
  recursive(_id)

  return retval
}

export const getChildren = (data,_id) => {

  let retval = []
  if (!data)
    return

  const recursive = (_id) => {
      const children = data.filter(val => val.parents.some(parent => parent === _id))
      for (let i=0;i<children.length;i++){
          const child = children[i]
          if (!retval.includes(child)){
              retval.push(child)
          }
          recursive(child._id)
      }
  }

  recursive(_id)

  return retval
  
      
}