import { ACTIONS } from "./App"
import { ButtonStyle } from "./DigitButton"

export default function ClearButton({ dispatch, className = "" }) {
  return (
    <button className={`${ButtonStyle} ${className}`} onClick={() => { dispatch({ type: ACTIONS.CLEAR })}}>
      AC
    </button>
  )
}