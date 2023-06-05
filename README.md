# Data-Converter
This conversion is for ADS-B data only.\
This repo contains 2 tools : a .csv to .sbs file converter and a .sbs to .csv file converter.

## Setup

### Via NPM

```console
npm i @dapia-project/data-converter
```

### By updating package.json

In your `package.json`, add the following:

```json
{
  "dependencies": {
    "@dapia-project/data-converter" : "^1.0.9"
  }
}
```

## Initialization

```typescript
// import CSV to SBS converter
import {convertCSVtoSBS} from '@dapia-project/data-converter/src/CsvToSbs'

const sbsData : string = convertCSVtoSBS(options);


// import SBS to CSV converter
import {convertSBStoCSV} from '@dapia-project/data-converter/src/SbsToCsv'
const csvData : string = convertSBStoCSV(options);
```

## Options
For CSV to SBS :

| key        | type         | use                                | default value |
|------------|--------------|------------------------------------|---------------|
| csvContent | String       | The content of csv file to convert |               |

\
For SBS to CSV :

| key        | type         | use                                | default value |
|------------|--------------|------------------------------------|---------------|
| sbsContent | String       | The content of sbs file to convert |               |


## Order of fields

For SBS files :

| Number   | Field                  |
|----------|------------------------|
| Field 1  | Message type           |
| Field 2  | Transmission type      |
| Field 3  | Session ID             |
| Field 4  | Aircraft ID            |
| Field 5  | HexIdent (ICAO)        |
| Field 6  | Flight ID              |
| Field 7  | Date message generated |
| Field 8  | Time message generated |
| Field 9  | Date message logged    |
| Field 10 | Time message logged    |
| Field 11 | Callsign               |
| Field 12 | Altitude               |
| Field 13 | GroundSpeed            |
| Field 14 | Track                  |
| Field 15 | Latitude               |
| Field 16 | Longitude              |
| Field 17 | VerticalRate           |
| Field 18 | Squawk                 |
| Field 19 | Alert (Squawk change)  |
| Field 20 | Emergency              |
| Field 21 | SPI (Ident)            |
| Field 22 | IsOnGround             |
| Field 23 | ExtraField             |

\
The ExtraField field is a JSON object that contains information present in a converted csv file not present in sbs file. Here is its structure:

```json
{
  "baroaltitude" : "",
  "lastposupdate" : "",
  "lastcontact" : "",
  "hour" : ""
}
```
You can find information about the SBS format here: http://woodair.net/sbs/Article/Barebones42_Socket_Data.htm
\
\
For CSV files :

| Number   | Field         |
|----------|---------------|
| Field 1  | Time          |
| Field 2  | ICAO24        |
| Field 3  | Lat           |
| Field 4  | Lon           |
| Field 5  | Velocity      |
| Field 6  | Heading       |
| Field 7  | Vertrate      |
| Field 8  | Callsign      |
| Field 9  | Onground      |
| Field 10 | Alert         |
| Field 11 | Spi           |
| Field 12 | Squawk        |
| Field 13 | Baroaltitude  |
| Field 14 | Geoaltitude   |
| Field 15 | Lastposupdate |
| Field 16 | Lastcontact   |
| Field 17 | Hour          |
| Field 18 | ExtraField    |

\
The ExtraField field is a JSON object that contains information present in a converted sbs file not present in csv file. Here is its structure:

```json
{
  "messageType" : "",
  "transmissionType" : "",
  "sessionID" : "",
  "aircraftID" : "",
  "flightID" : "",
  "emergency" : ""
}
```