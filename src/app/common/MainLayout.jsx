'use client'
import React, { useContext, useState } from 'react'
import Header from './Header'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faBook, faCoffee, faPeopleGroup, faSliders, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import MainContext, { UserContext } from '../MainContext'
import LeftSideMenu from '../LeftSideMenu'

export default function MainLayout() {


    return (
        <>
            <OverallLayout sectiontitle="Welcome To Admin Panel">
                <DashboardFirstViewContent />
            </OverallLayout>
        </>
    )
}

export function OverallLayout({ children,sectiontitle }) {
    return (
        <>
            <Header />
            <div className='grid grid-cols-12 min-h-[765px]'>
                <div className='bg-[rgba(255,255,255,0.5)] col-span-2'>
                
                    <LeftSideMenu/>
                </div>
                <div className='bg-[rgba(116,86,234,0.05)] col-span-10 p-[30px] relative'>
                    {/* <DashboardFirstViewContent /> */}
                    <h1 className='text-[25px] font-bold'>{sectiontitle}</h1>
                    {children}
                    <Footer />
                </div>

            </div>

        </>

    )
}



function SummaryCard({ bgColor }) {
    // console.log(bgColor);
    return (
        <>
            <div className={`${bgColor} flex flex-col gap-[8px] grow rounded-[20px]  text-white text-[15px] p-[20px]`}>
                <h1>Today's Bookings</h1>
                <h1 className='text-[30px]'>4006</h1>
                <h1>10.00% (30 days)</h1>
            </div>
        </>
    )
}

function Footer() {
    return (
        <div className='absolute bottom-0 w-full border border-t-2 left-0 p-[20px] flex justify-around text-gray-500'>
            <h1>Copyright © 2025, <span className='text-blue-500'>Premium admin template by Jayesh.</span> All rights reserved.</h1>
            <div className='flex gap-[10px] items-center'><h2>Hand-crafted & made with</h2><Image src="/images/heart.png" alt="heartlogo" width={20} height={20} /></div>
        </div>
    )
}



function DashboardFirstViewContent({sectiontitle}) {
    return (
        <>
            <div className='flex gap-[30px]  mt-[40px]'>
                <SummaryCard bgColor="bg-[rgba(12,214,230,255)]" />
                <SummaryCard bgColor="bg-[rgba(143,177,254,255)]" />
                <SummaryCard bgColor="bg-[rgba(3,234,171,255)]" />
                <SummaryCard bgColor="bg-[rgba(249,167,93,255)]" />


            </div>
        </>
    )
}