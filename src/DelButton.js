import { ACTIONS } from "./App"
import { ButtonStyle } from "./DigitButton"

export default function DelButton({ dispatch, className = "" }) {
  return (
    <button className={`${ButtonStyle} ${className}`} onClick={() => { dispatch({ type: ACTIONS.DELETE_DIGIT })}}>
      DEL
    </button>
  )
}