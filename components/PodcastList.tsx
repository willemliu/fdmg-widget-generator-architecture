import { useEffect, useState, ChangeEvent } from 'react';
import { PODCASTS, PodcastType } from '../mocks/podcasts';

interface Props {
    onPodcastChange: (url: string) => void;
    onSponsorLength: (sponsorLength: number) => void;
}

export function PodcastList(props: Props) {
    const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
    // Same as componentDidMount
    useEffect(() => {
        // Do your fetch data here. We mock this for now.
        setPodcasts(PODCASTS);
        // Set initial URL
        props.onPodcastChange(
            `https://dev.bnr.nl${PODCASTS[0].programUrl}/json`
        );
        props.onSponsorLength(PODCASTS[0].sponsors.length);
    }, []);

    function handlePodcastChange(event: ChangeEvent<HTMLSelectElement>) {
        const programUrl = event.currentTarget.value;
        props.onPodcastChange(`https://dev.bnr.nl${programUrl}/json`);
        const podcast = podcasts.filter(
            (podcast) => podcast.programUrl === programUrl
        );
        props.onSponsorLength(podcast[0].sponsors.length);
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
