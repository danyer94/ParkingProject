const getOne = (email: string) => {
  return 'getOne'
}

const persists = (id: number) => {
  return 'persists'
}

const getAll = () => {
  return 'getAll'
}

const add = () => {
  return 'add'
}

const update = () => {
  return 'update'
}

const delete_ = (id: number) => {
  return 'delete'
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const
