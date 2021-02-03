'use strict'
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const products = require('../../products-data')
let insertedProducts = []

module.exports = async function dbseed (db, sequelize) {
  // console.log(products.length)
  // const formattedProducts = []
  // for (let i = 0; i < products.length; i++) {
  //   const product = products[i]
  //   let unitCode
  //   if (product.unit == 1) {
  //     unitCode = 'kg'
  //   } else if (product.unit == 2) {
  //     unitCode = 'gm'
  //   } else if (product.unit == 6) {
  //     unitCode = 'item'
  //   } else {
  //     continue
  //   }

  //   let slug = product.name.replace(/([^a-z0-9]+)/gi, '-').toLowerCase()

  //   formattedProducts.push({
  //     BaseUnitId: product.unit,
  //     name: product.name,
  //     nameUrdu: product.name,
  //     description: product.name,
  //     descriptionUrdu: product.name,
  //     tags: product.name,
  //     unit: unitCode,
  //     unitUrdu: unitCode,
  //     slug: slug,
  //     price: product.price,
  //     isActive: true,
  //     CategoryId: 4,
  //     SupplierId: product.SupplierId
  //   })
  // }

  // await db.Product.bulkCreate(formattedProducts)
  //   .then(() => {
  //     return db.Product.findAll({
  //       where: {
  //         SupplierId: {
  //           [Op.ne]: null
  //         }
  //       },
  //       attributes: ['id', 'price', 'cost', 'BaseUnitId', 'SupplierId']
  //     })
  //   })
  //   .then((_insertedProducts) => {
  //     insertedProducts = _insertedProducts

  //     let CategoryProducts = []
  //     let productUnits = []
  //     for (let m = 0; m < insertedProducts.length; m++) {
  //       const insertedProduct = insertedProducts[m]
  //       CategoryProducts.push({
  //         CategoryId: 4,
  //         ProductId: insertedProduct.id
  //       })
  //       productUnits.push({
  //         price: insertedProduct.price,
  //         cost: insertedProduct.cost,
  //         type: 1,
  //         ProductId: insertedProduct.id,
  //         UnitId: insertedProduct.BaseUnitId
  //       })
  //       productUnits.push({
  //         price: insertedProduct.price,
  //         cost: insertedProduct.cost,
  //         type: 0,
  //         ProductId: insertedProduct.id,
  //         UnitId: insertedProduct.BaseUnitId
  //       })
  //     }
  //     db.ProductUnit.bulkCreate(productUnits)
  //     db.CategoryProduct.bulkCreate(CategoryProducts)

  //     for (let i = 0; i < insertedProducts.length; i++) {
  //       const insertedProduct = insertedProducts[i]
  //       db.SupplierProduct.create({
  //         SupplierId: insertedProduct.SupplierId,
  //         ProductId: insertedProduct.id,
  //         price: insertedProduct.price,
  //         cost: insertedProduct.cost
  //       })
  //         .then((insertedSupplierProduct) => {
  //           db.SupplierProductUnit.bulkCreate([{
  //             SupplierProductId: insertedSupplierProduct.id,
  //             UnitId: insertedProduct.BaseUnitId,
  //             type: 0,
  //             price: insertedProduct.price,
  //             cost: insertedProduct.cost
  //           },
  //           {
  //             SupplierProductId: insertedSupplierProduct.id,
  //             UnitId: insertedProduct.BaseUnitId,
  //             type: 1,
  //             price: insertedProduct.price,
  //             cost: insertedProduct.cost
  //           }])
  //         })
  //     }
  //   })
}

/*
module.exports = async function dbseed (db, sequelize) {
  // Inserting predefined data
  db.BannerType.create({
    id: 1,
    title: 'App Home Slider',
    description: 'Slider on the home screen of application.',
    width: 330,
    height: 200,
    identifier: 'app-home-slider',
    maxBanners: 20,
    price: 1000
  })

  db.Role.bulkCreate([{
    id: 1,
    name: 'Client',
    description: 'Client is the end user who uses the application.',
    isActive: true,
    isDeleted: false
  },
  {
    id: 2,
    name: 'Biker',
    description: 'System generated Biker role',
    isActive: true,
    isDeleted: false
  },
  {
    id: 3,
    name: 'Super Admin',
    description: 'System generated super admin role',
    isActive: true,
    isDeleted: false
  },
  {
    id: 4,
    name: 'Shopkeeper',
    description: 'This is the role for shopkeepers or people who have shops in our system.',
    isActive: true,
    isDeleted: false
  }])
    .then((role) => {
      let user1 = new db.User({
        id: 1,
        fName: 'Salman',
        lName: 'Gurmanni',
        phone: '03001231234',
        language: 'eng',
        RoleId: 3,
        isVerified: true
      })

      user1.salt = user1.makeSalt()
      user1.hashedPassword = user1.encryptPassword('123456789', user1.salt)
      user1.save()

      let user2 = new db.User({
        id: 2,
        fName: 'Salman',
        lName: 'Gurmanni',
        phone: '03026861133',
        language: 'eng',
        RoleId: 4,
        isVerified: true
      })

      user2.salt = user2.makeSalt()
      user2.hashedPassword = user2.encryptPassword('123456789', user2.salt)
      user2.save()
    })

  // *********************
  // Module Names
  // *********************

  await db.Module.bulkCreate([{
    id: 1,
    title: 'Company Profile',
    identifier: 'company-profile'
  },
  {
    id: 2,
    title: 'Banner',
    identifier: 'banner'
  },
  {
    id: 3,
    title: 'User',
    identifier: 'user'
  },
  {
    id: 4,
    title: 'Role',
    identifier: 'role'
  },
  {
    id: 5,
    title: 'PageMeta',
    identifier: 'page-meta'
  },
  {
    id: 6,
    title: 'City',
    identifier: 'city'
  },
  {
    id: 7,
    title: 'Product',
    identifier: 'product'
  },
  {
    id: 8,
    title: 'Unit',
    identifier: 'unit'
  },
  {
    id: 9,
    title: 'Product Category',
    identifier: 'product-category'
  },
  {
    id: 10,
    title: 'Package',
    identifier: 'package'
  },
  {
    id: 11,
    title: 'Offers',
    identifier: 'offers'
  },
  {
    id: 12,
    title: 'ContactInfo',
    identifier: 'contact-info'
  },
  {
    id: 13,
    title: 'CustomerGroup',
    identifier: 'customer-group'
  },
  {
    id: 14,
    title: 'Supplier',
    identifier: 'supplier'
  }
  ])

  // *********************
  // Actions
  // *********************

  await db.Action.bulkCreate([{
    id: 1,
    name: 'Create',
    identifier: 'create'
  }, {
    id: 2,
    name: 'Retrieve',
    identifier: 'retrieve'
  },
  {
    id: 3,
    name: 'Update',
    identifier: 'update'
  },
  {
    id: 4,
    name: 'Delete',
    identifier: 'delete'
  },
  {
    id: 5,
    name: 'Approve',
    identifier: 'approve'
  },
  {
    id: 6,
    name: 'Change Status',
    identifier: 'change-status'
  }
  ])

  const moduleActions = [
    {
      ModuleId: 1,
      ActionId: 1
    }, {
      ModuleId: 1,
      ActionId: 2
    }, {
      ModuleId: 2,
      ActionId: 1
    },
    {
      ModuleId: 2,
      ActionId: 2
    },
    {
      ModuleId: 2,
      ActionId: 3
    }, {
      ModuleId: 3,
      ActionId: 1
    },
    {
      ModuleId: 3,
      ActionId: 2
    },
    {
      ModuleId: 3,
      ActionId: 3
    },
    {
      ModuleId: 3,
      ActionId: 4
    }, {
      ModuleId: 4,
      ActionId: 1
    },
    {
      ModuleId: 4,
      ActionId: 2
    },
    {
      ModuleId: 4,
      ActionId: 3
    },
    {
      ModuleId: 4,
      ActionId: 4
    },
    {
      ModuleId: 4,
      ActionId: 5
    },
    {
      ModuleId: 4,
      ActionId: 6
    }, {
      ModuleId: 5,
      ActionId: 1
    }, {
      ModuleId: 6,
      ActionId: 1
    },
    {
      ModuleId: 6,
      ActionId: 2
    },
    {
      ModuleId: 6,
      ActionId: 3
    },
    {
      ModuleId: 6,
      ActionId: 4
    }, {
      ModuleId: 7,
      ActionId: 1
    },
    {
      ModuleId: 7,
      ActionId: 2
    },
    {
      ModuleId: 7,
      ActionId: 3
    },
    {
      ModuleId: 7,
      ActionId: 4
    },
    {
      ModuleId: 8,
      ActionId: 1
    },
    {
      ModuleId: 8,
      ActionId: 2
    },
    {
      ModuleId: 8,
      ActionId: 3
    },
    {
      ModuleId: 8,
      ActionId: 4
    },
    {
      ModuleId: 9,
      ActionId: 1
    },
    {
      ModuleId: 9,
      ActionId: 2
    },
    {
      ModuleId: 9,
      ActionId: 3
    },
    {
      ModuleId: 9,
      ActionId: 4
    },
    {
      ModuleId: 10,
      ActionId: 1
    },
    {
      ModuleId: 10,
      ActionId: 2
    },
    {
      ModuleId: 10,
      ActionId: 3
    },
    {
      ModuleId: 10,
      ActionId: 4
    },
    {
      ModuleId: 11,
      ActionId: 1
    },
    {
      ModuleId: 11,
      ActionId: 2
    },
    {
      ModuleId: 11,
      ActionId: 3
    },
    {
      ModuleId: 11,
      ActionId: 4
    },
    {
      ModuleId: 12,
      ActionId: 1
    },
    {
      ModuleId: 12,
      ActionId: 2
    },
    {
      ModuleId: 12,
      ActionId: 3
    },
    {
      ModuleId: 12,
      ActionId: 4
    },
    {
      ModuleId: 13,
      ActionId: 1
    },
    {
      ModuleId: 13,
      ActionId: 2
    },
    {
      ModuleId: 13,
      ActionId: 3
    },
    {
      ModuleId: 13,
      ActionId: 4
    },
    {
      ModuleId: 14,
      ActionId: 1
    },
    {
      ModuleId: 14,
      ActionId: 2
    },
    {
      ModuleId: 14,
      ActionId: 3
    },
    {
      ModuleId: 14,
      ActionId: 4
    }]

  db.ModuleAction.bulkCreate(moduleActions).then((result) => {
    const rolePermissions = []
    for (let i = 0; i < result.length; i++) {
      const moduleActionId = result[i].id
      rolePermissions.push({
        RoleId: 3,
        ModuleActionId: moduleActionId
      })
    }
    db.RolePermission.bulkCreate(rolePermissions)
  })

  await db.Unit.bulkCreate([{
    id: 1,
    name: 'Kilogram',
    nameL1: 'Kilogram',
    code: 'kg',
    codeL1: 'kg'
  },
  {
    id: 2,
    name: 'Gram',
    nameL1: 'Gram',
    code: 'gm',
    codeL1: 'gm'
  },
  {
    id: 3,
    name: 'Gram',
    nameL1: 'Gram',
    code: 'gm',
    codeL1: 'gm',
    operation: '/',
    value: 1000,
    ParentId: 1
  },
  {
    id: 4,
    name: 'Kilogram',
    nameL1: 'Kilogram',
    code: 'kg',
    codeL1: 'kg',
    operation: '*',
    value: 1000,
    ParentId: 2
  },
  {
    id: 6,
    name: 'Piece',
    nameL1: 'Piece',
    code: 'piece',
    codeL1: 'piece'
  }])

  await db.City.bulkCreate([{
    id: 1,
    name: 'Layyah',
    nameUrdu: 'Layyah',
    slug: 'layyah-1',
    isActive: true
  }])

  db.CostConfig.bulkCreate([
    {
      title: 'Booking Fee',
      titleUrdu: 'Booking Fee',
      unit: '',
      unitUrdu: '',
      key: 'booking',
      value: 35
    },
    {
      title: 'Purchasing',
      titleUrdu: 'Purchasing',
      unit: '',
      unitUrdu: '',
      key: 'purchasing',
      value: 0
    },
    {
      title: 'Travel Cost',
      titleUrdu: 'Travel Cost',
      unit: 'km',
      unitUrdu: 'km',
      key: 'travel',
      value: 4
    }
  ])

  db.Category.create({
    title: 'Medicine',
    titleUrdu: 'Medicine',
    slug: 'medicine',
    thumb: 'assets/icons/categories/medical-white.png',
    isActive: true,
    openingTime: '07',
    closingTime: '23',
    showInFilters: true
  })
    .then((category) => {
      category.slug = category.slug + '-' + category.id
      category.save()
      // db.Product.bulkCreate([
      //   {
      //     id: 4,
      //     name: 'Panadol',
      //     nameUrdu: 'Panadol',
      //     unit: 'Tblt',
      //     unitUrdu: 'Tblt',
      //     thumb: '',
      //     slug: 'panadol-4',
      //     price: 2,
      //     isActive: true,
      //     CategoryId: category.id
      //   },
      //   {
      //     id: 5,
      //     name: 'Disprin',
      //     nameUrdu: 'Disprin',
      //     unit: 'Tblt',
      //     unitUrdu: 'Tblt',
      //     slug: 'disprin-5',
      //     thumb: '',
      //     price: 1,
      //     isActive: true,
      //     CategoryId: category.id
      //   },
      //   {
      //     id: 6,
      //     name: 'Zeest',
      //     nameUrdu: 'Zeest',
      //     unit: 'Tblt',
      //     unitUrdu: 'Tblt',
      //     slug: 'zeest-6',
      //     thumb: '',
      //     price: 5,
      //     isActive: true,
      //     CategoryId: category.id
      //   }
      // ])

      db.CityCategory.create({
        CityId: 1,
        CategoryId: category.id,
        openingTime: '00:00',
        closingTime: '23:59',
        isActive: true,
        showInFilters: true,
        isSupplierMandatory: false,
        defaultSuppliers: '[]',
        sequence: 3,
        isDeleted: false
      })
    })

  db.Category.create({
    title: 'Food',
    titleUrdu: 'Food',
    slug: 'food',
    thumb: 'assets/icons/categories/food-white.png',
    isActive: true,
    openingTime: '07',
    closingTime: '23',
    showInFilters: true
  })
    .then((category) => {
      category.slug = category.slug + '-' + category.id
      category.save()
      db.CityCategory.create({
        CityId: 1,
        CategoryId: category.id,
        openingTime: '09:00',
        closingTime: '22:59',
        isActive: true,
        showInFilters: true,
        isSupplierMandatory: false,
        defaultSuppliers: '[]',
        sequence: 2,
        isDeleted: false
      })
    })

  db.Category.create({
    title: 'Stationary',
    titleUrdu: 'Stationary',
    slug: 'stationary',
    thumb: 'assets/icons/categories/book-white.png',
    isActive: true,
    openingTime: '07',
    closingTime: '23',
    showInFilters: true
  })
    .then((category) => {
      category.slug = category.slug + '-' + category.id
      category.save()
      db.CityCategory.create({
        CityId: 1,
        CategoryId: category.id,
        openingTime: '09:00',
        closingTime: '22:59',
        isActive: true,
        showInFilters: true,
        isSupplierMandatory: false,
        defaultSuppliers: '[]',
        sequence: 4,
        isDeleted: false
      })
    })

  // System configurations
  db.SystemConfig.bulkCreate([
    {
      title: 'Whose Number To Display On Tracking Screen',
      titleUrdu: 'Whose Number To Display On Tracking Screen',
      key: 'whoseNumberOnTracking',
      value: 'zaqoota'
    },
    {
      title: 'Tracking Screen Phone Number',
      titleUrdu: 'Tracking Screen Phone Number',
      key: 'trackingScreenPhoneNumber',
      value: '03036200893'
    },
    {
      title: 'Charge After How Many Cancels?',
      titleUrdu: 'Charge After How Many Cancels?',
      key: 'chargeAfterCancels',
      value: 2
    },
    {
      title: 'Block After How Many Cancels?',
      titleUrdu: 'Block After How Many Cancels?',
      key: 'blockAfterCancels',
      value: 3
    }
  ])

  await db.Category.create({
    title: 'Departmental Store',
    titleUrdu: 'Departmental Store',
    slug: 'departmental-store',
    thumb: 'assets/icons/categories/shopping-white.png',
    isActive: true,
    openingTime: '07:00',
    closingTime: '23:00',
    showInFilters: true
  })
    .then(async (category) => {
      category.slug = category.slug + '-' + category.id
      category.save()
      db.CityCategory.create({
        CityId: 1,
        CategoryId: category.id,
        openingTime: '09:00',
        closingTime: '22:59',
        isActive: true,
        showInFilters: true,
        isSupplierMandatory: false,
        defaultSuppliers: '[]',
        sequence: 1,
        isDeleted: false
      })

      const formattedProducts = []
      for (let i = 0; i < products.length; i++) {
        const product = products[i]
        let unitCode
        if (product.unit == 1) {
          unitCode = 'kg'
        } else if (product.unit == 2) {
          unitCode = 'gm'
        } else if (product.unit == 6) {
          unitCode = 'piece'
        } else {
          continue
        }

        let id = i + 1
        let slug = product.name.replace(/([^a-z0-9]+)/gi, '-').toLowerCase()
        slug = slug + '-' + id

        formattedProducts.push({
          id: id,
          BaseUnitId: product.unit,
          name: product.name,
          nameUrdu: product.name,
          description: product.name,
          descriptionUrdu: product.name,
          tags: product.name,
          unit: unitCode,
          unitUrdu: unitCode,
          slug: slug,
          price: product.price,
          cost: product.cost,
          isActive: true,
          CategoryId: category.id
        })
      }
      await db.Product.bulkCreate(formattedProducts)
        .then(() => {
          return db.Product.findAll({
            attributes: ['id', 'price', 'cost', 'BaseUnitId']
          })
        })
        .then((_insertedProducts) => {
          insertedProducts = _insertedProducts
          for (let x = 0; x < insertedProducts.length; x++) {
            const insertedProduct = insertedProducts[x]
            db.CityProduct.create({
              CityId: 1,
              ProductId: insertedProduct.id,
              price: insertedProduct.price,
              cost: insertedProduct.cost,
              isDeleted: false,
              withoutSupplier: false
            })
              .then((CityProduct) => {
                db.CityProductUnit.bulkCreate([{
                  price: insertedProduct.price,
                  cost: insertedProduct.cost,
                  type: 0,
                  CityId: 1,
                  CityProductId: CityProduct.id,
                  UnitId: insertedProduct.BaseUnitId
                }, {
                  price: insertedProduct.price,
                  cost: insertedProduct.cost,
                  type: 1,
                  CityId: 1,
                  CityProductId: CityProduct.id,
                  UnitId: insertedProduct.BaseUnitId
                }])
              })
          }

          let CategoryProducts = []
          let productUnits = []
          for (let m = 0; m < insertedProducts.length; m++) {
            const insertedProduct = insertedProducts[m]
            CategoryProducts.push({
              CategoryId: category.id,
              ProductId: insertedProduct.id
            })
            productUnits.push({
              price: insertedProduct.price,
              cost: insertedProduct.cost,
              type: 1,
              ProductId: insertedProduct.id,
              UnitId: insertedProduct.BaseUnitId
            })
            productUnits.push({
              price: insertedProduct.price,
              cost: insertedProduct.cost,
              type: 0,
              ProductId: insertedProduct.id,
              UnitId: insertedProduct.BaseUnitId
            })
          }
          db.ProductUnit.bulkCreate(productUnits)
          db.CategoryProduct.bulkCreate(CategoryProducts)
        })
    })

  db.Supplier.create({
    id: 1,
    name: 'Zaqoota Mart',
    nameUrdu: 'Zaqoota Mart',
    address: 'Employees Colony',
    phone: '03026861133',
    slug: 'zaqoota-mart-1',
    openingTime: '07:00',
    closingTime: '20:00',
    keepAnonymous: true,
    showInFilters: false,
    isActive: true,
    isDeleted: false,
    CityId: 1,
    UserId: 2
  })
    .then((supplier) => {
      db.SupplierCategory.create({
        SupplierId: 1,
        CategoryId: 1
      })

      // console.log(insertedProducts, '----------')

      for (let i = 0; i < insertedProducts.length; i++) {
        const insertedProduct = insertedProducts[i]
        db.SupplierProduct.create({
          SupplierId: 1,
          ProductId: insertedProduct.id,
          price: insertedProduct.price,
          cost: insertedProduct.cost
        })
          .then((insertedSupplierProduct) => {
            db.SupplierProductUnit.bulkCreate([{
              SupplierProductId: insertedSupplierProduct.id,
              UnitId: insertedProduct.BaseUnitId,
              type: 0,
              price: insertedProduct.price,
              cost: insertedProduct.cost
            },
            {
              SupplierProductId: insertedSupplierProduct.id,
              UnitId: insertedProduct.BaseUnitId,
              type: 1,
              price: insertedProduct.price,
              cost: insertedProduct.cost
            }])
          })
      }

      // db.SupplierProduct.create({
      //   SupplierId: 1,
      //   ProductId: 2,
      //   price: 110,
      //   cost: 100
      // })
      //   .then(() => {
      //     db.SupplierProductUnit.create({
      //       SupplierProductId: 2,
      //       UnitId: 1,
      //       type: 1,
      //       price: 110,
      //       cost: 100
      //     })
      //   })
    })
}
*/
