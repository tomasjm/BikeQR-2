
import { atom } from "jotai"
import { BarCodeScannerResult } from "expo-barcode-scanner";
export interface ScannedData {
  data: string;
  type: BarCodeScannerResult["type"]
}
export type UserRole = "USER" | "ATTENDANT";


export const bikeAtom = atom<string>("");
export const roleAtom = atom<UserRole>("USER");
export const scannedDataAtom = atom<ScannedData>({ data: "", type: "" });
