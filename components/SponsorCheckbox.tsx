import { ChangeEvent } from 'react';

interface Props {
    defaultValue: boolean;
    onChange: (checked: boolean) => void;
}

export function SponsorCheckbox(props: Props) {
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        props.onChange(event.currentTarget.checked);
    }

    return (
        <label>
            <input
                type="checkbox"
                name="sponsor"
                value="true"
                defaultChecked={props.defaultValue}
                onChange={onChange}
            />
            Show sponsor
        </label>
    );
}
