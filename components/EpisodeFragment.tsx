import { ChangeEvent, useEffect } from 'react';

interface Props {
    onEpisodeFragmentChange: (url: string) => void;
}

export function EpisodeFragment(props: Props) {
    // Same as componentDidMount
    useEffect(() => {
        // Set initial URL
        props.onEpisodeFragmentChange('');
    }, []);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        props.onEpisodeFragmentChange(event.currentTarget.value);
    }

    return (
        <div>
            <input
                type="search"
                name="q"
                placeholder="Search episode/fragment"
                onChange={onChange}
            />
        </div>
    );
}
