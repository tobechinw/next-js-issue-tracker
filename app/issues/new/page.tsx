'use client'
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const router = useRouter();
    const [error, setError] = useState('')

  return (
    <div className='max-w-xl'>
        {error && <ErrorMessage error={error} />}
        <form  
            className='space-y-3' 
            onSubmit={handleSubmit(async (data) => {
                try{
                    await axios.post('/api/issues', data);
                    router.push('/issues');   
                }catch (error) {
                    setError('An unexpected error occured')
                }
            })}
        >
            <TextField.Root >
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            { errors.title && <ErrorMessage error={errors.title.message!} />}
            <Controller 
                name='description'
                control={control}
                render={( { field } ) => <SimpleMDE placeholder='Description' {...field} />}
            />
            { errors.description && <ErrorMessage error={errors.description.message!} />}
            <Button>Submit New Issue</Button>
        </form>
    </div>
  )
}

export default NewIssuePage