'use client';
import ErrorMessage from '@/components/ErrorMessage';
import Config from '@/lib/config';
import { bugSchema } from '@/schemas';
import { bug } from '@prisma/client';
import { Button, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface ErrorType {
  title?: string;
  description?: string;
}

export default function BugForm({ bug }: { bug?: bug }) {
  const initialData = {
    title: bug?.title || '',
    description: bug?.description || '',
  };
  const router = useRouter();

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<null | ErrorType>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = bugSchema.safeParse(data);

    if (!validation.success) {
      const newErrors = validation.error.errors.reduce(
        (obj, err) => Object.assign(obj, { [err.path[0]]: err.message }),
        {}
      );

      return setErrors(newErrors);
    }

    setErrors({});

    if (bug) {
      await axios.patch(
        `${Config.API_URL}/bugs/${bug.id}`,
        JSON.stringify(data)
      );
    } else {
      await axios.post(`${Config.API_URL}/bugs`, JSON.stringify(data));
    }

    router.push('/bugs');
    setData(initialData);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-full'>
      <div className='flex flex-col gap-y-4 mb-5'>
        <label>
          <Text as='div' size='2' mb='1' weight='bold'>
            Title
          </Text>
          <TextField.Root
            placeholder='Your bug title'
            value={data.title}
            onChange={(e) =>
              setData((prevData) => ({ ...prevData, title: e.target.value }))
            }
          />
          <ErrorMessage>{errors?.title}</ErrorMessage>
        </label>
        <label>
          <Text as='div' size='2' mb='1' weight='bold'>
            Description
          </Text>
          <SimpleMDE
            placeholder='Your bug description'
            value={data.description}
            onChange={(value) =>
              setData((prevData) => ({ ...prevData, description: value }))
            }
          />
          <ErrorMessage>{errors?.description}</ErrorMessage>
        </label>
      </div>

      <Button>{bug ? 'Update bug' : 'Create a new bug'}</Button>
    </form>
  );
}
