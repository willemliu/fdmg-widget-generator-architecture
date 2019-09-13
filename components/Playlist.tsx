import { useEffect, useState, useRef } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
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
    const playlistRef = useRef(null);

    useEffect(() => {
        props.onPlaylistChange(playlist);
    }, [playlist]);

    function onSearchChange() {
        // Fetch search query and load results
        setItemList(ITEM_LIST);
    }

    // a little function to help us with reordering the result
    function reorder(
        list: PlaylistItem[],
        startIndex: number,
        endIndex: number
    ) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    function onDragEnd(result: DropResult) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newPlaylist = reorder(
            playlist,
            result.source.index,
            result.destination.index
        );

        setPlaylist(newPlaylist);
    }

    function addItem() {
        // Add the item to the list.
        const itemToBeAdded = itemList.find(
            (item) => item.programUrl === itemListRef.current.value
        );
        // Check for duplicates; prevent if duplicate
        if (playlist.indexOf(itemToBeAdded) > -1) {
            return;
        }
        setPlaylist([...playlist, itemToBeAdded]);
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

            {playlist.length ? (
                <>
                    <h2>Playlist</h2>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <ol
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {playlist.map((item, index) => (
                                        <Draggable
                                            key={item.programUrl}
                                            draggableId={item.programUrl}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    data-value={item.programUrl}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.programTitle}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                </ol>
                            )}
                        </Droppable>
                    </DragDropContext>
                </>
            ) : null}

            <style jsx>{`
                input {
                    width: 300px;
                }
            `}</style>
        </div>
    );
}
