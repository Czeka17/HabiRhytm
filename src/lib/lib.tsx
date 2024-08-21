export function getTimeDifference(date: Date): string {
    const now = new Date();
    const difference = now.getTime() - date.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    if(days === 0){
        return `${hours}h ${minutes}m`;
    }
    if(days === 0 && hours === 0){
        return `${minutes}m`;
    }
    return `${days}d ${hours}h ${minutes}m`;
}