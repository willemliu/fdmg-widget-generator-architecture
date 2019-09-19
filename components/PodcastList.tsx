import { useEffect, useState, ChangeEvent } from 'react';
import PodcastStore from '../stores/PodcastStore';

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
const baseUrl = process.env.BASE_URL;

interface Props {
    onPodcastChange: (url: string) => void;
    onSponsorLength: (sponsorLength: number) => void;
}

export function PodcastList(props: Props) {
    const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
    const [podcast, setPodcast] = useState<PodcastType>(
        PodcastStore.getPodcast()
    );
    const [subscription, setSubscription] = useState(0);

    /**
     * Remembed to cleanup any subscriptions to Store
     */
    useEffect(
        () => () => {
            if (subscription) {
                PodcastStore.unsubscribe(subscription);
            }
        },
        [subscription]
    );

    // Same as componentDidMount
    useEffect(() => {
        setSubscription(
            PodcastStore.subscribe(() => {
                setPodcast(PodcastStore.getPodcast());
                handlePodcastChange(PodcastStore.getPodcast());
            })
        );

        if (podcast) {
            handlePodcastChange(podcast);
        }

        fetch(`${baseUrl}/widget-podcasts`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json: PodcastType[]) => {
                setPodcasts(json);
                if (!podcast) {
                    // Set initial URL
                    props.onPodcastChange(
                        `${baseUrl}${json[0].programUrl}/json`
                    );
                    props.onSponsorLength(json[0].sponsors.length);
                }
            });
    }, []);

    /**
     * When selecting a different podcast.
     * @param event
     */
    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        const podcast = podcasts.find(
            (podcast) => podcast.programUrl === event.currentTarget.value
        );
        PodcastStore.setPodcast(podcast);
    }

    function handlePodcastChange(podcast: PodcastType) {
        props.onPodcastChange(`${baseUrl}${podcast.programUrl}/json`);
        props.onSponsorLength(podcast.sponsors.length);
    }

    return (
        <div>
            <select
                onChange={onChange}
                value={podcast ? podcast.programUrl : ''}
            >
                {podcasts.map((pc) => (
                    <option key={pc.programUrl} value={pc.programUrl}>
                        {pc.programTitle}
                    </option>
                ))}
            </select>
        </div>
    );
}
