import { ChangeEvent } from 'react';

export type PlayerType = 'podcast' | 'fragment' | 'playlist';

interface Props {
    defaultValue: PlayerType;
    onChange: (playerType: PlayerType) => void;
}

export function PlayerTypes(props: Props) {
    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        switch (event.currentTarget.value) {
            case 'fragment':
                props.onChange('fragment');
                break;
            case 'playlist':
                props.onChange('playlist');
                break;
            case 'podcast':
                props.onChange('podcast');
            default:
        }
    }

    return (
        <div>
            <label>
                <input
                    type="radio"
                    name="playerType"
                    value="podcast"
                    checked={props.defaultValue === 'podcast'}
                    onChange={handleOnChange}
                />
                Podcast
            </label>
            <label>
                <input
                    type="radio"
                    name="playerType"
                    value="fragment"
                    checked={props.defaultValue === 'fragment'}
                    onChange={handleOnChange}
                />
                Episode/NewsFragment
            </label>
            <label>
                <input
                    type="radio"
                    name="playerType"
                    value="playlist"
                    checked={props.defaultValue === 'playlist'}
                    onChange={handleOnChange}
                />
                Playlist
            </label>
        </div>
    );
}
