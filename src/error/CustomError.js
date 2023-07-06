/*export default class CustomError {
  static createCustomError({ name, cause, message }) {
    console.log("name:", name)
    console.log("cause:", cause)
    console.log("message:", message)
    const newError = new Error(message,{cause})
    newError.name = name
    throw newError
  }
}*/

export const CustomError = (name, cause, message, code, description) => {
    let newError = new Error(message + " " + description,{cause})
    newError.name = name
    newError.Number = code
    throw newError
}
export default CustomError
