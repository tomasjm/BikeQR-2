import { BarCodeScannerResult } from "expo-barcode-scanner";
import { atom } from "jotai";

export interface ScannedData {
  data: string;
  type: BarCodeScannerResult["type"];
}
export type UserRole = "USER" | "ATTENDANT";


export const bikeAtom = atom<string>("");
export const roleAtom = atom<UserRole>("USER");
export const scannedDataAtom = atom<ScannedData>({ data: "", type: "" });
