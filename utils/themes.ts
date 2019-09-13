export enum ThemeName {
    BNR = 'BNR',
    ENERGEIA = 'ENERGEIA',
    ESB = 'ESB',
    FD = 'FD',
    FD_PERSOONLIJK = 'FD_PERSOONLIJK',
    PENSIOEN_PRO = 'PENSIOEN_PRO',
    CUSTOM = 'CUSTOM',
}

const themes = [
    {
        value: ThemeName.BNR,
        label: 'BNR',
        colorScheme: [
            {
                value: '#ffcb2e',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#ffffff',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#000000',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#ffcb2e',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#ffcb2e',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#000000',
                label: 'Playlist background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000000',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
    {
        value: ThemeName.ENERGEIA,
        label: 'Energeia',
        colorScheme: [
            {
                value: '#01B06D',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#000000',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#f4e1d2',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000000',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#ffffff',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#ffead9',
                label: 'Playlist background',
                colorDescription: 'The playlist background color',
            },
            {
                value: '#f4e1d2',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
    {
        value: ThemeName.ESB,
        label: 'ESB',
        colorScheme: [
            {
                value: '#0a70a0',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#000000',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#f4e1d2',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000000',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#ffffff',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#ffead9',
                label: 'Playlist background',
                colorDescription: 'The playlist background color',
            },
            {
                value: '#F4E1D2',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
    {
        value: ThemeName.FD,
        label: 'FD',
        colorScheme: [
            {
                value: '#4393ab',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#000',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#f4e1d2',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#fff',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#ffead9',
                label: 'Playlist background',
                colorDescription: 'The playlist background color',
            },
            {
                value: '#transparent',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
    {
        value: ThemeName.FD_PERSOONLIJK,
        label: 'FD Persoonlijk',
        colorScheme: [
            {
                value: '#e57e30',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#000000',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#f5f5f5',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000000',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#ffffff',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#ffffff',
                label: 'Playlist background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#f5f5f5',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
    {
        value: ThemeName.PENSIOEN_PRO,
        label: 'Pensioen Pro',
        colorScheme: [
            {
                value: '#394a81',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#000000',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#f4e1d2',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000000',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#ffffff',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#ffead9',
                label: 'Playlist background',
                colorDescription: 'The playlist background color',
            },
            {
                value: '#f4e1d2',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
    {
        value: ThemeName.CUSTOM,
        label: '- Create your own color scheme -',
        colorScheme: [
            {
                value: '#ffcb2e',
                label: 'Player accent',
                colorDescription:
                    'The accent color for highlighted text and the scrubber',
            },
            {
                value: '#ffffff',
                label: 'Player text',
                colorDescription:
                    'The color for the titles and podcast/newsfragment name',
            },
            {
                value: '#000000',
                label: 'Player background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#ffcb2e',
                label: 'Player prev/next',
                colorDescription: 'The color for the previous and next buttons',
            },
            {
                value: '#ffcb2e',
                label: 'Player play/pause',
                colorDescription:
                    'The color for the play/pause button icon and circle border in the image',
            },
            {
                value: '#000000',
                label: 'Playlist background',
                colorDescription: 'Background color for the player',
            },
            {
                value: '#000000',
                label: 'Player border',
                colorDescription: 'The player border color',
            },
        ],
    },
];

export function getThemeColors(themeName: ThemeName) {
    const theme = themes.find((item) => item.value === themeName);
    if (theme) {
        return theme.colorScheme.map((color) => color.value);
    } else {
        themes[0].colorScheme.map((color) => color.value);
    }
}
