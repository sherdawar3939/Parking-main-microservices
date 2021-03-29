'use strict'
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

module.exports = async function dbseed (db, sequelize) {
  const roles = [{
    id: 1,
    name: 'Super Admin',
    description: 'Its Super Admin',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }, {
    id: 2,
    name: 'Parking Admin',
    description: 'Its Parking Admin',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }, {
    id: 3,
    name: 'User',
    description: 'Its User Admin',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }, {
    id: 4,
    name: 'Inspector',
    description: 'Its Inspector',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }]

  await db.Role.bulkCreate(roles)

  // New Users
  let newUser = db.User.build({
    fName: 'Super',
    lName: 'Admin',
    email: 'admin@admin.com',
    imageUrl: 'https://pixabay.com/images/search/nature/',
    phone: '948489584898989',
    otp: '3456',
    RoleId: 1,
    isVerified: true
  })
  newUser.salt = newUser.makeSalt()
  newUser.hashedPassword = newUser.encryptPassword('newPassword', newUser.salt)
  await newUser.save()

  // let newUser1 = db.User.build({
  //   fName: 'Parking',
  //   lName: 'Admin',
  //   email: 'parking@admin.com',
  //   imageUrl: 'https://pixabay.com/images/search/nature/',
  //   phone: '4484894898989',
  //   otp: '3006',
  //   RoleId: 2,
  //   isVerified: true
  // })
  // newUser1.salt = newUser1.makeSalt()
  // newUser1.hashedPassword = newUser1.encryptPassword('newPassword', newUser1.salt)
  // await newUser1.save()

  // New Users
  let newUser2 = db.User.build({
    fName: 'User',
    lName: 'Admin',
    email: 'user@admin.com',
    phone: '558489584898989',
    otp: '4008',
    RoleId: 3,
    isVerified: true
  })
  newUser2.salt = newUser2.makeSalt()
  newUser2.hashedPassword = newUser2.encryptPassword('newPassword', newUser2.salt)
  await newUser2.save()

  // New Users
  let newUser3 = db.User.build({
    fName: 'Inspector',
    lName: 'Admin',
    email: 'inspector@admin.com',
    imageUrl: 'https://pixabay.com/images/search/nature/',
    phone: '998489580098989',
    otp: '8008',
    RoleId: 4,
    isVerified: true
  })
  newUser3.salt = newUser3.makeSalt()
  newUser3.hashedPassword = newUser3.encryptPassword('newPassword', newUser3.salt)
  await newUser3.save()

  const country = {
    name: 'Germany',
    iso: 'GER'
  }
  await db.Country.create(country)
    .catch((error) => {
      console.log(error)
    })

  const city = [{
    id: 1,
    CountryId: 1,
    name: 'Berlin'
  },
  {
    id: 2,
    CountryId: 1,
    name: 'Munich'
  },
  {
    id: 3,
    CountryId: 1,
    name: 'Hamburg'
  }

  ]
  await db.City.bulkCreate(city)
    .catch((error) => {
      console.log(error)
    })

  // const client = [{
  //   companyName: 'visionBotix',
  //   email: 'vision@gmail.com',
  //   phone: '23456788978',
  //   secondaryContactPersonName: 'Adnan',
  //   secondaryEmail: 'adnan@gmail.com',
  //   secondaryPhone: '34567893456',
  //   address: 'Capital Technology Park Islamabad',
  //   iban: '1234-4566',
  //   isProfile: 'true',
  //   balance: 12000,
  //   UserId: 1

  // }, {
  //   companyName: 'infinity',
  //   email: 'infinity@gmail.com',
  //   phone: '12344578989',
  //   secondaryContactPersonName: 'Arsalan',
  //   secondaryEmail: 'Arsalan@gmail.com',
  //   secondaryPhone: '12345566789456',
  //   address: 'Capital Technology Park Rawalpindi',
  //   iban: '7788-4566',
  //   isProfile: 'true',
  //   balance: 34567,
  //   UserId: 2

  // }, {
  //   companyName: 'best',
  //   email: 'best@gmail.com',
  //   phone: '12344578989',
  //   secondaryContactPersonName: 'Amir',
  //   secondaryEmail: 'amir@gmail.com',
  //   secondaryPhone: '12345566789456',
  //   address: 'Capital Technology Park lahore',
  //   iban: '2345-4566',
  //   isProfile: 'true',
  //   balance: 78907,
  //   UserId: 3

  // }]
  // await db.Client.bulkCreate(client)
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // const contract = [{
  //   data: 'Contract is pending',
  //   status: 'pending',
  //   ClientId: 1,
  //   UserId: 1

  // },
  // {
  //   data: 'Contract is Approved',
  //   status: 'Approved',
  //   ClientId: 2,
  //   UserId: 2

  // },
  // {
  //   data: 'Contract is Rejected',
  //   status: 'Rejected',
  //   ClientId: 3,
  //   UserId: 3

  // }
  // ]
  // await db.Contract.bulkCreate(contract)

  // const clientZipCode = [{
  //   id: 1,
  //   isDeleted: false,
  //   ZipCodeId: 1,
  //   ClientId: 1
  // },
  // {
  //   id: 2,
  //   isDeleted: false,
  //   ZipCodeId: 2,
  //   ClientId: 2
  // },
  // {
  //   id: 3,
  //   isDeleted: false,
  //   ZipCodeId: 3,
  //   ClientId: 3
  // }
  // ]

  // const parkingZone = [{
  //   uid: '34',
  //   days: ['sunday', 'saturday'].join(', '),
  //   fee: 1200,
  //   maxTime: 53,
  //   zip: 1400,
  //   polygons: '1234',
  //   ClientId: 1,
  //   ClientZipCodeId: 1
  // },
  // {

  //   uid: '36',
  //   days: ['Friday', 'Monday'].join(', '),
  //   fee: 1400,
  //   maxTime: 60,
  //   zip: 1000,
  //   polygons: '2345',
  //   ClientId: 2,
  //   ClientZipCodeId: 2
  // },
  // {
  //   uid: '33',
  //   days: ['Tuesday', 'Wednesday'].join(', '),
  //   fee: 1234,
  //   maxTime: 44,
  //   zip: 5000,
  //   polygons: '6789',
  //   ClientId: 3,
  //   ClientZipCodeId: 3
  // }
  // ]
  // await db.ParkingZone.bulkCreate(parkingZone)
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // const creativeRequest = [{
  //   uid: '3484',
  //   qty: 1,
  //   status: 'InProcess',
  //   ClientId: 1,
  //   ParkingZoneId: 1
  // },
  // {
  //   uid: '3456',
  //   qty: 5,
  //   status: 'pending',
  //   ClientId: 2,
  //   ParkingZoneId: 2
  // },
  // {
  //   uid: '9a69',
  //   qty: 6,
  //   status: 'dispatched',
  //   ClientId: 3,
  //   ParkingZoneId: 3
  // }
  // ]
  // await db.CreativeRequest.bulkCreate(creativeRequest)
  //   .catch((error) => {
  //     console.log(error)
  //   })

  const vehicle = [{
    id: 1,
    name: 'Car',
    isDeleted: false
  },
  {
    id: 2,
    name: 'Bus',
    isDeleted: false
  },
  {
    id: 3,
    name: 'Bike',
    isDeleted: false
  }
  ]
  await db.VehicleCategory.bulkCreate(vehicle)
    .catch((error) => {
      console.log(error)
    })

  // const userVehicle = [{
  //   id: 1,
  //   licensePlate: 'BD-2344',
  //   quantity: 1,
  //   isDeleted: false,
  //   VehicleCategoryId: 1,
  //   UserId: 1
  // },
  // {
  //   id: 2,
  //   licensePlate: 'MN-234',
  //   quantity: 1,
  //   isDeleted: false,
  //   VehicleCategoryId: 2,
  //   UserId: 2
  // },
  // {
  //   id: 3,
  //   licensePlate: 'LYK-786',
  //   quantity: 1,
  //   isDeleted: false,
  //   VehicleCategoryId: 3,
  //   UserId: 3
  // }
  // ]
  // await db.UserVehicle.bulkCreate(userVehicle)
  //   .catch((error) => {
  //     console.log(error)
  //   })

  // const parking = [{
  //   totalSeconds: 1200,
  //   licensePlate: 'white',
  //   status: 'Started',
  //   quantity: 5,
  //   parkingCharges: 345,
  //   total: 20,
  //   PayerID: '2367',
  //   startedOn: '6-3-2021',
  //   endedOn: '6-3-2021',
  //   paymentStatus: 'Paid',
  //   clientProfit: 25,
  //   clientTax: 23,
  //   adminProfit: 44,
  //   adminTax: 40,
  //   UserId: 1,
  //   ParkingZoneId: 1,
  //   UserVehicleId: 1
  // },
  // {
  //   totalSeconds: 1500,
  //   licensePlate: 'yellow',
  //   status: 'Ended',
  //   quantity: 4,
  //   parkingCharges: 400,
  //   total: 26,
  //   PayerID: '2399',
  //   startedOn: '6-3-2021',
  //   endedOn: '6-3-2021',
  //   paymentStatus: 'Paid',
  //   clientProfit: 30,
  //   clientTax: 23,
  //   adminProfit: 50,
  //   adminTax: 42,
  //   UserId: 2,
  //   ParkingZoneId: 2,
  //   UserVehicleId: 2
  // },
  // {
  //   totalSeconds: 1700,
  //   licensePlate: 'Red',
  //   status: 'Started',
  //   quantity: 3,
  //   parkingCharges: 600,
  //   total: 29,
  //   PayerID: '2345',
  //   startedOn: '6-3-2021',
  //   endedOn: '6-3-2021',
  //   paymentStatus: 'Pending',
  //   clientProfit: 28,
  //   clientTax: 22,
  //   adminProfit: 48,
  //   adminTax: 41,
  //   UserId: 3,
  //   ParkingZoneId: 3,
  //   UserVehicleId: 3
  // }
  // ]
  // await db.Parking.bulkCreate(parking)
  //   .catch((error) => {
  //     console.log(error)
  //   })
}
