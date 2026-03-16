"use client"
import React, { createContext } from 'react'
import { useState } from 'react';

export let UserContext = createContext();

export default function MainContext({children}) {
    let [clickedList, setClickedList] = useState('');
    let [subClickedList, setSubClickedList] = useState('');

    return (
        <>
            <UserContext.Provider value={{clickedList,setClickedList,subClickedList,setSubClickedList}}>
                {children}
            </UserContext.Provider>
        </>
    )
}
