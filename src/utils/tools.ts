export function getObjectLength(obj: Record<string, unknown>): number {
    return Object.keys(obj).reduce((count, key) => {
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            return count + getObjectLength(value as Record<string, unknown>);
        }
        return count + 1;
    }, 0);
}
