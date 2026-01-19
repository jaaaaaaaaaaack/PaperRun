
export const getPillShape = (color = 'white') => {
    const svg = `
    <svg width="500" height="120" viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="500" height="120" rx="60" fill="${color}"/>
    </svg>`
    return `data:image/svg+xml;base64,${btoa(svg)}`
}
