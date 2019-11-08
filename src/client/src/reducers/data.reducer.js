const initialState = {
  titles: [],
  specialitiesView: [],
  specialities: [],
  specialitiesTree: [],
  mainSpecialities: [],
  languages: [],
  degrees: [],
  hmos: []
}

export function data(state = initialState, action) {
  const {type} = action
  switch (type){
    case 'SET_DATA_TITLES':{
      const {titles} = action
      return {...state,titles}
    }
    case 'SET_DATA_MAINSPECIALITIES':{
      const {mainSpecialities} = action
      return {...state,mainSpecialities}
    }
    case 'SET_DATA_SPECIALITIES':{
      const {specialities} = action
      return {...state,specialities}
    }
    case 'SET_VIEW_DATA_SPECIALITIES':{
      const {specialities} = action
      return {...state,specialitiesView:specialities}
    }
/*     case 'ADD_DATA_SPECIALITIESTREE':{
      const {speciality} = action
      const {specialitiesTree : oldSpecialitiesTree} = state
      let specialitiesTree = [...oldSpecialitiesTree]
      specialitiesTree.push({id:speciality.id,text:speciality.value,new:speciality.new})
      return {...state,specialitiesTree}
    } */
    case 'SET_DATA_SPECIALITIESTREE':{
      const {specialitiesTree} = action
      return {...state,specialitiesTree}
    }
    case 'SET_DATA_LANGUAGES':{
      const {languages} = action
      return {...state,languages}
    }
    case 'SET_DATA_HMOS':{
      const {hmos} = action
      return {...state,hmos}
    }
    case 'SET_DATA_DEGREES':{
      const {degrees} = action
      return {...state,degrees}
    }
    default:
      return state
  }
}