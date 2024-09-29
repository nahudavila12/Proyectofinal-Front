import { ICategories, IProperty, IRoomState, IUser, PropertyType } from "@/interfaces/Interfaces";

// Definición de usuarios
const users: IUser[] = [
    {
      uuid: "user-uuid-1",
      name: "John Doe",
      birthday: "1990-01-01",
      email: "john@example.com",
      address: "123 Main St",
      country: "USA",
      phone: "1234567890",
      password: "password123",
      isActive: true,
    },
    {
      uuid: "user-uuid-2",
      name: "Jane Smith",
      birthday: "1992-02-02",
      email: "jane@example.com",
      address: "456 Main St",
      country: "Canada",
      phone: "0987654321",
      password: "password456",
      isActive: true,
    },
    {
      uuid: "user-uuid-3",
      name: "Carlos Pérez",
      birthday: "1985-03-03",
      email: "carlos@example.com",
      address: "789 Main St",
      country: "Mexico",
      phone: "1122334455",
      password: "password789",
      isActive: true,
    },
    {
      uuid: "user-uuid-4",
      name: "Maria García",
      birthday: "1995-04-04",
      email: "maria@example.com",
      address: "321 Main St",
      country: "Spain",
      phone: "5566778899",
      password: "password101",
      isActive: true,
    },
    {
      uuid: "user-uuid-5",
      name: "Akira Tanaka",
      birthday: "1988-05-05",
      email: "akira@example.com",
      address: "654 Main St",
      country: "Japan",
      phone: "2233445566",
      password: "password202",
      isActive: true,
    },
    {
      uuid: "user-uuid-6",
      name: "Fatima El-Mansouri",
      birthday: "1993-06-06",
      email: "fatima@example.com",
      address: "789 Elm St",
      country: "Morocco",
      phone: "3344556677",
      password: "password303",
      isActive: true,
    },
    {
      uuid: "user-uuid-7",
      name: "Oliver Johnson",
      birthday: "1991-07-07",
      email: "oliver@example.com",
      address: "234 Pine St",
      country: "UK",
      phone: "4455667788",
      password: "password404",
      isActive: true,
    },
    {
      uuid: "user-uuid-8",
      name: "Sofia Rodríguez",
      birthday: "1989-08-08",
      email: "sofia@example.com",
      address: "876 Maple St",
      country: "Argentina",
      phone: "9988776655",
      password: "password505",
      isActive: true,
    },
    {
      uuid: "user-uuid-9",
      name: "Liam Brown",
      birthday: "1994-09-09",
      email: "liam@example.com",
      address: "543 Birch St",
      country: "Australia",
      phone: "6677889900",
      password: "password606",
      isActive: true,
    },
    {
      uuid: "user-uuid-10",
      name: "Nina Petrova",
      birthday: "1990-10-10",
      email: "nina@example.com",
      address: "321 Oak St",
      country: "Russia",
      phone: "5566778899",
      password: "password707",
      isActive: true,
    },
  ];
export const mockData: IProperty[] = 
[
    {
        uuid: "property-uuid-1",
        name: "Hotel Paraíso",
        location: "Playa del Carmen",
        propertyType: PropertyType.HOTEL,
        rate: 4.5,
        isActive: true,
        owner: { 
          uuid: "owner-uuid-1", 
          bussines_name: "Owner Name 1", 
          user: users[0], 
          property: [] // Asegúrate de enlazar las propiedades de este owner si es necesario
        },
        img: [
          { uuid: "img-uuid-1", img: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539006/hotel_1_jazez1.jpg", property: {} as IProperty },
        ],
        room: [
          {
            room_number: 101,
            capacity: 2,
            price_per_day: 150,
            disponibility: IRoomState.Avaiable,
            img: [
                { uuid: "img-uuid-1", img: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539006/hotel_1_jazez1.jpg"},
              ],
            services: ["WiFi", "Desayuno"],
            category: ICategories.STANDARD
          },
          {
            room_number: 102,
            capacity: 4,
            price_per_day: 200,
            disponibility: IRoomState.Avaiable,
            roomImages: ["room3.jpg"],
            services: ["WiFi", "Estacionamiento"],
            category: "STANDARD"
          }
        ]
      },
    {   
        "uuid": "property-uuid-2",
        "name": "Cabaña en la Montaña",
        "location": "San Martín de los Andes",
        "owner": { 
            "uuid": "owner-uuid-2", 
            "bussines_name": "Owner Name 2", 
            "user": users[1], 
            "property": []
        },
        "propertyType": PropertyType.CABANA,
        img: [
            { uuid: "img-uuid-1", img: "https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539006/hotel_1_jazez1.jpg", property: {} as IProperty },
          ],
        "rooms": [
            {
                "room_number": 1,
                "capacity": 3,
                "price_per_day": 100,
                "disponibility": "avaiable",
                "roomImages": ["room4.jpg"],
                "services": ["WiFi", "Chimenea"],
                "category": "STANDARD"
            }
        ]
    },
    {
        "uuid": "property-uuid-3",
        "name": "Departamento Centro",
        "location": "Buenos Aires",
        "owner": { 
            "uuid": "owner-uuid-3", 
            "bussines_name": "Owner Name 3", 
            "user": users[2], 
            "property": []
        },
        "propertyType": PropertyType.DEPARTAMENTO,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539011/suite_5_qqnvmz.jpg"],
        "rooms": [
            {
                "room_number": 1,
                "capacity": 2,
                "price_per_day": 120,
                "disponibility": "avaiable",
                "roomImages": ["room5.jpg"],
                "services": ["WiFi"],
                "category": "STANDARD"
            }
        ]
    },
    {
        "uuid": "property-uuid-4",
        "name": "Hotel Playa",
        "location": "Cancún",
        "owner": { 
            "uuid": "owner-uuid-4", 
            "bussines_name": "Owner Name 4", 
            "user": users[3], 
            "property": []
        },
        "propertyType": PropertyType.HOTEL,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726670522/RoyalSolaris_flrphe.jpg"],
        "rooms": [
            {
                "room_number": 201,
                "capacity": 2,
                "price_per_day": 180,
                "disponibility": "reserved",
                "roomImages": ["room6.jpg"],
                "services": ["WiFi", "Desayuno"],
                "category": "DELUXE"
            }
        ]
    },
    {
        "uuid": "property-uuid-5",
        "name": "Cabaña del Bosque",
        "location": "Bariloche",
        "owner": { 
            "uuid": "owner-uuid-5", 
            "bussines_name": "Owner Name 5", 
            "user": users[4], 
            "property": []
        },
        "propertyType": PropertyType.CABANA,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726538999/estandar_3_kgamzy.jpg"],
        "rooms": [
            {
                "room_number": 1,
                "capacity": 4,
                "price_per_day": 150,
                "disponibility": "avaiable",
                "roomImages": ["room7.jpg"],
                "services": ["WiFi", "Chimenea", "Desayuno"],
                "category": "STANDARD"
            }
        ]
    },
    {
        "uuid": "property-uuid-6",
        "name": "Departamento Moderno",
        "location": "Santiago",
        "owner": { 
            "uuid": "owner-uuid-6", 
            "bussines_name": "Owner Name 6", 
            "user": users[5],
            "property": []
        },
        "propertyType": PropertyType.DEPARTAMENTO,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539005/Habitacion_suite_uji2sn.jpg"],
        "rooms": [
            {
                "room_number": 1,
                "capacity": 2,
                "price_per_day": 130,
                "disponibility": "avaiable",
                "roomImages": ["room8.jpg"],
                "services": ["WiFi", "Estacionamiento"],
                "category": "STANDARD"
            }
        ]
    },
    {
        "uuid": "property-uuid-7",
        "name": "Hotel del Lago",
        "location": "Villa la Angostura",
        "owner": { 
            "uuid": "owner-uuid-7", 
            "bussines_name": "Owner Name 7", 
            "user": users[6], 
            "property": []
        },
        "propertyType": PropertyType.HOTEL,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539009/Suite_1_yim8fz.jpg"],
        "rooms": [
            {
                "room_number": 301,
                "capacity": 2,
                "price_per_day": 250,
                "disponibility": "avaiable",
                "roomImages": ["room9.jpg"],
                "services": ["WiFi", "Spa"],
                "category": "SUITE"
            }
        ]
    },
    {
        "uuid": "property-uuid-8",
        "name": "Cabaña Río",
        "location": "El Bolsón",
        "owner": { 
            "uuid": "owner-uuid-8", 
            "bussines_name": "Owner Name 8", 
            "user": users[7], 
            "property": []
        },
        "propertyType": PropertyType.CABANA,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726538999/Est%C3%A1ndar_2_jodrbj.jpg"],
        "rooms": [
            {
                "room_number": 1,
                "capacity": 5,
                "price_per_day": 200,
                "disponibility": "avaiable",
                "roomImages": ["room10.jpg"],
                "services": ["WiFi"],
                "category": "STANDARD"
            }
        ]
    },
    {
        "uuid": "property-uuid-9",
        "name": "Departamento en la Playa",
        "location": "Mendoza",
        "owner": { 
            "uuid": "owner-uuid-9", 
            "bussines_name": "Owner Name 9", 
            "user": users[8], 
            "property": []
        },
        "propertyType": PropertyType.CABANA,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539008/multiple_2_qpfll7.jpg"],
        "rooms": [
            {
                "room_number": 1,
                "capacity": 3,
                "price_per_day": 140,
                "disponibility": "reserved",
                "roomImages": ["room11.jpg"],
                "services": ["WiFi", "Estacionamiento"],
                "category": "STANDARD"
            }
        ]
    },
    {
        "uuid": "property-uuid-10",
        "name": "Hotel Boutique",
        "location": "Salta",
        "owner": { 
            "uuid": "owner-uuid-10", 
            "bussines_name": "Owner Name 10", 
            "user": users[9], 
            "property": []
        },
        "propertyType": PropertyType.HOTEL,
        "propertyImages": ["https://res.cloudinary.com/dhrys2lqz/image/upload/v1726539009/Hotel_boutique_1_yf3kv4.jpg"],
        "rooms": [
            {
                "room_number": 401,
                "capacity": 2,
                "price_per_day": 220,
                "disponibility": "avaiable",
                "roomImages": ["room12.jpg"],
                "services": ["WiFi", "Desayuno"],
                "category": "DELUXE"
            }
        ]
    }
];