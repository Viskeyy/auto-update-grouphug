import { IChannel, createPresence } from '@yomo/presence';
import { useEffect, useState } from 'react';
import './App.css';
import { randomColor, randomName } from './helper';
import type { User } from './vite-env';
import { GroupHug } from './components/GroupHug';

// create presence instance
const id = new Date().valueOf().toString(36);
const presence = createPresence(import.meta.env.PRSCD_URL, {
    publicKey: import.meta.env.PRSCD_PUBLIC_KEY,
    id,
});

function App() {
    const [channel, setChannel] = useState<IChannel>();
    const [users, setUsers] = useState<User[]>([]);
    const [self, setSelf] = useState<User>({
        avatar: `https://api.dicebear.com/6.x/pixel-art/png?seed=${randomName()}`,
        color: randomColor(),
        id,
        name: randomName(),
        visibility: !document.hidden,
    });

    useEffect(() => {
        // join channel
        (async () => {
            try {
                const yomo = await presence;
                const tempChannel = await yomo.joinChannel(
                    'auto-update-state',
                    self
                );
                setChannel(tempChannel);
            } catch (error) {
                console.log(error);
            }
        })();
        // add self visibility change event listener
        const selfVisibilityChange = () =>
            setSelf((self) => {
                return { ...self, visibility: !document.hidden };
            });
        document.addEventListener('visibilitychange', selfVisibilityChange);
        // auto update every 15s
        const autoUpdateState = setInterval(
            () =>
                setSelf({
                    avatar: `https://api.dicebear.com/6.x/pixel-art/png?seed=${randomName()}`,
                    color: randomColor(),
                    id,
                    name: randomName(),
                    visibility: !document.hidden,
                }),
            5000
        );
        // when closing window, leave channel, remove listener, clear time interval
        return () => {
            document.removeEventListener(
                'visibilitychange',
                selfVisibilityChange
            );
            clearInterval(autoUpdateState);
            channel?.leave();
        };
    }, []);

    useEffect(() => {
        if (!channel) return;
        // subscribe all users
        channel?.subscribePeers((peers) => setUsers(peers as User[]));
        // subscribe state change event
        channel?.subscribe('update-state', (user: User) => {
            setUsers((users) => {
                const tempUsers = users?.filter((u) => u.id !== user.id);
                tempUsers?.push(user);
                return tempUsers;
            });
        });
    }, [channel]);

    useEffect(() => {
        // broadcast self state when updateing
        channel?.broadcast('update-state', self);
    }, [self]);

    return <GroupHug users={users} self={self} />;
}

export default App;
