import { JsonMessage } from '../types'
import { getTimestampFromDroneToCsv, toCsvOpenskyTimestamp } from './utils'

export function mergeMessages(messages: JsonMessage[]): JsonMessage[] {
  const mergedMap = new Map<string, JsonMessage>();
  const lastValidMessages = new Map<string, JsonMessage>();

  const validCoordsFound = new Map<string, boolean>();
  const filteredMessages = messages.filter((message) => {
    let icao = message.icao24 as string;
    if (message.hexIdent) {
      icao = message.hexIdent as string;
    }

    if (validCoordsFound.get(icao)) {
      return true; // Conserver ce message
    }

    const hasCoords = ((message['latitude'] !== undefined && message['latitude'] !== "") &&
      (message['longitude'] !== undefined && message['longitude'] !== "") || (message['position.latitude'] !== undefined && message['position.latitude'] !== "") &&
      (message['position.longitude'] !== undefined && message['position.longitude'] !== ""));

    if (hasCoords) {
      validCoordsFound.set(icao, true);
    }

    return hasCoords;
  });

  filteredMessages.forEach((message) => {
    let key: string;
    key = `${message.timestamp}-${message.icao24}`;
    if (message.dateMessageGenerated) {
      key = `${toCsvOpenskyTimestamp(message.dateMessageGenerated as string, message.timeMessageGenerated as string)}-${message.hexIdent}`;
    }
    if (message.date) {
      key = `${getTimestampFromDroneToCsv(message.date as string)}-${message.icao24}`;
    }

    let icao = message.icao24 as string;
    if (message.hexIdent) {
      icao = message.hexIdent as string;
    }

    const newMessage = { ...message };
    const lastValidMessage = lastValidMessages.get(icao);

    if (!mergedMap.has(key)) {
      if (lastValidMessage) {
        for (const field in lastValidMessage) {
          if ((newMessage[field] === undefined || newMessage[field] === "") && lastValidMessage[field] !== undefined) {
            newMessage[field] = lastValidMessage[field];
          }
        }
      }

      mergedMap.set(key, newMessage);
      lastValidMessages.set(icao, { ...newMessage });

    } else {
      const existingMessage = mergedMap.get(key)!;
      for (const field in message) {
        if (message[field] !== undefined && message[field] !== "") {
          existingMessage[field] = message[field];
        }
      }
      mergedMap.set(key, existingMessage);
      lastValidMessages.set(icao, { ...existingMessage });
    }
  });

  return Array.from(mergedMap.values());
}