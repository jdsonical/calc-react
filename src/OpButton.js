import { ACTIONS } from "./App"
import { ButtonStyle } from "./DigitButton"

export default function OpButton({ dispatch, operation, className = "" }) {
  return (
    <button className={`${ButtonStyle} ${className}`} onClick={() => { dispatch({ type: ACTIONS.CHOOSE_OP, payload: { operation } })}}>
      {operation}
    </button>
  )
}