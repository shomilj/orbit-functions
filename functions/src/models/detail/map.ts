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
  data: MapLocation[];
}

export const MapDetail = (locations: MapLocation[]): MapDetailType => {
  return {
    type: "MAP",
    data: locations,
  };
};
