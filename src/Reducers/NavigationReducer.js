import Router from '../Router'

export default (state, action) => {
  const newState = Router.router.getStateForAction(action, state)
  return newState || state
}
