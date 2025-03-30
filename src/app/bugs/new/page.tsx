'use client';
import { TextField, Text, Button, Callout } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useState } from 'react';
import { bugSchema } from '../../../schemas';
import axios from 'axios';

const initialData = {
  title: '',
  description: '',
};

export default function CreateBugPage() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<null | {
    title?: string;
    description?: string;
  }>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const validation = bugSchema.safeParse(data);

        if (!validation.success) {
          const newErrors = validation.error.errors.reduce(
            (obj, err) => Object.assign(obj, { [err.path[0]]: err.message }),
            {}
          );
          console.log(newErrors);
          return setErrors(newErrors);
        }

        setErrors({});

        await axios.post(
          'http://localhost:3000/api/bugs',
          JSON.stringify(data)
        );
        setData(initialData);
      }}
    >
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
          {errors?.title && (
            <Callout.Root color='red'>
              <Callout.Text>{errors.title}</Callout.Text>
            </Callout.Root>
          )}
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
          {errors?.description && (
            <Callout.Root color='red'>
              <Callout.Text>{errors.description}</Callout.Text>
            </Callout.Root>
          )}
        </label>
      </div>

      <Button>Create</Button>
    </form>
  );
}
