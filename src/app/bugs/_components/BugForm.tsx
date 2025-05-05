'use client';
import ErrorMessage from '@/components/ErrorMessage';
import Config from '@/lib/config';
import { bugSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bug } from '@prisma/client';
import { Button, Spinner, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import 'easymde/dist/easymde.min.css';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface Inputs {
  title: string;
  description: string;
}

export default function BugForm({ bug }: { bug?: Bug }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({ resolver: zodResolver(bugSchema), defaultValues: bug });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (bug) {
        await axios.patch(
          `${Config.API_URL}/bugs/${bug.id}`,
          JSON.stringify(data)
        );
      } else {
        await axios.post(`${Config.API_URL}/bugss`, JSON.stringify(data));
      }
      toast.success(`Bug successfuly ${bug ? 'updated' : 'created'}.`);
    } catch {
      toast.error('An unexpected error occured.');
    } finally {
      router.push('/bugs');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-full'>
      <div className='flex flex-col gap-y-4 mb-5'>
        <label>
          <Text as='div' size='2' mb='1' weight='bold'>
            Title
          </Text>
          <TextField.Root placeholder='Your bug title' {...register('title')} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </label>
        <label>
          <Text as='div' size='2' mb='1' weight='bold'>
            Description
          </Text>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </label>
      </div>

      <Button disabled={isSubmitting}>
        {bug ? 'Update bug' : 'Create a new bug'}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
}
