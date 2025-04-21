'use client';

import { Button, Dialog, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Config from '@/lib/config';

export default function BugDeleteButton({ bugId }: { bugId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(`${Config.API_URL}/bugs/${bugId}`);
    router.push('/bugs');
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color='red'>Delete Bug</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Delete Confirmation</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this bug? This action is undone.
        </Dialog.Description>

        <Flex mt='5' gapX='4'>
          <Dialog.Close>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color='red' onClick={handleDelete}>
              Delete Bug
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
