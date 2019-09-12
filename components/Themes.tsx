import { ChangeEvent, useEffect } from 'react';

interface Props {
    onChange: (theme: string) => void;
}

export function Themes(props: Props) {
    // Same as componentDidMount
    useEffect(() => {
        props.onChange('bnr');
    }, []);

    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        props.onChange(event.currentTarget.value);
    }

    return (
        <div>
            <select onChange={onChange}>
                <option value="bnr">BNR</option>
                <option value="energeia">Energeia</option>
                <option value="esb">ESB</option>
                <option value="fd">Fd</option>
                <option value="fd-persoonlijk">Fd Persoonlijk</option>
                <option value="pensioen-pro">PensioenPro</option>
                <option value="custom">- Create your own color-scheme -</option>
            </select>
        </div>
    );
}
