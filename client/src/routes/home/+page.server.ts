import { type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types.js';

export async function load({cookies}){
    const authorized=cookies.get('token');
    if(authorized){
        const response = await fetch('http://localhost:3000/note',{
            method:'GET',
            headers:{ "Authorization": `Bearer ${authorized}` },
            credentials:"include"
        })
        const data= await response.json()
        return {authorized: authorized, notes: data.notes}
    } else{
        return {authorized: authorized}
    }
}
export const actions={
    create: async({cookies,request,fetch})=>{
        const form = await request.formData();
        const title = form.get('note-title');
        const desc = form.get('note-desc');
        const authorized=cookies.get('token');
        if(title===''||title===null){
            return fail(422,{error:'Note title cannot blank'})
        }
        const response=await fetch('http://localhost:3000/note',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authorized}`,
            },
            body:JSON.stringify({noteTitle:title,noteDesc:desc}),
            credentials:"include"
        })
        const data=await response.json()
        if(data.noteTitle){
            return {action:'create',note:data}
        } else {
            return fail(422,{error:'Wrong Input'})
        }
    },
}