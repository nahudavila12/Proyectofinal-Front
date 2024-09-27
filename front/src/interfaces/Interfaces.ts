export enum IRole {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

interface IUser {
  uuid: number;
  name: string;
  birthday: string;
  email: string;
  address: string;
  country:string;
  phone: string;
  password: string;
  isActive?: boolean;
  role?: IRole;
  profile?: IProfile;
  owner?: IOwner;
  orderdetail?: IOrderDetail;
  reservation?: IReservation; 
}

interface IProfile{
  uuid: string;
  user_name: string; 
  mail: string; 
  phone: string;
  address: string;
  password: string;
  userIMG: string;
  user: IUser;
}

interface IUserContextType {
  user: Partial<IUserResponse> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserResponse> | null>>,
  isLogged: boolean,
  setIsLogged: (isLogged: boolean) => void,
  signIn: (credentials: ILogin) => Promise<boolean>,
  signUp: (user: Omit<IUser, "uuid">) => Promise<boolean>,
  // getOrders: () => void,
  // orders: IOrderResponse[] | [],
  logOut: () => void,
}

enum PropertyType {
  HOTEL = 'hotel',
  CABANA = 'cabaña',
  DEPARTAMENTO = 'departamento',
}

interface IProperty {
  uuid: string;
  name: string;
  location: string;
  propertyType: PropertyType;
  rate: number;
  isActive: boolean;
  img: IPropertyImg[];
  owner: IOwner;
  room: IRoom[];
}



interface IPropertyImg {
  uuid: string;
  img: string;
  property: IProperty;
}

interface IOwner {
  uuid: string;
  bussines_name: string;
  user: IUser;
  property: IProperty[];

}

enum IRoomState {
  Avaiable = 'avaiable',
  Reserved = 'reserved',
  Occupied = 'occupied',
  Maintenance = 'maintenance',
}


interface IRoom {
  uuid: string;
  room_number: number;
  category: IRoomCategory;
  capacity: number;
  price_per_day: number;
  disponibility: IRoomState;
  img: IRoomImg[];
  reservation: IReservation[];
  property: IProperty;
  roomServices?: IRoomService;
}


interface IRoomService {
    id: string;
    serviceName: string;
    room: IRoom;
}

enum ICategories{
  STANDARD = 'standard',
  DELUXE = 'deluxe',
  SUITE = 'suite'
}

interface IRoomCategory {
  id: number;
  name: ICategories; 
  description: string;
  rooms: IRoom[];
}


interface IRoomImg {  
    uuid: string;
    img: string; 
    room: IRoom; 
}

export enum IStateBooking {
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}


interface IReservation {
  uuid: string;
  state: IStateBooking;
  checkIn: Date;
  checkOut: Date;
  user: IUser; 
  room: IRoom; 
  order_detail: IOrderDetail;
}


interface IOrderDetail {
  uuid: string;
  date: Date; 
  room_total: number;
  additionals_services_total: number;
  total: number;
  payment: IPayment;
  additionalServiceOrderDetail?: IOrderDetailAdditionalService; 
  user: IUser;
  reservation: IReservation;
}

interface IOrderDetailAdditionalService {
  uuid: string;
  total: number;
  additionalService: IAdditionalService[];
  orderDetail: IOrderDetail;
}

export enum IState {
  Pending = 'pending',
  Successful = 'successful',
  Refused = 'refused',
}


interface IPayment {
  uuid: string;
  date: Date;
  state: IState;
  method: string;
  orderDetail: IOrderDetail;
}


interface IAdditionalService {
  id: number;
  description: string;
  price_per_person: number;
  orderDetailAdditionalService: IOrderDetailAdditionalService;
}

interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
}

interface ILogin {
  email: string,
  password: string

}

interface IRegisterUser {
  name: string;
  email: string;
  birthday: string;
  password: string;
  address: string;
  phone: string;
}

interface INavbarContextType {
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
  }

interface IRoomType {
  id?: string
  name: string
  price: number
}

interface IHotelData {
  id?: number
  name: string
  features: string
  services: string
  images: File[]
  roomTypes: IRoomType[]
}

interface IHotelFormProps {
  initialData?: IHotelData
}




export type {
    ILogin,
    IRegisterUser,
    IUserResponse,
    IUser,
    IUserContextType,
    INavbarContextType,
    IHotelFormProps,
    IHotelData,
    IRoomType,
    IOwner,
    IRoom,
    IRoomCategory,
    ICategories,
    IProperty,
    IPropertyImg,
    PropertyType,
    IReservation,
    IRoomState,
    IProfile,
    IOrderDetail,
  }