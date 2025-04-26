'use client';
import toast from 'react-hot-toast';
import Config from '@/lib/config';
import { Button, Dialog, Flex, Spinner } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BugDeleteButton({ bugId }: { bugId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${Config.API_URL}/bugs/${bugId}`);
      router.push('/bugs');
      router.refresh();
      toast.success('Bug successfuly deleted.');
    } catch {
      toast.error('an error occured.');
    }
    setIsDeleting(false);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color='red' disabled={isDeleting}>
          Delete Bug
          {isDeleting && <Spinner />}
        </Button>
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
