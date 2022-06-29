
export class Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    visible: boolean;
    opacity: number;


    constructor(obj?: any) {

        if (!obj) {
            return;
        }

        this.lat = obj.lat;
        this.lng = obj.lng;
        this.label = obj.label;
        this.draggable = obj.draggable;
        this.visible = obj.visible;
        this.opacity = obj.opacity;
    }
}
