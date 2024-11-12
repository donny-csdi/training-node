import fs from "fs";

function formatResponse(status: number, message: string, data: any = null) {
  return {
    status,
    message,
    data,
  };
}

function logHistory(
  operation: string,
  numA: number,
  numB: number,
  result: number
) {
  const history = {
    operation,
    numA,
    numB,
    result,
    date: new Date(),
  };

  const historyFile = "history.json";

  if (!fs.existsSync(historyFile)) {
    fs.writeFileSync(historyFile, "[]");
  } else {
    const historyData = JSON.parse(fs.readFileSync(historyFile, "utf-8"));
    historyData.push(history);
    fs.writeFileSync(historyFile, JSON.stringify(historyData));
  }
}

export function createError(message: string, statusCode: number) {
  const error: any = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function readJSONFile(filepath: string) {
  try {
    const data = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error(`Failed to readt or parse file at ${filepath}:`, error);
    return [];
  }
}

function writeJSONFile(filepath: string, data: any) {
  try {
    fs.writeFileSync(filepath, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to write file at ${filepath}:`, error);
  }
}

export { formatResponse, logHistory, readJSONFile, writeJSONFile };
