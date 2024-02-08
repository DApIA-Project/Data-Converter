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

export interface ExtraFieldsOpenskyCSV {
  altitude: string
  last_position: string
  lastcontact: string
  hour: string
}

export type JsonMessage = Record<string, string | boolean | number | undefined>

export type CsvOpenskyRow = {
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
  "position.latitude": string,
  "position.longitude": string,
  "position.altitude": string,
  altitudeMax: string,
  airSpeed: string,
  cas: string,
  mach: string,
  heading: string,
  groundspeed: string,
  distanceToNextWaypoint: string,
  flownDistance: string,
  "wind.eastward": string,
  "wind.northward": string,
  "wind.upward": string,
  route: string,
  mass: string,
  isOneWay: string,
  extraField?: string

}
