  import { Icon } from "leaflet";
  import circle from "./circle.gif";

export const customIcon = new Icon({
  iconUrl: circle,
  iconSize: [60, 60], // Size of the icon [width, height]
  iconAnchor: [30, 30], // Point of the icon corresponding to marker's location
  popupAnchor: [0, -30], // Point from which popups open relative to iconAnchor
});
