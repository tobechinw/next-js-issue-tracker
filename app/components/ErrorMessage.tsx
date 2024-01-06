import { Callout } from '@radix-ui/themes'
import React from 'react'

interface Props{
    error: string;
}

const ErrorMessage = ({ error }: Props) => {
  return (
    <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
    </Callout.Root>
  )
}

export default ErrorMessage