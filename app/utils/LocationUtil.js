export default class LocationUtil {

    static rad(deg) {
        return deg * Math.PI / 180;
    }

    static getDistance(lat1, long1, lat2, long2) {
        const R = 6378137;
        const dLat = this.rad(lat2 - lat1);
        const dLong = this.rad(long2 - long1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    static segmentWithLocation(query, latitude, longitude) {
        if (query && latitude && longitude) {
            const array = query.split(';');
            for (let i = 0; i < array.length; i++) {
                const coordinate = array[i].split(',');
                const x = Number(coordinate[0]);
                const y = Number(coordinate[1]);
                const r = Number(coordinate[2]);
                const d = LocationUtil.getDistance(latitude, longitude, x, y);
                if (d <= r) {
                    return true;
                }
            }
            return false;
        }
        return true;
    }
}
