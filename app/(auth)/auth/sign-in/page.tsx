import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/features/auth/components/signin-form-client'


const SignInPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
    <Image src={"/logo.svg"} alt="logo" width={300} height={200} />
    <SignInFormClient />
    </div>
  )
}

export default SignInPage