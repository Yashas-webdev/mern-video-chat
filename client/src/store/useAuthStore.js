import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            error: null,

            resister: async(username, email, password) => {
                set({isLoading: true, error: null});
                try{
                    const {data} = await axios.post('/api/auth/register',{
                        username,
                        email,
                        password
                    });
                    set({user:data, token: data.token, isLoading: false});
                }catch(error){
                    set({error: error.response?.data?.message, isLoading:false});
                }
            },

            login: async(email,password) => {
                set({isLoading: true, error:null});
                try{
                    const {data} = await axios.post('/api/auth/login',{
                        email,
                        password
                    });
                    set({user:data, token: data.token, isLoading: false});
               
                }catch(error){
                    set({error:error.response?.data?.message, isLoading: false});
                }
            },

            logout: () =>{
                set({user: null, token: null, error: null});
            },
            clearError: () => set({error: null}),
        }),
        {
            name: 'auth-storage'
        }
    )
)