interface MapLocation {
  title: string;
  subtitle: string;
  latitude: number;
  longitude: number;
  icon: string;
  color: String;
}

interface MapDetailType {
  type: string;
  locations: MapLocation[];
}

export const MapDetail = (locations: MapLocation[]): MapDetailType => {
  return {
    type: "MAP",
    locations: locations,
  };
};
