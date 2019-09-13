import 'fetch-everywhere';
import { ChangeEvent, useEffect, useState, useRef } from 'react';

interface Props {
    onEpisodeFragmentChange: (url: string) => void;
    onEpisodeCount: (episodeCount: number) => void;
}

let debounceTimeout: NodeJS.Timeout;

export interface Episode {
    title: string;
    intro: string;
    websiteUrl: string;
    artworkUrl: string;
    brandedPodcast: boolean;
    sponsors: any[];
    episodes: [
        {
            title: string;
            link: string;
            summary: string;
            publicationDate: string;
            media: [
                {
                    type: string;
                    url: string;
                    title: string;
                    duration: number;
                    length: number;
                }
            ];
        }
    ];
}

export interface Fragment {
    id: number;
    title: string;
    intro: string;
    publicationUrl: string;
    prefix: string;
    category: string;
    socialMediaDescription: string;
    socialMediaTitle: string;
    shareUrl: string;
    tags: [
        {
            name: string;
            directory: string;
            type: string;
            typename: string;
        }
    ];
    publicationDate: number;
    shortTime: string;
    newWindow: boolean;
    read: boolean;
    shortArticle: boolean;
    state: string;
    relatedArticles: any[];
    articleType: string;
    sourceDisplayName: string;
    matchedQueriesAsString: string;
    meta: string;
    shortArticleContent: string;
    picture: {
        caption: string;
        photographer: string;
        alignment: string;
        imageBaseUrl: string;
        imageUrlSmall: string;
        imageUrlMedium: string;
        imageUrlLarge: string;
        cssClass: string;
        resolutionSmall: {
            width: number;
            height: number;
            quality: number;
        };
        resolutionMedium: {
            width: number;
            height: number;
            quality: number;
        };
        resolutionLarge: {
            width: number;
            height: number;
            quality: number;
        };
        aligned: boolean;
    };
    detailPicture: any;
    countInlinePictures: number;
    thirdParty: boolean;
    audio: boolean;
    audioId: number;
    sponsors: any[];
    rubric: string;
    genre: string;
    programType: string;
    programTitle: string;
    brandSponsor: boolean;
    sponsorTitle: string;
    sponsorContent: string;
    durationInMinutes: number;
    authorInfos: any;
    photoSeries: boolean;
}

export function EpisodeFragment(props: Props) {
    const [searchResults, setSearchResults] = useState<Fragment[]>([]);
    const searchResultRef = useRef(null);
    const [, setFragment] = useState<Fragment>(null);

    // Same as componentDidMount
    useEffect(() => {
        // Set initial URL
        props.onEpisodeFragmentChange('');
    }, []);

    function setItem() {
        const itemToBeSet = searchResults.find(
            (item) => item.id === parseInt(searchResultRef.current.value, 10)
        );
        if (itemToBeSet) {
            setFragment(itemToBeSet);
            props.onEpisodeFragmentChange(
                `https://dev.bnr.nl/podcast/json/${itemToBeSet.id}`
            );
            fetch(`https://dev.bnr.nl/podcast/json/${itemToBeSet.id}`)
                .then((res) => res.json())
                .then((json: Episode) => {
                    props.onEpisodeCount(json.episodes.length);
                });
        }
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const value = event.currentTarget.value;
        debounceTimeout = setTimeout(() => {
            fetch(`https://dev.bnr.nl/widget-search?q=${value}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((json: Fragment[]) => {
                    const onlyAudioItems = json.filter(
                        (fragment) => fragment.audio
                    );

                    setSearchResults(onlyAudioItems);
                });
        }, 300);
    }

    return (
        <div>
            <input
                type="search"
                name="q"
                placeholder="Search episode/fragment"
                onChange={onChange}
            />

            {searchResults.length ? (
                <select ref={searchResultRef} onChange={setItem}>
                    {searchResults.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </select>
            ) : null}
            {searchResults.length ? (
                <button onClick={setItem}>Select fragment</button>
            ) : null}
        </div>
    );
}
