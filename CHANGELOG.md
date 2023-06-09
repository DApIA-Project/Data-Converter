# Changelog

All notable changes to this project will be documented in this file.


## [Unreleased](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.1...main)

### Info

### Added

### Changed

### Deprecated

### Removed

### Fixed

## [v2.0.0](https://github.com/DApIA-Project/Data-Converter/compare/v1.0.11...v2.0.0)

### Added

- Tests for `CsvToSbs` and for `SbsToCsv`

### Changed

- Addition of boolean option when converting SBS to CSV which allows to have the extraField field in the CSV. Function : `convertSBStoCSV`, default value : `false`
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
