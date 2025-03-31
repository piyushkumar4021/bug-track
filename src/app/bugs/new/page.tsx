'use client';
import { TextField, Text, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { FormEvent, useState } from 'react';
import { bugSchema } from '../../../schemas';
import axios from 'axios';
import ErrorMessage from '../../../components/ErrorMessage';

const initialData = {
  title: '',
  description: '',
};

interface ErrorType {
  title?: string;
  description?: string;
}

export default function CreateBugPage() {
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

    await axios.post('http://localhost:3000/api/bugs', JSON.stringify(data));
    setData(initialData);
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <Button>Create</Button>
    </form>
  );
}
