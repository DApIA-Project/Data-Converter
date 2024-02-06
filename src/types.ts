export interface ExtraFieldsSBS {
  messageType: string
  transmissionType: string
  sessionID: string
  aircraftID: string
  flightID: string
  emergency: string

  haveLabel?: string
  label?: string
}

export interface ExtraFieldsCSV {
  altitude: string
  last_position: string
  lastcontact: string
  hour: string
}

export type JsonMessage = Record<string, string | boolean | number | undefined>

export type CsvRow = {
  timestamp: string
  icao24: string
  latitude: string
  longitude: string
  groundspeed: string
  track: string
  vertical_rate: string
  callsign: string
  onground: string
  alert: string
  spi: string
  squawk: string
  altitude: string
  geoaltitude: string
  last_position?: string
  lastcontact?: string
  hour?: string
  extraField?: string
}

export type CsvDroneRow = {
  name: string,
  icao24: string,
  date: string,
  fixName: string,
  significantPoint: string,
  timeElapsed: string,
  positionLatitude: string,
  positionLongitude: string,
  positionAltitude: string,
  altitudeMax: string,
  airSpeed: string,
  cas: string,
  mach: string,
  heading: string,
  groundSpeed: string,
  distanceToNextWaypoint: string,
  flownDistance: string,
  windEastward: string,
  windNorthward: string,
  windUpward: string,
  route: string,
  mass: string,
  isOneWay: string,

}
