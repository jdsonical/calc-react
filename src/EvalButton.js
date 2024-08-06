import { ACTIONS } from "./App"
import { ButtonStyle } from "./DigitButton"

export default function EvalButton({ dispatch, className = "" }) {
  return (
    <button className={`${ButtonStyle} ${className}`} onClick={() => { dispatch({ type: ACTIONS.EVAL })}}>
      =
    </button>
  )
}