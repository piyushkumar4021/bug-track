'use client';
import { Button, Dialog, Flex, TextField, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

export default function BugsPage() {
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Create a bug</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth='600px'>
          <Dialog.Title>Create a New Bug</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            Your changes will be kept saved even if you closed the dialog.
          </Dialog.Description>

          <Flex direction='column' gap='3'>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Title
              </Text>
              <TextField.Root placeholder='Your bug title' />
            </label>
            <label>
              <Text as='div' size='2' mb='1' weight='bold'>
                Description
              </Text>
              <SimpleMDE
                placeholder='Your bug description'
                options={{ spellChecker: false }}
              />
            </label>
          </Flex>

          <Flex gap='3' mt='4' justify='end'>
            <Dialog.Close>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Create</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
