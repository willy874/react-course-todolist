export const getLocalStorage = (key) => {
  return Promise.resolve(JSON.parse(localStorage.getItem(key)) || []);
}

export const setLocalStorage = (key, value) => {
  return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
}

export const addLocalStorage = async (key, value) => {
  const data = await getLocalStorage(key)
  const newData = [...data, value]
  return Promise.resolve(setLocalStorage(key, newData))
}

export const updateLocalStorage = async (key, id, value) => {
  const data = await getLocalStorage(key)
  const newData = data.map((item) => item.id === id ? { ...item, ...value } : item)
  return Promise.resolve(setLocalStorage(key, newData))
}

export const removeLocalStorage = async (key, id) => {
  const data = await getLocalStorage(key)
  const newData = data.filter((item) => item.id !== id)
  return Promise.resolve(setLocalStorage(key, newData))
}

/**
 *
 * @param {Set<string>} state
 * @param {{ type: 'add', payload: string } |
* { type: 'delete', payload: string } |
* { type: 'clear' }} action
*/
export const queueReducer = (state, action) => {
 switch (action.type) {
   case "add":
     return new Set([...state, action.payload]);
   case "delete":
     state.delete(action.payload);
     return new Set([...state]);
   case "clear":
     return new Set();
   default:
     return state;
 }
};