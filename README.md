# Data-Converter

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
    "@dapia-project/data-converter" : "^1.0.3"
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

