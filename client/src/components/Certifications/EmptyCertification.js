import { randomNum } from "../Utilities/randomNum";

export const emptyCertification = () => {
  return {
    id:randomNum(),
    institute:'',
    degree:'',
    degreeName:'',
    start:'',
    end:'',
    comment:''
  }
}