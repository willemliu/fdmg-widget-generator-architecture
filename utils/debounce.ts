let debounceTimeout: number;
export function debounce(fn: () => void, timeout: number = 300) {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(fn, 300);
}
