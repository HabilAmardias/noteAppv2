import { API_BASE_URL } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export async function load({cookies,params,fetch}){
    const authorized=cookies.get('token');
    if(authorized){
        const response = await fetch(`${API_BASE_URL}/note/${params.slug}`,{
            method:'GET',
            headers:{"Authorization": `Bearer ${authorized}`},
            credentials:'include'
        })
        const data = await response.json()
        return {authorized:authorized, note:data}
    } else {
        return{authorized:authorized}
    }
}

export const actions:Actions={
    delete:async({cookies,request,fetch})=>{
        const form = await request.formData()
        const noteId=form.get('note-id')
        const authorized=cookies.get('token')
        const response = await fetch(`${API_BASE_URL}/note/${noteId}`,{
            method:'DELETE',
            headers:{"Authorization": `Bearer ${authorized}`},
            credentials:'include'
        })
        const data = await response.json()
        if(data.noteTitle){
            throw redirect(303,'/home')
        } else {
            return fail(401,{error:'Not Authorized'})
        }
    },
    edit:async({cookies,request,fetch,params})=>{
        const form = await request.formData()
        const title = form.get('note-title')
        const desc = form.get('note-desc')
        const noteId=params.slug
        const authorized = cookies.get('token')
        const response = await fetch(`${API_BASE_URL}/note/${noteId}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${authorized}`,
            },
            body:JSON.stringify({noteTitle:title,noteDesc:desc}),
            credentials:'include'
        })
        const data = await response.json()
        if(data.noteTitle){
            return {action:'edit',note:data}
        } else {
            return fail(422,{error:'Wrong Input'})
        }
    }
}