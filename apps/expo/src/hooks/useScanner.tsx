import { useState } from "react";
import { BarCodeScanner, type BarCodeScannerResult } from "expo-barcode-scanner";

export interface ScannerHook {
  scanned: boolean;
  hasPermission: boolean | null;
  data?: BarCodeScannerResult["data"];
  handleBarCodeScanned: (args: BarCodeScannerResult) => void;
  setHasPermission: (hasPermission: boolean) => void;
  setScanned: (scanned: boolean) => void;
}
type UseScannerProps = {
  type: BarCodeScannerResult["type"][];
};
function useScanner({ type: expectedType }: UseScannerProps) {
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [data, setData] = useState<BarCodeScannerResult["data"]>("");
  const [type, setType] = useState<BarCodeScannerResult["type"]>("");
  const [error, setError] = useState(false);

  const handleBarCodeScanned = ({
    type: scannedType,
    data,
  }: BarCodeScannerResult) => {
    setScanned(true);
    if (expectedType.includes(scannedType)) {
      setData(data);
      setType(scannedType);
      setError(false);
    } else {
      setError(true);
    }
   
  };

  return {
    scanned,
    type,
    hasPermission,
    data,
    handleBarCodeScanned,
    setHasPermission,
    setScanned,
    error,
  };
}

export default useScanner;
