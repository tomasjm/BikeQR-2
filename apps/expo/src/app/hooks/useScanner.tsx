import { useState } from "react";
import { BarCodeScannerResult } from "expo-barcode-scanner";

export interface ScannerHook {
  scanned: boolean;
  hasPermission: boolean | null;
  type?: BarCodeScannerResult["type"];
  data?: BarCodeScannerResult["data"];
  handleBarCodeScanned: (args: BarCodeScannerResult) => void;
  setHasPermission: (hasPermission: boolean) => void;
  setScanned: (scanned: boolean) => void;
}

function useScanner() {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<BarCodeScannerResult["type"]>("");
  const [data, setData] = useState<BarCodeScannerResult["data"]>("");

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    setType(type);
    setData(data);
  };

  return {
    scanned,
    hasPermission,
    type,
    data,
    handleBarCodeScanned,
    setHasPermission,
    setScanned,
  };
}

export default useScanner;
