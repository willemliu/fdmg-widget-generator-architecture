import { WidgetTypes, PlayerType } from '../components/WidgetTypes';
import { useState, useEffect } from 'react';
import { PodcastList } from '../components/PodcastList';
import { SponsorCheckbox } from '../components/SponsorCheckbox';
import { Themes } from '../components/Themes';
import { EpisodeFragment } from '../components/EpisodeFragment';
import { Playlist, PlaylistItem } from '../components/Playlist';

export default function Index() {
    const [playerType, setPlayerType] = useState<PlayerType>('podcast');
    const [playerUrl, setPlayerUrl] = useState('');
    const [hasSponsor, setHasSponsor] = useState(true);
    const [playerModel, setPlayerModel] = useState('');
    const [theme, setTheme] = useState('bnr');
    const [embedCode, setEmbedCode] = useState('');

    function handleWidgetTypeChanged(playerType: PlayerType) {
        setPlayerType(playerType);
    }

    function getUriFromPlaylist(playlist: PlaylistItem[]) {
        const uri = playlist.map((item) => item.programUrl).join();
        return encodeURIComponent(uri);
    }

    function handlePlayerChange(urlOrPlaylist: string | PlaylistItem[]) {
        switch (playerType) {
            case 'fragment':
                setPlayerUrl(
                    `https://some.url.to.the.player?fragment=${urlOrPlaylist}&theme=${theme}`
                );
                break;
            case 'playlist':
                // Process the playlist
                if (typeof urlOrPlaylist === 'object') {
                    setPlayerUrl(
                        `https://some.url.to.the.player?playlist=${getUriFromPlaylist(
                            urlOrPlaylist
                        )}&theme=${theme}`
                    );
                }
                break;
            case 'podcast':
                setPlayerUrl(
                    `https://some.url.to.the.player?podcast=${urlOrPlaylist}&theme=${theme}`
                );
        }
    }

    function handleSponsorChange(hasSponsor: boolean) {
        setHasSponsor(hasSponsor);
    }

    function handleThemeChange(theme: string) {
        // Process your theme colors here and change your layout accordingly
        setTheme(theme);
    }

    function getPlayerHeight(widgetType: PlayerType) {
        const sponsorHeight = hasSponsor ? 3 : 0;
        switch (widgetType) {
            case 'fragment':
                return 10 + sponsorHeight;
            case 'playlist':
                return 20 + sponsorHeight;
            case 'podcast':
                return 30 + sponsorHeight;
        }
    }

    useEffect(() => {
        const playerModel = JSON.stringify(
            {
                playerType,
                playerUrl,
                hasSponsor,
                theme,
            },
            null,
            2
        );
        setPlayerModel(playerModel);
        setEmbedCode(
            `<iframe src="${playerUrl}"
    data-sponsor="${hasSponsor}"
    data-player-type="${playerType}"
    data-theme="${theme}"
    height="${getPlayerHeight(playerType)}"
/>`
        );
    }, [playerType, playerUrl, hasSponsor, theme]);

    return (
        <section>
            <main>
                <h1>FDMG Widget Generator architecture</h1>
                <WidgetTypes
                    defaultValue={playerType}
                    onChange={handleWidgetTypeChanged}
                />
                {playerType === 'podcast' ? (
                    <PodcastList onPodcastChange={handlePlayerChange} />
                ) : null}

                {playerType === 'fragment' ? (
                    <EpisodeFragment
                        onEpisodeFragmentChange={handlePlayerChange}
                    />
                ) : null}

                {playerType === 'playlist' ? (
                    <Playlist onPlaylistChange={handlePlayerChange} />
                ) : null}

                <div>
                    <SponsorCheckbox
                        defaultValue={hasSponsor}
                        onChange={handleSponsorChange}
                    />
                </div>
                <div>
                    <Themes onChange={handleThemeChange} />
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
