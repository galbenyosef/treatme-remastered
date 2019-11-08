export const doArraysEqual = (A,B) =>{
  if ((!A && !B) || (A.length === B.length === 0))
    return true
  if (!A || !B)
    return false
  if (A.length !== B.length)
    return false
  
  return A.every( e => B.includes(e) )
}