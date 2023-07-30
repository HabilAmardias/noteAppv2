import { fail, type Actions, redirect } from "@sveltejs/kit";


export const actions = {
    register: async({cookies, request, fetch})=>{
        const form=await request.formData();
        const username=form.get('username');
        const password=form.get('password');
        const response = await fetch('http://localhost:3000/auth/signup',{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({username:username,password:password})
        })
        const data = await response.json()
        if(data.token){
            cookies.set('token',data.token,{path: '/'})
            throw redirect(303,'/home')
        } else{
            return fail(422,{error:'Wrong Credentials'})
        }
        
    },
    login: async({cookies,request, fetch})=>{
        const form = await request.formData()
        const username=form.get('username');
        const password=form.get('password');
        const response = await fetch('http://localhost:3000/auth/signin',{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:JSON.stringify({username:username,password:password})
        })
        const data = await response.json()
        if(data.token){
            cookies.set('token',data.token,{path: '/'})
            throw redirect(303,'/home')
        } else{
            return fail(422,{error:'Wrong Credentials'})
        }
    }
}