import 'fetch-everywhere';
import { ChangeEvent, useEffect, useState, useRef, Fragment } from 'react';
import { debounce } from '../utils/debounce';
import FragmentStore from '../stores/FragmentStore';

interface Props {
    onEpisodeFragmentChange: (url: string) => void;
    onEpisodeCount: (episodeCount: number) => void;
    onSearchChange: (searchString: string) => void;
    searchString?: string;
}

// Should ideally be loaded from environment variables.
// For this example it's simply hard-coded.
const baseUrl = process.env.BASE_URL;
const searchUrl = process.env.SEARCH_URL;

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
    const [fragment, setFragment] = useState<Fragment>(
        FragmentStore.getFragment()
    );

    const [subscription, setSubscription] = useState(0);

    /**
     * Remembed to cleanup any subscriptions to Store
     */
    useEffect(
        () => () => {
            if (subscription) {
                FragmentStore.unsubscribe(subscription);
            }
        },
        [subscription]
    );

    // Same as componentDidMount
    useEffect(() => {
        /**
         * Subscribe to store changes.
         */
        setSubscription(
            FragmentStore.subscribe(() => {
                setFragment(FragmentStore.getFragment());
            })
        );
        if (props.searchString) {
            search(props.searchString);
        }
    }, []);

    /**
     * When fragment changes
     */
    useEffect(() => {
        if (fragment) {
            changeFragment(fragment);
        }
    }, [fragment]);

    /**
     * Set the currently selected item as the fragment.
     */
    function setItem() {
        const itemToBeSet = searchResults.find(
            (item) => item.id === parseInt(searchResultRef.current.value, 10)
        );
        if (itemToBeSet) {
            FragmentStore.setFragment(itemToBeSet);
        } else {
            props.onEpisodeFragmentChange('');
        }
    }

    function changeFragment(itemToBeSet: Fragment) {
        props.onEpisodeFragmentChange(
            `${baseUrl}/podcast/json/${itemToBeSet.id}`
        );
        fetch(`${baseUrl}/podcast/json/${itemToBeSet.id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json: Episode) => {
                props.onEpisodeCount(json.episodes.length);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        debounce(() => {
            props.onSearchChange(value);
            search(value);
        });
    }

    function search(value) {
        fetch(`${searchUrl}${value}`, {
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
            })
            .catch((e) => {
                console.error(e);
            });
    }

    return (
        <div>
            <input
                type="search"
                name="q"
                placeholder="Search episode/fragment"
                onChange={onChange}
                defaultValue={props.searchString}
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
