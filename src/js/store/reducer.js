import C from '../constants'

export const editable = (state = false, action) => {
  switch (action.type) {
    case C.CHANGE_EDITABLE:
      return !state
    default:
      return state
  }
}

export const data = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}