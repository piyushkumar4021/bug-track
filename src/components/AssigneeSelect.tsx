import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const AssigneeSelect = ({ users }: { users: User[] }) => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
