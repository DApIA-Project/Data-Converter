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
    "@dapia-project/data-converter": "^3.3.0"
  }
}
```

## Initialization

Import SBS to JSON converter:

```typescript
import { sbsToJson } from '@dapia-project/data-converter/src/sbsToJson'

const jsonData: string = sbsToJson(options)
```

Import JSON to SBS converter:

```typescript
import { jsonToSbs } from '@dapia-project/data-converter/src/jsonToSbs'

const sbsData: string = jsonToSbs(options)
```

Import SBS to NDJSON converter:

```typescript
import { sbsToNdjson } from '@dapia-project/data-converter/src/sbsToNdjson'

const ndjsonData: string = sbsToNdjson(options)
```

Import NDJSON to SBS converter:

```typescript
import { ndjsonToSbs } from '@dapia-project/data-converter/src/ndjsonToSbs'

const sbsData: string = ndjsonToSbs(options)
```

Import CSV to JSON converter:

```typescript
import { csvToJson } from '@dapia-project/data-converter/src/csvToJson'

const jsonData: string = csvToJson(options)
```

Import JSON to CSV converter:

```typescript
import { jsonToCsv } from '@dapia-project/data-converter/src/jsonToCsv'

const csvData: string = jsonToCsv(options)
```

Import CSV to NDJSON converter:

```typescript
import { csvToNdjson } from '@dapia-project/data-converter/src/csvToNdjson'

const ndjsonData: string = csvToNdjson(options)
```

Import NDJSON to CSV converter:

```typescript
import { ndjsonToCsv } from '@dapia-project/data-converter/src/ndjsonToCsv'

const csvData: string = ndjsonToCsv(options)
```

Import CSV to SBS converter:

```typescript
import { csvToSbs } from '@dapia-project/data-converter/src/csvToSbs'

const sbsData: string = csvToSbs(options)
```

Import SBS to CSV converter:

```typescript
import { sbsToCsv } from '@dapia-project/data-converter/src/sbsToCsv'

const csvData: string = sbsToCsv(options)
```

## Options

For all :

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

| Number   | Field          |
| -------- |----------------|
| Field 1  | timestamp      |
| Field 2  | icao24         |
| Field 3  | latitude       |
| Field 4  | longitude      |
| Field 5  | groundspeed    |
| Field 6  | track          |
| Field 7  | vertical_rate  |
| Field 8  | callsign       |
| Field 9  | onground       |
| Field 10 | alert          |
| Field 11 | spi            |
| Field 12 | squawk         |
| Field 13 | altitude       |
| Field 14 | geoaltitude    |
| Field 15 | last_position? |
| Field 16 | lastcontact?   |
| Field 17 | hour?          |
| Field 18 | extraField?    |

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

## Commands line

You can also run a command line conversion like this:

First, download library globally :
```shell
npm i @dapia-project/data-converter -g
```


Then :
```shell
data-converter --file "path/to/fileToConvert.ext" --output "path/to/fileWillBeConvert.ext"
```
Possible extension types are `.sbs`, `.csv`, `.json` and `.ndjson`
