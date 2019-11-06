let nextIndex = 0;
export const addElement = (url, code) => ({
    type: 'ADD_ELEMENT',
    id: nextIndex++,
    url: url,
    code: code,
})

export const deleteElement = id => ({
    type: 'DEL_ELEMENT',
    id: id
})

export const getAll = () => ({
    type: 'GET_ALL'
})