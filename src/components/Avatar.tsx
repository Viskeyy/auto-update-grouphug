import { User } from '../vite-env';

const Mask = () => (
    <span
        style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            height: '100%',
            left: 0,
            opacity: 0.75,
            position: 'absolute',
            top: 0,
            width: '100%',
        }}
    />
);
export const Avatar = ({ user }: { user: User }) => {
    return (
        <div style={{ display: 'block', margin: '0 4px 0 4px' }}>
            <div
                style={{
                    backgroundColor: user.color,
                    borderRadius: '50%',
                    height: '36px',
                    margin: '0 auto 0 auto',
                    overflow: 'hidden',
                    position: 'relative',
                    width: '36px',
                }}
            >
                <img src={user.avatar} style={{ width: '100%', height: '100%' }} />
                {!user.visibility && <Mask />}
            </div>
            <div style={{ color: 'white', fontSize: 12 }}>{user.name}</div>
        </div>
    );
};
