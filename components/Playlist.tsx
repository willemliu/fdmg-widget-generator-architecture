import { useEffect, useState, useRef } from 'react';
import { ITEM_LIST } from '../mocks/itemList';

export type PlaylistItem = {
    programTitle: string;
    programUrl: string;
};

interface Props {
    onPlaylistChange: (playlist: PlaylistItem[]) => void;
}

export function Playlist(props: Props) {
    const [itemList, setItemList] = useState<PlaylistItem[]>([]);
    const [playlist, setPlaylist] = useState([]);
    const itemListRef = useRef(null);

    useEffect(() => {
        props.onPlaylistChange(playlist);
    }, [playlist]);

    function onSearchChange() {
        // Fetch search query and load results
        setItemList(ITEM_LIST);
    }

    function addItem() {
        setPlaylist([
            ...playlist,
            itemList.find(
                (item) => item.programUrl === itemListRef.current.value
            ),
        ]);
    }

    return (
        <div>
            <input
                type="search"
                name="q"
                placeholder="Search episode/fragment for playlist"
                onChange={onSearchChange}
            />
            {itemList.length ? (
                <select ref={itemListRef}>
                    {itemList.map((item) => (
                        <option key={item.programUrl} value={item.programUrl}>
                            {item.programTitle}
                        </option>
                    ))}
                </select>
            ) : null}
            {itemList.length ? (
                <button onClick={addItem}>Add to playlist</button>
            ) : null}

            <style jsx>{`
                input {
                    width: 300px;
                }
            `}</style>
        </div>
    );
}
