import { ChangeEvent, useEffect } from 'react';
import { ThemeName } from '../utils/themes';

interface Props {
    onChange: (theme: ThemeName) => void;
}

export function Themes(props: Props) {
    // Same as componentDidMount
    useEffect(() => {
        props.onChange(ThemeName.BNR);
    }, []);

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        props.onChange(ThemeName[event.currentTarget.value]);
    }

    return (
        <div>
            <select onChange={onChange}>
                <option value={ThemeName.BNR}>BNR</option>
                <option value={ThemeName.ENERGEIA}>Energeia</option>
                <option value={ThemeName.ESB}>ESB</option>
                <option value={ThemeName.FD}>Fd</option>
                <option value={ThemeName.FD_PERSOONLIJK}>Fd Persoonlijk</option>
                <option value={ThemeName.PENSIOEN_PRO}>PensioenPro</option>
                <option value={ThemeName.CUSTOM}>
                    - Create your own color-scheme -
                </option>
            </select>
        </div>
    );
}
