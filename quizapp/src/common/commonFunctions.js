export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()} ${date.toTimeString().slice(0, 8)}`;
};
