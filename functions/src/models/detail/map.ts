export interface MapLocation {
  title: string;
  subtitle: string;
  latitude: number;
  longitude: number;
  icon: string;
  color: string;
}

export interface MapDetailType {
  type: string;
  data: {
    locations: MapLocation[];
    region: any;
  };
}

export const MapDetail = (
  locations: MapLocation[],
  region: any
): MapDetailType => {
  return {
    type: "MAP",
    data: {
      locations: locations,
      region: region,
    },
  };
};
