export enum IRol {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

interface IUser {
  uuid: string;
  firstName: string;
  lastName: string,
  user_name: string,
  birthday: string;
  email: string;
  address: string;
  country:string;
  phone: string;
  password: string;
  isActive?: boolean;
  rol?: IRol;
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



interface ISendEmailData {
  to: string;
  subject: string;
  message: string;
}


interface IUserContextType {
  user: Partial<IUser> | null;
  setUser: (user: Partial<IUser> | null) => void;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILogin) => Promise<boolean>;
  signUp: (user: Omit<IUser, "uuid">) => Promise<boolean>;
  signUpOwner: (uuid: string, ownerData: IRegisterOwner) => Promise<boolean>;
  logOut: () => void;
  sendEmail: (emailData: ISendEmailData) => Promise<boolean>; // Actualiza aquí
}


export enum PropertyType {
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
  propImg: IPropertyImg[];
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

interface IRegisterOwner {
  bussines_name: string;
  bussinesId: string;
  email: string,
  phone: string
}

export enum IRoomState {
  Avaiable = 'avaiable',
  Reserved = 'reserved',
  Occupied = 'occupied',
  Maintenance = 'maintenance',
}


interface IRoom {
  uuid: string;
  room_number: number;
  category: ICategories;
  capacity: number;
  price_per_day: number;
  disponibility: IRoomState;
  img: IRoomImg[];
  reservation: IReservation[];
  property: IProperty;
  roomServices?: IRoomService;
}


interface IRoomService {
    uuid: string;
    serviceName: string;
    room: IRoom;
}

export enum ICategories{
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
  user:Partial<IUser>; 
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
  user_name: string
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
    IProperty,
    IPropertyImg,
    IReservation,
    IProfile,
    IOrderDetail,
    IRegisterOwner,
    ISendEmailData
  }