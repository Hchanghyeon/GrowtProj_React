import dotenv from "dotenv";
dotenv.config();

function required(key: string, defaultValue = undefined): any {
  const value: any = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
}
export const config: any = {
  http: {
    BASE_URL: required("REACT_APP_BASE_URL"),
  }
};
