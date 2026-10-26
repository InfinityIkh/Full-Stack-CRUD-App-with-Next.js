import { api_v1 } from "../axios"

export const userApi = {
    getUsers  : () => api_v1.get("/users"),
    getUser : (id: number) => api_v1.get(`/users/${id}`),
    createUser : (data : { username : string ,email : string }) => api_v1.post("/users",data),
    updateUser : (id : number ,data : { username? : string ,email? : string }) => api_v1.put(`/users/${id}`,data),
    deleteUser : (id : number) => api_v1.delete(`/users/${id}`),
}