import { useEffect, useState, useRef, ChangeEvent } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import { Fragment } from './EpisodeFragment';
import { debounce } from '../utils/debounce';

const searchUrl = process.env.SEARCH_URL;

interface Props {
    onPlaylistChange: (playlist: Fragment[]) => void;
    onSearchChange: (searchString: string) => void;
    searchString?: string;
}

export function Playlist(props: Props) {
    const [itemList, setItemList] = useState<Fragment[]>([]);
    const [playlist, setPlaylist] = useState([]);
    const itemListRef = useRef(null);

    useEffect(() => {
        if (props.searchString) {
            search(props.searchString);
        }
    }, []);

    /**
     * Let parent component know the playlist changed.
     */
    useEffect(() => {
        props.onPlaylistChange(playlist);
    }, [playlist]);

    function search(query: string) {
        fetch(`${searchUrl}${query}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json: Fragment[]) => {
                const onlyAudioItems = json.filter(
                    (fragment) => fragment.audio
                );
                setItemList(onlyAudioItems);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    /**
     * Handle search input changes.
     * @param event
     */
    function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        debounce(() => {
            props.onSearchChange(value);
            search(value);
        });
    }

    // a little function to help us with reordering the result
    function reorder(list: Fragment[], startIndex: number, endIndex: number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    /**
     * Persist the result of the dragging of items in the playlist.
     */
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

    /**
     * Add selected item to the playlist
     */
    function addItem() {
        // Add the item to the list.
        const itemToBeAdded = itemList.find(
            (item) => item.id === parseInt(itemListRef.current.value)
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
                defaultValue={props.searchString}
            />
            {itemList.length ? (
                <select ref={itemListRef}>
                    {itemList.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title}
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
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    data-value={item.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.title}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
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
