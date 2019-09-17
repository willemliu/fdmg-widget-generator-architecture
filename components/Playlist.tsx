import { useEffect, useState, useRef, ChangeEvent } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import { Fragment } from './EpisodeFragment';
import { debounce } from '../utils/debounce';
import styled from 'styled-components';

const searchUrl = process.env.SEARCH_URL;

interface Props {
    onPlaylistChange: (playlist: Fragment[]) => void;
    onSearchChange: (searchString: string) => void;
    searchString?: string;
}

export function Playlist(props: Props) {
    const [itemList, setItemList] = useState<Fragment[]>([]);
    const [playlist, setPlaylist] = useState<Fragment[]>([]);

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
    function addItem(event: React.MouseEvent<HTMLElement>) {
        const id = parseInt(event.currentTarget.getAttribute('data-id'), 10);
        // Add the item to the list.
        const itemToBeAdded = itemList.find((item) => item.id === id);
        // Check for duplicates; prevent if duplicate
        if (playlist.indexOf(itemToBeAdded) > -1) {
            return;
        }
        setPlaylist([...playlist, itemToBeAdded]);
    }

    /**
     * Remove item
     * @param event
     */
    function removeItem(event: React.MouseEvent<HTMLButtonElement>) {
        const id = parseInt(event.currentTarget.getAttribute('data-id'), 10);
        const newPlaylist = [...playlist.filter((item) => item.id !== id)];
        setPlaylist(newPlaylist);
    }

    return (
        <StyledContainer>
            <StyledSearchContainer>
                <StyledInput
                    type="search"
                    name="q"
                    placeholder="Search episode/fragment for playlist"
                    onChange={onSearchChange}
                    defaultValue={props.searchString}
                />
                {itemList.length ? (
                    <>
                        <h3>Search results</h3>
                        <StyledSearchResultList>
                            {itemList.map((item) => (
                                <li
                                    onClick={addItem}
                                    data-id={item.id}
                                    key={item.id}
                                >
                                    {item.title}
                                </li>
                            ))}
                        </StyledSearchResultList>
                    </>
                ) : null}
            </StyledSearchContainer>
            {playlist.length ? (
                <StyledPlaylistContainer>
                    <h3>Playlist</h3>
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
                                            draggableId={`${item.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    data-value={item.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.title}{' '}
                                                    <button
                                                        onClick={removeItem}
                                                        data-id={item.id}
                                                    >
                                                        X
                                                    </button>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                    </DragDropContext>
                </StyledPlaylistContainer>
            ) : null}
        </StyledContainer>
    );
}
const StyledContainer = styled.div`
    display: flex;
    justify-content: space-between;
    max-height: 100vh;
    overflow: hidden;
`;

const StyledInput = styled.input`
    width: 300px;
`;

const StyledSearchResultList = styled.ul`
    list-style: none;
    max-height: 50vh;
    overflow: auto;
    padding: 0;
    user-select: none;
    cursor: pointer;

    li {
        &:first-child {
            border-top: 1px solid grey;
        }
        padding: 1rem 0;
        border-bottom: 1px solid grey;
    }
`;

const StyledSearchContainer = styled.section`
    display: flex;
    flex-direction: column;
    margin-right: 1rem;
`;

const StyledPlaylistContainer = styled.section`
    display: flex;
    flex-direction: column;

    ol {
        list-style: none;
        padding: 0;
        max-height: 50vh;
        overflow: auto;
    }
    li {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        &:first-child {
            border-top: 1px solid grey;
        }
        border-bottom: 1px solid grey;
    }
`;
