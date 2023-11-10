export class UserModel {
  _id: string = '';
  person: any;
  cover: string = '';
  picture: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  location: LocationModel = new LocationModel();
  token: string = '';
}

export class LocationModel {
  formattedAddress: string = '';
  street: string = '';
  //city: CityModel = new CityModel();
  state: string = '';
  zipcode: string = '';
  country: string = '';
  lng: string = '';
  lat: string = '';
}
