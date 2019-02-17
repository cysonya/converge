import { createBrowserHistory } from "history"
import { createStore, compose, applyMiddleware } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
// import "regenerator-runtime/runtime"
import createSagaMiddleware from "redux-saga"
import createRootReducer from "./reducers"
import rootSaga from "./sagas"

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware({
  onError: e => {
    console.log(e)
  }
})

let storeOut = null
storeOut = createStore(
  createRootReducer(history), // root reducer with router state
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      sagaMiddleware
    )
  )
)

export const store = storeOut

sagaMiddleware.run(rootSaga)
