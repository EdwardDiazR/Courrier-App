interface Customer {}

interface Address {
  latitude: number;
  longitude: number;
  display_name: string;
  road: string;
  neighbourhood: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface RegisterDto {
  sucursal: string;
  idType: string;
  nationalId: string;
  nationalIdCountry: string;
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  gender: string;
  email: string;
  phone: string;
  address: string | Address;
  password: string;
}

export { RegisterDto };
