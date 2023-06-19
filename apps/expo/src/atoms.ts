
import { atom } from "jotai"
import { BarCodeScannerResult } from "expo-barcode-scanner";
export interface ScannedData {
  data: string;
  type: BarCodeScannerResult["type"]
}

export const bikeAtom = atom<string>("");
export const scannedDataAtom = atom<ScannedData>({ data: "", type: "" });
