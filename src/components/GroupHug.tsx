import type { User } from '../vite-env';
import { Avatar } from './Avatar';

export const GroupHug = ({ users, self }: { users: User[]; self: User }) => {
    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Avatar user={self} />

            {users.map((user) => (
                <div key={user.id}>
                    {user.name}
                    <Avatar user={user} />
                </div>
            ))}
        </div>
    );
};
