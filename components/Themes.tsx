import { ChangeEvent, useEffect, useState } from 'react';
import {
    ThemeName,
    getTheme,
    getThemeColorsByName,
    getColorsFromTheme,
} from '../utils/themes';
import { debounce } from '../utils/debounce';

interface Props {
    onChangeColors: (colors: string[]) => void;
}

export function Themes(props: Props) {
    const [showCustom, setShowCustom] = useState(false);
    const [theme, setTheme] = useState(getTheme(ThemeName.BNR));

    // Same as componentDidMount
    useEffect(() => {
        setTheme(getTheme(ThemeName.BNR));
        props.onChangeColors(getThemeColorsByName(ThemeName.BNR));
    }, []);

    /**
     * Handle custom color change
     * @param event
     */
    function onChangeColor(event: ChangeEvent<HTMLInputElement>) {
        const inputEl = event.currentTarget;
        debounce(() => {
            theme.colorScheme.forEach((colorScheme) => {
                if (colorScheme.label === inputEl.getAttribute('name')) {
                    colorScheme.value = inputEl.value;
                }
            });
            props.onChangeColors(getColorsFromTheme(theme));
        }, 300);
    }

    /**
     * Handle custom color toggle
     * @param event
     */
    function onCustom(event: ChangeEvent<HTMLInputElement>) {
        setShowCustom(event.currentTarget.checked);
    }

    /**
     * Handle Theme change
     * @param event
     */
    function onChangeTheme(event: ChangeEvent<HTMLSelectElement>) {
        const themeName = ThemeName[event.currentTarget.value];
        setTheme(getTheme(themeName));
        props.onChangeColors(getThemeColorsByName(themeName));
    }

    return (
        <div>
            <select onChange={onChangeTheme}>
                <option value={ThemeName.BNR}>BNR</option>
                <option value={ThemeName.ENERGEIA}>Energeia</option>
                <option value={ThemeName.ESB}>ESB</option>
                <option value={ThemeName.FD}>Fd</option>
                <option value={ThemeName.FD_PERSOONLIJK}>Fd Persoonlijk</option>
                <option value={ThemeName.PENSIOEN_PRO}>PensioenPro</option>
            </select>

            <label>
                <input type="checkbox" value="custom" onChange={onCustom} />{' '}
                Customize theme
            </label>

            {showCustom ? (
                <div>
                    <h3>Custom</h3>
                    {theme.colorScheme.map((colorScheme, idx) => {
                        return (
                            <label key={`${theme.label}-${colorScheme.label}`}>
                                {idx} - {colorScheme.label}:
                                <input
                                    type="color"
                                    name={colorScheme.label}
                                    defaultValue={colorScheme.value}
                                    onChange={onChangeColor}
                                />
                                <p>{colorScheme.colorDescription}</p>
                            </label>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
