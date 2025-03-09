import{api} from 'src/boot/axios'
import type { frontface } from 'src/Interfaces/ExamInter'

export function ShowL(){
    return api.get('/ShowL')
}

export function craeteS(data:frontface){
    delete data.id
    return api.post('/craeteS', data)
}

export function updateS(data:frontface){
    const id = data.id
    delete data.id
    return api.put(`/updateS/${id}`, data)
}

export function deleteS(id:number){
    
    return api.delete(`/deleteS/${id}`)
}