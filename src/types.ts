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
  "timeElapsed (s)": string,
  "position.latitude (deg)": string,
  "position.longitude (deg)": string,
  "position.altitude (ft)": string,
  "altitudeMax (ft)": string,
  "airSpeed (kt)": string,
  "cas (kt)": string,
  mach: string,
  "heading (deg)": string,
  "groundSpeed (kt)": string,
  "distanceToNextWaypoint (NM)": string,
  "flownDistance (NM)": string,
  "wind.eastward (kt)": string,
  "wind.northward (kt)": string,
  "wind.upward (ft/min)": string,
  "route (deg)": string,
  "mass (kg)": string,
  isOneWay: string,
  extraField?: string

}
