const getAll = () => {
  return 'getAll'
}

const addOne = () => {
  return 'addOne'
}

const updateOne = () => {
  return 'updateOne'
}

const delete_ = () => {
  return 'delete'
}

export default {
  getAll,
  addOne,
  updateOne,
  delete: delete_,
} as const;