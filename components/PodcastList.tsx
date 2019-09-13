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
        props.onPodcastChange(
            `https://dev.bnr.nl${PODCASTS[0].programUrl}/json`
        );
    }, []);

    function handlePodcastChange(event: ChangeEvent<HTMLSelectElement>) {
        props.onPodcastChange(
            `https://dev.bnr.nl${event.currentTarget.value}/json`
        );
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
