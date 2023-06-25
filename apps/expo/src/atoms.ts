import { BarCodeScannerResult } from "expo-barcode-scanner";
import { atom } from "jotai";

export interface ScannedData {
  data: string;
  type: BarCodeScannerResult["type"];
}

export const bikeAtom = atom<string>("");
export const scannedDataAtom = atom<ScannedData>({ data: "", type: "" });
