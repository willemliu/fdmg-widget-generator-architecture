import 'core-js';
import React from 'react';
import { PlayerTypes, PlayerType } from '../components/WidgetTypes';
import { useState, useEffect } from 'react';
import { PodcastList } from '../components/PodcastList';
import { SponsorCheckbox } from '../components/SponsorCheckbox';
import { Themes } from '../components/Themes';
import { EpisodeFragment, Fragment } from '../components/EpisodeFragment';
import { Playlist } from '../components/Playlist';
import { createGlobalStyle } from 'styled-components';

declare let process: any;

const baseUrl = process.env.BASE_URL;
const widgetUrl = process.env.WIDGET_URL;

export default function Index() {
    const [playerType, setPlayerType] = useState<PlayerType>('podcast');
    const [playerUrl, setPlayerUrl] = useState('');
    const [hasSponsor, setHasSponsor] = useState(true);
    const [playerModel, setPlayerModel] = useState('');
    const [colors, setColors] = useState([]);
    const [embedCode, setEmbedCode] = useState('');
    const [sponsorCount, setSponsorCount] = useState(0);
    const [episodeCount, setEpisodeCount] = useState(0);
    const [showIframe, setShowIframe] = useState(false);
    const [playlistSearchString, setPlaylistSearchString] = useState(null);
    const [episodeSearchString, setEpisodeSearchString] = useState(null);
    const [showFragmentIframe, setShowFragmentIframe] = useState(false);
    const [showPodcastIframe, setShowPodcastIframe] = useState(false);
    const [showPlaylistIframe, setShowPlaylistIframe] = useState(false);

    /**
     * Helper method to join the ids of the items in the playlist as a comma-separated
     * string.
     * @param playlist
     */
    function getUriFromPlaylist(playlist: Fragment[]) {
        const uri = playlist.map((item) => item.id).join();
        return uri;
    }

    function hideIframes() {
        setShowFragmentIframe(false);
        setShowPlaylistIframe(false);
        setShowPodcastIframe(false);
    }

    function handlePlaylistChange(playlist: Fragment[]) {
        setEpisodeCount(playlist.length);
        hideIframes();
        setShowPlaylistIframe(playlist.length > 0);
        setPlayerUrl(
            `${widgetUrl}?playlistItemsUrl=${baseUrl}/podcast/json/ids&items=${getUriFromPlaylist(
                playlist
            )}`
        );
    }

    function handlePodcastChange(url: string) {
        hideIframes();
        setShowPodcastIframe(!!url);
        setPlayerUrl(`${widgetUrl}?podcast=${url}`);
    }

    function handleFragmentChange(url: string) {
        hideIframes();
        setShowFragmentIframe(!!url);
        setPlayerUrl(`${widgetUrl}?podcast=${url}`);
    }

    /**
     * Calculate sponsor height. Only podcast sponsor height can differ.
     */
    function getSponsorHeight() {
        let sponsorHeight = 0;
        if (!hasSponsor) {
            sponsorHeight = 0;
        } else if (playerType === 'podcast' && sponsorCount > 1) {
            sponsorHeight = 120;
        } else if (sponsorCount === 1) {
            sponsorHeight = 85;
        }
        return sponsorHeight;
    }

    /**
     * Calculation of the height of the iframe player as digested from
     * the original FDMG Widget Generator.
     *
     * @param playerType
     */
    function getPlayerHeight(playerType: PlayerType) {
        const widgetBaseHeight = 67;
        const sponsorHeight = getSponsorHeight();
        let playerHeight = 125;
        switch (playerType) {
            case 'playlist':
                playerHeight = episodeCount > 4 ? 125 : episodeCount * 25;
                break;
            case 'fragment':
                playerHeight = episodeCount > 2 ? 125 : 50;
                break;
        }

        return widgetBaseHeight + playerHeight + sponsorHeight;
    }

    /**
     * Determine if iframe should be visible
     * @param playerType
     */
    function setIframeVisible(playerType: PlayerType) {
        switch (playerType) {
            case 'fragment':
                setShowIframe(showFragmentIframe);
                break;
            case 'playlist':
                setShowIframe(showPlaylistIframe);
                break;
            case 'podcast':
                setShowIframe(showPodcastIframe);
                break;
        }
    }

    /**
     * This useEffect listens to all the states which affects the BNR Player.
     * Generates the iFrame code and for convenience also the player data-model if
     * for any reason you'd want to have a JSON representation of the player.
     */
    useEffect(() => {
        const playerModel = JSON.stringify(
            {
                height: getPlayerHeight(playerType),
                episodeCount,
                playerType,
                hasSponsor,
                playerUrl,
                colors,
            },
            null,
            2
        );
        setPlayerModel(playerModel);
        setIframeVisible(playerType);
        setEmbedCode(
            `<iframe height="${getPlayerHeight(
                playerType
            )}" width="300" src="${playerUrl}&showSponsor=${hasSponsor}&colors=${colors}" frameBorder="0" scrolling="no"/>`
        );
    }, [playerType, playerUrl, hasSponsor, colors]);

    return (
        <section>
            <GlobalStyle />
            <main>
                <h1>FDMG Widget Generator architecture</h1>
                <PlayerTypes
                    defaultValue={playerType}
                    onChange={setPlayerType}
                />
                {playerType === 'podcast' ? (
                    <PodcastList
                        onPodcastChange={handlePodcastChange}
                        onSponsorLength={setSponsorCount}
                    />
                ) : null}

                {playerType === 'fragment' ? (
                    <EpisodeFragment
                        onSearchChange={setEpisodeSearchString}
                        onEpisodeFragmentChange={handleFragmentChange}
                        onEpisodeCount={setEpisodeCount}
                        searchString={episodeSearchString}
                    />
                ) : null}

                {playerType === 'playlist' ? (
                    <Playlist
                        onSearchChange={setPlaylistSearchString}
                        searchString={playlistSearchString}
                        onPlaylistChange={handlePlaylistChange}
                    />
                ) : null}

                <div>
                    <SponsorCheckbox
                        defaultValue={hasSponsor}
                        onChange={setHasSponsor}
                    />
                </div>
                <div>
                    <Themes onChangeColors={setColors} />
                </div>
            </main>
            <aside>
                <label>
                    <h1>Player model</h1>
                    <textarea
                        rows={10}
                        cols={80}
                        value={playerModel}
                        readOnly={true}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                </label>
                <label>
                    <h1>Embed-code</h1>
                    <textarea
                        rows={10}
                        cols={80}
                        value={embedCode}
                        readOnly={true}
                        onFocus={(e) => e.currentTarget.select()}
                    />
                </label>
                {showIframe ? (
                    <div dangerouslySetInnerHTML={{ __html: embedCode }} />
                ) : null}
            </aside>
        </section>
    );
}

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }
    section {
        display: flex;
        min-height: 100vh;
    }
    main {
        flex: 1 1 33%;
        div {
            margin: 1rem 0;
        }
    }
    aside {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > label {
            display: none;
        }
    }
    label {
        user-select: none;
    }
`;
