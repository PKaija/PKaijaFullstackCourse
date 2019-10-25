import axios from 'axios'

const baseURL = '/persons'

const getAll = () => {
    return axios.get(baseURL)
}
const savePerson = object => {
    return axios.post(baseURL, object)
}
const updatePerson = (object, id) => {
    return axios.put(`${baseURL}/${id}`, object)
}
const deletePerson = id => {
    return axios.delete(`${baseURL}/${id}`)
}
export default {getAll, savePerson, updatePerson, deletePerson}
