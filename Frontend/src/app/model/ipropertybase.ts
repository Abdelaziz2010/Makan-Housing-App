export interface Ipropertybase {
  id: number;
  name: string;
  propertyType: string;
  furnishingType: string;
  sellRent: number;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  readyToMove: boolean;
  photo?: string;
  estPossessionOn?: string;
}
