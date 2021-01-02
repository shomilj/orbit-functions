interface MapLocation {
  title: string;
  subtitle: string;
  latitude: number;
  longitude: number;
  icon: string;
  color: String;
}

export const MapPage = (locations: MapLocation[]) => {
  return {
    locations: locations,
  };
};
