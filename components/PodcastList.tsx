import { useEffect, useState, ChangeEvent } from 'react';

export interface PodcastType {
    title: string;
    intro: string;
    websiteUrl: string;
    artworkUrl: string;
    brandedPodcast: boolean;
    programType: string;
    programTitle: string;
    programUrl: string;
    sponsors: any[];
    episodes: any[];
}

// Should ideally be loaded from environment variables.
// For this example it's simply hard-coded.
const baseUrl = 'https://dev.bnr.nl';

interface Props {
    onPodcastChange: (url: string) => void;
    onSponsorLength: (sponsorLength: number) => void;
}

export function PodcastList(props: Props) {
    const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
    // Same as componentDidMount
    useEffect(() => {
        fetch(`https://dev.bnr.nl/widget-podcasts`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json: PodcastType[]) => {
                setPodcasts(json);
                // Set initial URL
                props.onPodcastChange(`${baseUrl}${json[0].programUrl}/json`);
                props.onSponsorLength(json[0].sponsors.length);
            });
    }, []);

    /**
     * When selecting a different podcast.
     * @param event
     */
    function handlePodcastChange(event: ChangeEvent<HTMLSelectElement>) {
        const programUrl = event.currentTarget.value;
        props.onPodcastChange(`${baseUrl}${programUrl}/json`);
        const podcast = podcasts.find(
            (podcast) => podcast.programUrl === programUrl
        );
        props.onSponsorLength(podcast.sponsors.length);
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
