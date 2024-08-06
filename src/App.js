import React, { useReducer } from 'react';
import DigitButton from './DigitButton';
import OpButton from './OpButton';
import ClearButton from './ClearButton';
import EvalButton from './EvalButton';
import DelButton from './DelButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OP: 'choose-op',
  CLEAR: 'clear',
  EVAL: 'eval'
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currOp: payload.digit
        }
      }

      if (payload.digit === "." && typeof state.currOp === `undefined`)
        return {
          ...state,
          currOp: `0${payload.digit}`
        }

      if (payload.digit === "." && state.currOp.includes(".")) {
        return state
      }

      return {
        ...state,
        currOp: `${state.currOp || ""}${payload.digit}`
      }

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currOp: null
        }
      }

      if (state.currOp == null) {
        return state
      }

      if (state.currOp.length === 1) {
        return {
          ...state,
          currOp: null
        }
      }

      return {
        ...state,
        currOp: state.currOp.slice(0, -1)
      }

    case ACTIONS.CHOOSE_OP:
      if (state.currOp == null && state.prevOp == null) {
        return state
      }

      if (state.currOp == ".") {
        return state
      }

      if (state.prevOp == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOp: state.currOp,
          currOp: null
        }
      }

      if (state.currOp == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      return {
        ...state,
        operation: payload.operation,
        prevOp: evaluate(state),
        currOp: null
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.EVAL:
      if (state.operation == null || state.prevOp == null || state.currOp == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        operation: null,
        prevOp: null,
        currOp: evaluate(state)
      }
  }
}

function evaluate({ currOp, prevOp, operation }) {
  const prev = parseFloat(prevOp)
  const curr = parseFloat(currOp)
  if (isNaN(prev) || isNaN(curr)) return ""
  let comp = ""
  switch (operation) {
    case "+":
      comp = prev + curr
      break
    case "-":
      comp = prev - curr
      break
    case "*":
      comp = prev * curr
      break
    case "/":
      comp = prev / curr
      break
  }
  return comp.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0
  })

function formatOp(op) {
  if (op == null) return
  const [integer, decimal] = op.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currOp, prevOp, operation }, dispatch] = useReducer(reducer, {})

  return (
    <body className='bg-slate-400 min-h-screen p-8'>
        <div className="bg-slate-600 w-fit mx-auto p-4 rounded border-2 border-white grid grid-cols-4 grid-rows-[minmax(5.5rem,auto)]">
          <div className='flex flex-col items-end justify-around break-words break all bg-gray-100 appearance-none rounded-t w-full py-3 px-3 leading-tight col-span-full'>
            <div id='prev-op' className="text-sm text-gray-600">
              {formatOp(prevOp)} {operation}
            </div>
            <div id='curr-op' className="text-2xl text-gray-900">
              {formatOp(currOp)}
            </div>
          </div>
          <ClearButton className="col-span-2" digit="AC" dispatch={dispatch} />
          <DelButton digit="DEL" dispatch={dispatch} />
          <OpButton operation="/" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OpButton operation="*" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OpButton operation="-" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OpButton operation="+" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <EvalButton className="col-span-2" dispatch={dispatch} />
        </div>
    </body>    
  );
}

export default App;
