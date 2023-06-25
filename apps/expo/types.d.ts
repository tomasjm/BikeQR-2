export interface Data {
  id: number;
  title: string;
  role: string[] | string;
  screen: string;
  image: any;
}
export interface BikeData {
  code: string;
  createdAt: string;
  title: string;
  id: string;
  updatedAt: string;
  userId: string;
}

export interface CardType {
  id: number;
  title: string;
  image: any;
}
export type BikeDataList = BikeData[];

export type DataList = Data[];
