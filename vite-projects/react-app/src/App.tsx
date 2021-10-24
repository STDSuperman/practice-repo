import React, { useReducer, useContext, Dispatch } from 'react'

export type IAction = {
  type: string;
  [key: string]: any;
}

export type IContext = {
  state: typeof initialState;
  dispatch: Dispatch<IAction>;
}

const initialState = {
  color: 'red'
}

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        color: action.color
      }
    default: return state
  }
}

const rootContext = React.createContext<IContext>({
  state: {
    color: initialState.color
  },
  dispatch: () => {}
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <rootContext.Provider value={{
      state,
      dispatch
    }}>
      <ChildComponent></ChildComponent>
    </rootContext.Provider>
  )
}

const ChildComponent: React.FC<{}> = () => {
  const { dispatch, state } = useContext(rootContext);
  return (
    <div className="container">
      <div style={
        {
          width: 200,
          height: 200,
          background: state.color
        }
      }></div>
      <button onClick={
        () => dispatch({
          type: 'UPDATE',
          color: 'blue'
        })
      }>更换</button>
    </div>
  )
}

export default App
