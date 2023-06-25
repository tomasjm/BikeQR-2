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
    role: ["ATTENDANT"],
    image: require("../../resources/parkingBike.jpg"),
  },
  {
    id: 3,
    title: "Ingreso de Bicicletas",
    screen: "/StoreBike",
    role: ["USER"],
    image: require("../../resources/parkingBike.jpg"),
  },
  {
    id: 4,
    title: "Estado de Bicicletas",
    screen: "/UserBikeList",
    role: ["USER"],
    image: require("../../resources/bikeStatus.jpg"),
  },
  {
    id: 5,
    title: "Retiro de Bicicletas",
    role: ["ATTENDANT"],
    screen: "/FinishStorage",
    image: require("../../resources/parkingBikeReverse.png"),
  },
];
