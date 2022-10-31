import api from "../../axios";
const baseURL = '/api/v1'

export default {
    getAllServices: (origin, destination) => api.get(`${baseURL}/services?origin=${origin}&destination=${destination}`),
    getOneService: (id) => api.get(`${baseURL}/services?_id=${id}`),
}
