![Data Converter Tests workflow](https://github.com/DApIA-Project/Data-Converter/actions/workflows/dataconverter.yml/badge.svg)

# Data-Converter
This conversion is for ADS-B data only.\
This library contains several conversion tools for ADS-B messages. We find :
- SBS to JSON
- JSON to SBS
- SBS to NDJSON
- NDJSON to SBS
- CSV to JSON
- JSON to CSV
- CSV to NDJSON
- NDJSON to CSV
- SBS to CSV
- CSV to SBS

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
    "@dapia-project/data-converter" : "^2.3.0"
  }
}
```

## Initialization

```typescript
// import SBS to JSON converter
import {convertSBStoJSON} from '@dapia-project/data-converter/src/SbsToJson'
const jsonData : string = convertSBStoJSON(options);


// import JSON to SBS converter
import {convertJSONtoSBS} from '@dapia-project/data-converter/src/JsonToSbs'
const sbsData : string = convertJSONtoSBS(options);


// import SBS to NDJSON converter
import {convertSBStoNDJSON} from '@dapia-project/data-converter/src/SbsToNdjson'
const ndjsonData : string = convertSBStoNDJSON(options);


// import NDJSON to SBS converter
import {convertNDJSONtoSBS} from '@dapia-project/data-converter/src/NdjsonToSbs'
const sbsData : string = convertNDJSONtoSBS(options);


// import CSV to JSON converter
import {convertCSVtoJSON} from '@dapia-project/data-converter/src/CsvToJson'
const jsonData : string = convertCSVtoJSON(options);


// import JSON to CSV converter
import {convertJSONtoCSV} from '@dapia-project/data-converter/src/JsonToCsv'
const csvData : string = convertJSONtoCSV(options);


// import CSV to NDJSON converter
import {convertCSVtoNDJSON} from '@dapia-project/data-converter/src/CsvToNdjson'
const ndjsonData : string = convertCSVtoNDJSON(options);


// import NDJSON to CSV converter
import {convertNDJSONtoCSV} from '@dapia-project/data-converter/src/NdjsonToCsv'
const csvData : string = convertNDJSONtoCSV(options);


// import CSV to SBS converter
import {convertCSVtoSBS} from '@dapia-project/data-converter/src/CsvToSbs'

const sbsData : string = convertCSVtoSBS(options);


// import SBS to CSV converter
import {convertSBStoCSV} from '@dapia-project/data-converter/src/SbsToCsv'
const csvData : string = convertSBStoCSV(options);
```

## Options
For all except SBStoCSV :

| key     | type         | use                            | default value |
|---------|--------------|--------------------------------|---------------|
| content | String       | The content of file to convert |               |

\
For SBS to CSV :

| key             | type    | use                                     | default value |
|-----------------|---------|-----------------------------------------|---------------|
| sbsContent      | String  | The content of sbs file to convert      |               |
| saveExtraField? | boolean | Choice to have extraField of SBS in CSV | false         |


## Order of fields

For SBS files :

| Number       | Field                  |
|--------------|------------------------|
| Field 1      | Message type           |
| Field 2      | Transmission type      |
| Field 3      | Session ID             |
| Field 4      | Aircraft ID            |
| Field 5      | HexIdent (ICAO)        |
| Field 6      | Flight ID              |
| Field 7      | Date message generated |
| Field 8      | Time message generated |
| Field 9      | Date message logged    |
| Field 10     | Time message logged    |
| Field 11     | Callsign               |
| Field 12     | Altitude               |
| Field 13     | GroundSpeed            |
| Field 14     | Track                  |
| Field 15     | Latitude               |
| Field 16     | Longitude              |
| Field 17     | VerticalRate           |
| Field 18     | Squawk                 |
| Field 19     | Alert (Squawk change)  |
| Field 20     | Emergency              |
| Field 21     | SPI (Ident)            |
| Field 22     | IsOnGround             |
| Field 23     | HaveLabel?             |
| Field 24     | Label?                 |
| Field 23 or 25 | ExtraField             |

\
The HaveLabel and Label fields are not required. But if one is present then so is the other.
\
The ExtraField field is a JSON object that contains information present in a converted csv file not present in sbs file. Here is its structure:

```json
{
  "altitude" : "",
  "last_position" : "",
  "lastcontact" : "",
  "hour" : ""
}
```
You can find information about the SBS format here: http://woodair.net/sbs/Article/Barebones42_Socket_Data.htm
\
\
For CSV files :

The order of the fields below is the order when converting SBS to CSV. However, the order of fields in a CSV file during a CSV to SBS conversion does not follow a certain pattern.

| Number   | Field         |
|----------|---------------|
| Field 1  | timestamp     |
| Field 2  | icao24        |
| Field 3  | latitude      |
| Field 4  | longitude     |
| Field 5  | groundspeed   |
| Field 6  | track         |
| Field 7  | vertical_rate |
| Field 8  | callsign      |
| Field 9  | onground      |
| Field 10 | alert         |
| Field 11 | spi           |
| Field 12 | squawk        |
| Field 13 | altitude      |
| Field 14 | geoaltitude   |
| Field 15 | last_position |
| Field 16 | lastcontact   |
| Field 17 | hour          |
| Field 18 | extraField?   |

\
The ExtraField field is a JSON object that contains information present in a converted sbs file not present in csv file. It is not mandatory to add this field when converting. Here is its structure:

```json
{
  "messageType" : "",
  "transmissionType" : "",
  "sessionID" : "",
  "aircraftID" : "",
  "flightID" : "",
  "emergency" : "",
  "haveLabel?" : "",
  "label?" : ""
}
```
\
The ExtraField are only for CsvToSbs and SbsToCsv converters.