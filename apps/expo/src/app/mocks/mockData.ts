import { DataList } from "types";

export const mockData: DataList = [
  {
    id: 1,
    title: "Registro de Bicicletas",
    role: ["USER"],
    screen: "/BikeRegister",
    image: require("../../resources/bikeRegistry.png"),
  },
  {
    id: 2,
    title: "Ingreso de Bicicletas",
    screen: "/StartStorage",
    role: ["ATTENDANT", "USER"],
    image: require("../../resources/parkingBike.jpg"),
  },
  {
    id: 3,
    title: "Estado de Bicicletas",
    screen: "/Status",
    role: ["USER"],
    image: require("../../resources/bikeStatus.jpg"),
  },
  {
    id: 4,
    title: "Retiro de Bicicletas",
    role: ["ATTENDANT", "USER"],
    screen: "/FinishStorage",
    image: require("../../resources/parkingBikeReverse.png"),
  },
];
