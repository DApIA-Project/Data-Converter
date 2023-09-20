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
  last_position: string
  lastcontact: string
  hour: string
  extraFields?: string
}
