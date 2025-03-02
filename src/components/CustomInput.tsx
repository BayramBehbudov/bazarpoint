'use client'
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { User, Phone, Eye, EyeOff } from 'lucide-react'
import { ILogin } from '@/interfaces/types'


interface CustomInputProps {
   name: 'phone' | 'password'
   placeholder: string
   error: string | undefined
   register: UseFormRegister<ILogin>
}

const CustomInput = ({ name, placeholder, error, register }: CustomInputProps) => {
   const [show, setShow] = useState(name === 'password' ? true : false)

   return (
      <div>
         <div
            style={{
               display: 'flex',
               alignItems: 'center',
               flexDirection: 'row',
               border: `1px solid ${error ? '#f56565' : '#e2e8f0'}`,
               borderRadius: '8px',
               padding: '12px',
               position: 'relative',
            }}
         >
            {name === 'phone' && <Phone size={20} color="#1A1A1A" style={{ marginRight: '12px' }} />}
            {name === 'password' && <User size={20} color="#1A1A1A" style={{ marginRight: '12px' }} />}
            <input
               type={show ? 'password' : 'text'}
               {...register(name)}
               placeholder={placeholder}
               style={{
                  width: '100%',
                  paddingRight: name === 'password' ? '40px' : '10px',
                  outline: 'none',
               }}
               autoComplete="off"
            />
            {name === 'password' && (
               <div
                  style={{
                     position: 'absolute',
                     right: '12px',
                     top: '50%',
                     zIndex: '10',
                     transform: 'translateY(-50%)',
                     cursor: 'pointer',
                  }}
                  onClick={() => setShow(!show)}
               >
                  {show ? <EyeOff size={20} color="#1A1A1A" /> : <Eye size={20} color="#1A1A1A" />}
               </div>
            )}
         </div>
         {error && <p style={{ color: '#f56565', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
      </div>
   )
}

export default CustomInput
