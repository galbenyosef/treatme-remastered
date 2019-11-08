export const emptyLocation = () => { 
  return {
    streetname:'',
    streetnumber: '',
    postcode: '',
    name: '',
    position: '',
    accessibility: Boolean,
    city: '',
    country: '',
    mobile: '',
    email: '',
    daily_operations: {
      sunday:[],
      monday:[],
      tuesday:[],
      wednesday:[],
      thursday:[],
      friday:[],
      saturday:[],
    },
    comment: ''
  }
}