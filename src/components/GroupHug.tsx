import type { User } from '../vite-env';
import { CustomAvatar } from './Avatar';

export const GroupHug = ({ users, self }: { users: User[]; self: User }) => {
    return (
        <div className='flex'>
            <CustomAvatar user={self} />
            {users.map((user) => (
                <div key={user.id}>
                    <CustomAvatar user={user} />
                </div>
            ))}
        </div>
    );
};
