import { useEffect, useState, ChangeEvent } from 'react';
import { PODCASTS } from '../mocks/podcasts';

interface Props {
    onPodcastChange: (url: string) => void;
}

export function PodcastList(props: Props) {
    const [podcasts, setPodcasts] = useState([]);
    // Same as componentDidMount
    useEffect(() => {
        // Do your fetch data here. We mock this for now.
        setPodcasts(PODCASTS);
        // Set initial URL
        props.onPodcastChange(PODCASTS[0].programUrl);
    }, []);

    function handlePodcastChange(event: ChangeEvent<HTMLSelectElement>) {
        props.onPodcastChange(event.currentTarget.value);
    }

    return (
        <div>
            <select onChange={handlePodcastChange}>
                {podcasts.map((podcast) => (
                    <option key={podcast.programUrl} value={podcast.programUrl}>
                        {podcast.programTitle}
                    </option>
                ))}
            </select>
        </div>
    );
}
