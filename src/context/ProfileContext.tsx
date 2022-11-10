import React,{ createContext, useState } from "react";
import useProfile, { Data } from '../hooks/useProfile';


interface ContextProps {
    data:Data
    photo:string
    location:{
        longitud: number,
        latitud:number
    }
    setData: (data: Data) => void
    setPhoto: (photo: string) => void
}

export const ProfileContext= createContext({} as ContextProps)

export const ProfileProvider = ({children}:any) =>{

    const {data,photo,location,setData,setPhoto} = useProfile()

    return (
        <ProfileContext.Provider value={{data,photo,location,setData,setPhoto}}>
            {children}
        </ProfileContext.Provider>
    )
}