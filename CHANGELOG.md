# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased](https://github.com/DApIA-Project/Data-Converter/compare/v5.0.0...main)

### Info

### Added

### Changed

### Deprecated

### Removed

### Fixed


## [v5.0.0](https://github.com/DApIA-Project/Data-Converter/compare/v4.0.0...v5.0.0)

### Added

- 2 new types of converters `JsonToNdjson` and `NdjsonToJson`
- Option mustMerge 
- Unit Tests

## [v4.0.0](https://github.com/DApIA-Project/Data-Converter/compare/v3.3.0...v4.0.0)

### Added

- 8 new types of converters `SbsToDroneCsv`,`DroneCsvToSbs`,`DroneCsvToNdjson`,`NdjsonToDroneCsv`,`OpenskyCsvToDroneCsv`,`DroneCsvToOpenskyCsv`,`DroneCsvToJson`
  and `JsonToDroneCsv`
- Unit Tests

### Changed

- rename `csvToJson` to `openskyCsvToJson`
- rename `csvToNdjson` to `openskyCsvToNdjson`
- rename `jsonToCsv` to `jsonToOpenskyCsv`
- rename `ndjsonToCsv` to `ndjsonToOpenskyCsv`
- rename `csvToSbs` to `openskyCsvToSbs`
- rename `sbsToCsv` to `sbsToOpenskyCsv`

## [v3.3.0](https://github.com/DApIA-Project/Data-Converter/compare/v3.2.1...v3.3.0)

### Added

- Add option to save ExtraField in sbsToCsv

## [v3.2.1](https://github.com/DApIA-Project/Data-Converter/compare/v3.2.0...v3.2.1)

### Fixed

- Replace '\n\n' by '' in file content

## [v3.2.0](https://github.com/DApIA-Project/Data-Converter/compare/v3.1.0...v3.2.0)

### Changed

- Fields `last_position`, `lastcontact` and `hour` are optional

## [v3.1.0](https://github.com/DApIA-Project/Data-Converter/compare/v3.0.3...v3.1.0)

### Changed

- Command line have changed. The output is a path and not only the extension.

## [v3.0.3](https://github.com/DApIA-Project/Data-Converter/compare/v3.0.0...v3.0.3)

### Added

- Add command line 

## [v3.0.0](https://github.com/DApIA-Project/Data-Converter/compare/v2.4.0...v3.0.0)

### Changed

- rename `convertCSVtoJSON` to `csvToJson`
- rename `convertCSVtoNDJSON` to `csvToNdjson`
- rename `convertJSONtoSBS` to `jsonToSbs`
- rename `convertNDJSONtoSBS` to `ndjsonToSbs`
- rename `convertSBStoJSON` to `sbsToJson`
- rename `convertSBStoNDJSON` to `sbsToNdjson`
- rename `convertCSVtoSBS` to `csvToSbs`
- rename `convertSBStoCSV` to `sbsToCsv`
- `csvToJson` now returns a JSON object
- `sbsToJson` now returns a JSON object

## [v2.4.0](https://github.com/DApIA-Project/Data-Converter/compare/v2.3.0...v2.4.0)

### Changed

- Ability to save extraFields
  in `SbsToJson`,`JsonToSbs`,`SbsToNdjson`,`NdjsonToSbs`,`CsvToJson`,`JsonToCsv`,`CsvToNdjson` and `NdjsonToCsv`
- Unit tests

## [v2.3.0](https://github.com/DApIA-Project/Data-Converter/compare/v2.2.0...v2.3.0)

### Added

- 8 new types of converters `SbsToJson`,`JsonToSbs`,`SbsToNdjson`,`NdjsonToSbs`,`CsvToJson`,`JsonToCsv`,`CsvToNdjson`
  and `NdjsonToCsv` without extraField
- Unit tests

## [v2.2.0](https://github.com/DApIA-Project/Data-Converter/compare/v2.1.0...v2.2.0)

### Changed

- Field names for csv files have been changed

## [v2.1.0](https://github.com/DApIA-Project/Data-Converter/compare/v2.0.0...v2.1.0)

### Added

- Possibility to have the `haveLabel` and `label` fields within the `extraField` of the csv.

### Changed

- Tests for `CsvToSbs` and for `SbsToCsv` for label field

## [v2.0.0](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.11...v2.0.0)

### Added

- Tests for `CsvToSbs` and for `SbsToCsv`

### Changed

- Addition of boolean option when converting SBS to CSV which allows to have the extraField field in the CSV.
  Function : `convertSBStoCSV`, default value : `false`
- When converting CSV to SBS, the order of CSV fields can be any.
- Using the csv-parse library to parse the csv in `convertCSVtoSBS` function
- Update README.md

## [v1.0.11](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.10...v1.0.11)

### Changed

- Verification of empty lines in string

## [v1.0.10](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.9...v1.0.10)

### Added

- Tests for `CsvToSbs.ts` and `SbsToCsv.ts`

### Changed

- File `README.md`

## [v1.0.9](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.8...v1.0.9)

### Changed

- File `npm-publish.yml`

## [v1.0.8](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.7...v1.0.8)

### Changed

- File `package.json`
- File `tsconfig.json`

## [v1.0.7](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.6...v1.0.7)

### Changed

- File `package.json`

## [v1.0.6](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.5...v1.0.6)

### Changed

- File `.npmignore`

## [v1.0.5](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.4...v1.0.5)

### Added

- File `.npmignore`

## [v1.0.4](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.3...v1.0.4)

### Changed

- Modify `tsconfig.json` and `package.json` for imports

## [v1.0.3](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.2...v1.0.3)

### Changed

- Move `index.ts` in `src/`

## [v1.0.2](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.0...v1.0.2)

### Info

- Release for npm publish

## [v1.0.0](https://github.com/DApIA-Project/Data-Converter/compare/old...new)

### Info

- First version
- Tool to convert .csv file to .sbs file
- Tool to convert .sbs file to .csv file

### Added

- Script `convertCSVtoSBS`
- Script `convertSBStoCSV`
