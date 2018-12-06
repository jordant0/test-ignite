import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reset: null,
  addAnimal: ['name'],
  updateAnimal: ['id', 'newName'],
  removeAnimal: ['id']
})

export const DatabaseTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  animals: {
    0: {
      id: 0,
      name: 'Test'
    }
  },
  nextAnimalId: 1,
  test: 'Test text'
})

/* ------------- Selectors ------------- */

export const DatabaseSelectors = {
  getAnimals: state => state.animals
}

/* ------------- Reducers ------------- */

// Add a new animal
export const performReset = (state) => {
  return Object.assign({}, INITIAL_STATE)
}

// Add a new animal
export const performAddAnimal = (state, { name }) => {
  let newAnimals = Object.assign({}, state.animals),
      id = state.nextAnimalId

  newAnimals[id] = { id: id, name: name }

  return {
    ...state,
    nextAnimalId: id + 1,
    animals: newAnimals
  }
}

// Update animal
export const performUpdateAnimal = (state, { id, newName }) => {
  let newAnimals = Object.assign({}, state.animals)
  state.animals[id] = { id: id, name: newName }
  return {
    ...state,
    animals: newAnimals
  }
}

// Remove animal
export const performRemoveAnimal = (state, { id }) => {
  let newAnimals = Object.assign({}, state.animals)
  delete newAnimals[id]
  return {
    ...state,
    animals: newAnimals
  }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: performReset,
  [Types.ADD_ANIMAL]: performAddAnimal,
  [Types.UPDATE_ANIMAL]: performUpdateAnimal,
  [Types.REMOVE_ANIMAL]: performRemoveAnimal,
})
