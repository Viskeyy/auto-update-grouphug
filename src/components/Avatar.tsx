import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '../vite-env';

const Mask = () => <span className='absolute left-0 top-0 h-full w-full rounded-full bg-white opacity-75' />;
export const CustomAvatar = ({ user }: { user: User }) => {
    return (
        <div className='mx-1'>
            <div className='relative mx-auto h-9 w-9 overflow-hidden rounded-full' style={{ backgroundColor: user.color }}>
                <Avatar className='flex h-full w-full items-center justify-center'>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {!user.visibility && <Mask />}
            </div>
            <div className='text-xs' style={{ color: user.color }}>
                {user.name}
            </div>
        </div>
    );
};
