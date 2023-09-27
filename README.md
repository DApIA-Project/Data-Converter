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
    "@dapia-project/data-converter": "^2.4.0"
  }
}
```

## Initialization

Import SBS to JSON converter:

```typescript
import { convertSBStoJSON } from '@dapia-project/data-converter/src/SbsToJson'

const jsonData: string = convertSBStoJSON(options)
```

Import JSON to SBS converter:

```typescript
import { convertJSONtoSBS } from '@dapia-project/data-converter/src/JsonToSbs'

const sbsData: string = convertJSONtoSBS(options)
```

Import SBS to NDJSON converter:

```typescript
import { convertSBStoNDJSON } from '@dapia-project/data-converter/src/SbsToNdjson'

const ndjsonData: string = convertSBStoNDJSON(options)
```

Import NDJSON to SBS converter:

```typescript
import { convertNDJSONtoSBS } from '@dapia-project/data-converter/src/NdjsonToSbs'

const sbsData: string = convertNDJSONtoSBS(options)
```

Import CSV to JSON converter:

```typescript
import { convertCSVtoJSON } from '@dapia-project/data-converter/src/CsvToJson'

const jsonData: string = convertCSVtoJSON(options)
```

Import JSON to CSV converter:

```typescript
import { convertJSONtoCSV } from '@dapia-project/data-converter/src/JsonToCsv'

const csvData: string = convertJSONtoCSV(options)
```

Import CSV to NDJSON converter:

```typescript
import { convertCSVtoNDJSON } from '@dapia-project/data-converter/src/CsvToNdjson'

const ndjsonData: string = convertCSVtoNDJSON(options)
```

Import NDJSON to CSV converter:

```typescript
import { convertNDJSONtoCSV } from '@dapia-project/data-converter/src/NdjsonToCsv'

const csvData: string = convertNDJSONtoCSV(options)
```

Import CSV to SBS converter:

```typescript
import { convertCSVtoSBS } from '@dapia-project/data-converter/src/CsvToSbs'

const sbsData: string = convertCSVtoSBS(options)
```

Import SBS to CSV converter:

```typescript
import { convertSBStoCSV } from '@dapia-project/data-converter/src/SbsToCsv'

const csvData: string = convertSBStoCSV(options)
```

## Options

For SBStoCSV :

| key     | type   | use                            | default value |
| ------- | ------ | ------------------------------ | ------------- |
| content | String | The content of file to convert |               |

\
For all except SBStoCSV :

| key             | type    | use                                             | default value |
| --------------- | ------- | ----------------------------------------------- | ------------- |
| content         | String  | The content of sbs file to convert              |               |
| saveExtraField? | boolean | Choice to have extraField of Format1 in Format2 | false         |

## Order of fields

For SBS files :

| Number         | Field                |
| -------------- | -------------------- |
| Field 1        | messageType          |
| Field 2        | transmissionType     |
| Field 3        | sessionID            |
| Field 4        | aircraftID           |
| Field 5        | icao24               |
| Field 6        | flightID             |
| Field 7        | dateMessageGenerated |
| Field 8        | timeMessageGenerated |
| Field 9        | dateMessageLogged    |
| Field 10       | timeMessageLogged    |
| Field 11       | callsign             |
| Field 12       | geoaltitude          |
| Field 13       | groundspeed          |
| Field 14       | track                |
| Field 15       | latitude             |
| Field 16       | longitude            |
| Field 17       | vertical_rate        |
| Field 18       | squawk               |
| Field 19       | alert                |
| Field 20       | emergency            |
| Field 21       | spi                  |
| Field 22       | onground             |
| Field 23       | haveLabel?           |
| Field 24       | label?               |
| Field 23 or 25 | extraField?          |

\
The HaveLabel and Label fields are not required. But if one is present then so is the other.
\
The ExtraField field is a JSON object that contains information present in a converted csv file not present in sbs file.
Here is its structure:

```json
{
  "altitude": "",
  "last_position": "",
  "lastcontact": "",
  "hour": ""
}
```

You can find information about the SBS format here: http://woodair.net/sbs/Article/Barebones42_Socket_Data.htm
\
\
For CSV files :

The order of the fields below is the order when converting SBS to CSV. However, the order of fields in a CSV file during
a CSV to SBS conversion does not follow a certain pattern.

| Number   | Field         |
| -------- | ------------- |
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
The ExtraField field is a JSON object that contains information present in a converted sbs file not present in csv file.
It is not mandatory to add this field when converting. Here is its structure:

```json
{
  "messageType": "",
  "transmissionType": "",
  "sessionID": "",
  "aircraftID": "",
  "flightID": "",
  "emergency": "",
  "haveLabel?": "",
  "label?": ""
}
```

For JSON and NDJSON files :

| Field                 |
| --------------------- |
| timestamp?            |
| icao24?               |
| latitude?             |
| longitude?            |
| groundspeed?          |
| track?                |
| vertical_rate?        |
| callsign?             |
| onground?             |
| alert?                |
| spi?                  |
| squawk?               |
| altitude?             |
| geoaltitude?          |
| last_position?        |
| lastcontact?          |
| hour?                 |
| messageType?          |
| transmissionType?     |
| sessionID?            |
| aircraftID?           |
| flightID?             |
| emergency?            |
| dateMessageGenerated? |
| timeMessageGenerated? |
| dateMessageLogged?    |
| timeMessageLogged?    |
| haveLabel?            |
| label?                |
