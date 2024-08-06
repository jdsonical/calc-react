import { ACTIONS } from "./App"
export const ButtonStyle = `mx-0 my-0 px-2 py-2 bg-slate-700 rounded text-white shadow-sm shadow-gray-400 hover:bg-slate-900 focus:bg-slate-900`;

export default function DigitButton({ dispatch, digit, className = "" }) {
  return (
    <button className={`${ButtonStyle} ${className}`} onClick={() => { dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}}>
      {digit}
    </button>
  )
}