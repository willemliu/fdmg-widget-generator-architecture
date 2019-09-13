import { WidgetTypes, PlayerType } from '../components/WidgetTypes';
import { useState, useEffect } from 'react';
import { PodcastList } from '../components/PodcastList';
import { SponsorCheckbox } from '../components/SponsorCheckbox';
import { Themes } from '../components/Themes';
import { EpisodeFragment, Fragment } from '../components/EpisodeFragment';
import { Playlist } from '../components/Playlist';
import { ThemeName, getThemeColors } from '../utils/themes';

const baseUrl = 'https://static-dev.bnr.nl/audio-widget-v2/index.html';
export default function Index() {
    const [playerType, setPlayerType] = useState<PlayerType>('podcast');
    const [playerUrl, setPlayerUrl] = useState('');
    const [hasSponsor, setHasSponsor] = useState(true);
    const [playerModel, setPlayerModel] = useState('');
    const [theme, setTheme] = useState(ThemeName.BNR);
    const [embedCode, setEmbedCode] = useState('');
    const [sponsorCount, setSponsorCount] = useState(0);
    const [episodeCount, setEpisodeCount] = useState(0);
    const [showIframe, setShowIframe] = useState(false);

    /**
     * Helper method to join the ids of the items in the playlist as a comma-separated
     * string.
     * @param playlist
     */
    function getUriFromPlaylist(playlist: Fragment[]) {
        const uri = playlist.map((item) => item.id).join();
        return uri;
    }

    /**
     * Gets called on changes within the player types themselves and then sets the
     * base-player-url accordingly. The global URI parameters e.g. `showSponsor` and `colors`
     * appender at another stage.
     */
    function handlePlayerTypeChange(urlOrPlaylist: string | Fragment[]) {
        switch (playerType) {
            case 'podcast':
            case 'fragment':
                setPlayerUrl(`${baseUrl}?podcast=${urlOrPlaylist}`);
                break;
            case 'playlist':
                // Process the playlist
                if (typeof urlOrPlaylist === 'object') {
                    setEpisodeCount(urlOrPlaylist.length);
                    setPlayerUrl(
                        `${baseUrl}?playlistItemsUrl=https://dev.bnr.nl/podcast/json/ids&items=${getUriFromPlaylist(
                            urlOrPlaylist
                        )}`
                    );
                }
                break;
        }
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
                theme,
                colors: getThemeColors(theme),
            },
            null,
            2
        );
        setPlayerModel(playerModel);

        /**
         * Render the iframe when not a playlist with zero items.
         */
        setShowIframe(
            (playerType === 'playlist' && episodeCount === 0) === false
        );

        setEmbedCode(
            `<iframe height="${getPlayerHeight(
                playerType
            )}" width="300" src="${playerUrl}&showSponsor=${hasSponsor}&colors=${getThemeColors(
                theme
            )}" frameBorder="0" scrolling="no"/>`
        );
    }, [playerType, playerUrl, hasSponsor, theme]);

    return (
        <section>
            <main>
                <h1>FDMG Widget Generator architecture</h1>
                <WidgetTypes
                    defaultValue={playerType}
                    onChange={setPlayerType}
                />
                {playerType === 'podcast' ? (
                    <PodcastList
                        onPodcastChange={handlePlayerTypeChange}
                        onSponsorLength={setSponsorCount}
                    />
                ) : null}

                {playerType === 'fragment' ? (
                    <EpisodeFragment
                        onEpisodeFragmentChange={handlePlayerTypeChange}
                        onEpisodeCount={setEpisodeCount}
                    />
                ) : null}

                {playerType === 'playlist' ? (
                    <Playlist onPlaylistChange={handlePlayerTypeChange} />
                ) : null}

                <div>
                    <SponsorCheckbox
                        defaultValue={hasSponsor}
                        onChange={setHasSponsor}
                    />
                </div>
                <div>
                    <Themes onChange={setTheme} />
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

            <style jsx global>{`
                body {
                    margin: 0;
                }
                section {
                    display: flex;
                    min-height: 100vh;
                }
                main {
                    flex: 1 1 33%;
                }
                main div {
                    margin: 1rem 0;
                }
                aside {
                    flex: 1 1 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                label {
                    user-select: none;
                }
            `}</style>
        </section>
    );
}
