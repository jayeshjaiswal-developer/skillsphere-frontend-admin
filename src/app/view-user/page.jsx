import React from 'react'
import { OverallLayout } from '../common/MainLayout'

export default function page() {

  return (
    <div>
        <OverallLayout sectiontitle="View User">
        <table className='w-[100%] text-center align-items-start'>
            <thead>
              <tr>
                <th className='w-[40px]'>S.no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Enrollments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

            
              <tr className='border-t-2 border-black '>
                <th className='w-[40px]'>1</th>
                <td>Jayesh Jaiswal</td>
                <td>jayeshjaiswal546@gmail.com</td>
                <td>NA</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                    <button className='w-[100px] py-[5px] bg-green-500 my-[5px] text-white'>View/Edit</button>
                    <button className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>

              <tr className='border-t-2 border-black '>
                <th className='w-[40px]'>1</th>
                <td>Jayesh Jaiswal</td>
                <td>jayeshjaiswal546@gmail.com</td>
                <td>NA</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                    <button className='w-[100px] py-[5px] bg-green-500 my-[5px] text-white'>View/Edit</button>
                    <button className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>

              <tr className='border-t-2 border-black '>
                <th className='w-[40px]'>1</th>
                <td>Jayesh Jaiswal</td>
                <td>jayeshjaiswal546@gmail.com</td>
                <td>NA</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                    <button className='w-[100px] py-[5px] bg-green-500 my-[5px] text-white'>View/Edit</button>
                    <button className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>

              <tr className='border-t-2 border-black '>
                <th className='w-[40px]'>1</th>
                <td>Jayesh Jaiswal</td>
                <td>jayeshjaiswal546@gmail.com</td>
                <td>NA</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                    <button className='w-[100px] py-[5px] bg-green-500 my-[5px] text-white'>View/Edit</button>
                    <button className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>

              <tr className='border-t-2 border-black '>
                <th className='w-[40px]'>1</th>
                <td>Jayesh Jaiswal</td>
                <td>jayeshjaiswal546@gmail.com</td>
                <td>NA</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                    <button className='w-[100px] py-[5px] bg-green-500 my-[5px] text-white'>View/Edit</button>
                    <button className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>

              <tr className='border-t-2 border-black '>
                <th className='w-[40px]'>1</th>
                <td>Jayesh Jaiswal</td>
                <td>jayeshjaiswal546@gmail.com</td>
                <td>NA</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                    <button className='w-[100px] py-[5px] bg-green-500 my-[5px] text-white'>View/Edit</button>
                    <button className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>
           
              
            </tbody>
          </table>
        </OverallLayout>
    </div>
  )
}
