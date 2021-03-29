/**
 * Created by Saleh on 07/02/2019.
 */
'use strict'

var PromiseReturns = require('bluebird')
var StandardError = require('standard-error')
var fs = require('fs')
const PdfPrinter = require('pdfmake/src/printer')
const winston = require('../config/winston')
const config = require('../config/config')
const AWS = require('aws-sdk')
const db = require('../config/sequelize.config')
const _ = require('lodash')
const { DATE } = require('sequelize')

// Check if user has permission or not
function checkIfUserHasPermission (permissionName, permissionsArray) {
  for (let i = 0; i < permissionsArray.length; i++) {
    if (permissionName === permissionsArray[i].moduleName) {
      return true
    }
  }
  return false
}

function rejectPromise (message, code = null) {
  winston.error(message)
  return new PromiseReturns(function (resolve, reject) {
    reject(new StandardError({
      status: 'Error',
      message: message,
      statusCode: code
    }))
  })
}

function catchException (err) {
  winston.error(err)
  return rejectPromise(err.message, err.statusCode)
}

function putS3Object (s3, params) {
  return new PromiseReturns(function (resolve, reject) {
    s3.putObject(params, function (err) {
      if (err) {
        return rejectPromise(reject, err)
      }
      resolve()
    })
  })
}

function uploadImageToS3 (imageFile) {
  return new PromiseReturns(function (resolve) {
    if (imageFile) {
      var file = imageFile
      var fileName = file.originalname
      var filePath = config.s3.host_name + config.s3.bucket + '/' + config.s3.paths.original + fileName
      var s3Key = config.s3.paths.original + fileName

      AWS.config.update(config.s3.credentials)
      var s3 = new AWS.S3({ params: { Bucket: config.s3.bucket } })
      var params = {
        Key: s3Key,
        Body: fs.createReadStream(file.path),
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'application/octet-stream'
      }
      var obj = {
        s3: s3,
        params: params,
        filePath: filePath
      }
      return resolve(obj)
    } else {
      resolve(null)
    }
  })
}

function getUid (Model, field, where = {}, uidStartAlphabets = '') {
  return db[Model].findOne({
    attributes: [field],
    raw: true,
    where,
    order: [
      ['id', 'DESC']
    ]
  })
    .then((result) => {
      if (_.isEmpty(result) || !result.hasOwnProperty(field)) {
        if (uidStartAlphabets) {
          uidStartAlphabets = uidStartAlphabets + '-'
        }

        return uidStartAlphabets + '0001'
      }

      let splittedString = result[field].split('-')
      let newNumber = (parseInt(splittedString[splittedString.length - 1]) + 1).toString()
      let zerosToAdd = 4 - newNumber.length
      for (let i = 0; i < zerosToAdd; i++) {
        newNumber = '0' + newNumber
      }
      splittedString[splittedString.length - 1] = newNumber

      return splittedString.join('-')
    })
}

const createUid = (num, zip, status) => {
  if (status === 'daily') {
    return `${num} 94 ${zip}`
  } else if (status === 'weekly') {
    return `${num} 95 ${zip}`
  } else if (status === 'monthly') {
    return `${num} 96 ${zip}`
  } else if (status === '3 month') {
    return `${num} 97 ${zip}`
  } else if (status === '6 month') {
    return `${num} 98 ${zip}`
  } else if (status === 'yearly') {
    return `${num} 99 ${zip}`
  }
}
const getLatLonCenterFromGeometry = (coords) => {
  const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

  const centerLat = arrAvg(coords.map(c => c.lat))
  const centerLon = arrAvg(coords.map(c => c.lng))

  if (isNaN(centerLat) || isNaN(centerLon)) { return null } else return { lat: centerLat, lng: centerLon }
}

function generateParkingZoneContract (fileName, newZipCodes = [], updatedZipCodes = ['None'], deletedZipCodes = ['None']) {
  const docDefinition = {
    content: [
      {
        text: '\nII. SZÁMÚ MELLÉKLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Verziószám: II.000',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Jelen melléklet a szerződés elválaszthatatlan részét képezi.\n\n\n',
        alignment: 'center'
      },
      {
        text: '\n\nÜGYFÉL a regisztrációja során a következő kódszámú parkolási zóná(ka)t hozta létre:'
      },
      {
        text: newZipCodes
      },
      {
        text: '\n\nAVEVŐ frissítette a következő parkolási zónákat:'
      },
      {
        text: updatedZipCodes
      },
      {
        text: '\n\nÜGYFÉL a regisztrációja során a következő kódszámú parkolási zóná(ka)t törölte:'
      },
      {
        // text: ['73120007 - 19 March, 2020\n', '73120007 - 19 March, 2020\n']
        text: deletedZipCodes
      }
    ]
  }

  try {
    const fontDescriptors = {
      Roboto: {
        normal: 'assets/fonts/Roboto-Regular.ttf',
        bold: 'assets/fonts/Roboto-Medium.ttf',
        italics: 'assets/fonts/Roboto-Italic.ttf',
        bolditalics: 'assets/fonts/Roboto-Italic.ttf'
      }
    }
    const printer = new PdfPrinter(fontDescriptors)

    const doc = printer.createPdfKitDocument(docDefinition)

    console.log(updatedZipCodes)

    doc.pipe(
      fs.createWriteStream(`contracts/${fileName}`).on('error', (err) => {
        console.log(err)
      })
    )

    doc.on('end', () => {
      console.log('PDF successfully created and stored')
    })

    doc.end()
  } catch (err) {
    throw (err)
  }
};

function generateVoucherContract (fileName, newZipCodes = [], updatedZipCodes = ['None'], deletedZipCodes = ['None']) {
  const docDefinition = {
    content: [
      {
        text: '\nIII. SZÁMÚ MELLÉKLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Verziószám: III.000',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Jelen melléklet a szerződés elválaszthatatlan részét képezi.\n\n\n',
        alignment: 'center'
      },
      {
        text: 'ÜGYFÉL a regisztrációja során a következő kódszámú parkolóbérleteket törölte:'
      },
      {
        // text: ['73120007 - 19 March, 2020\n', '73120007 - 19 March, 2020\n']
        text: deletedZipCodes
      },
      {
        text: '\n\nÜGYFÉL a regisztrációja során a következő kódszámú parkolóbérlet(eket) és a hozzájuk tartozó árakat hozta létre:'
      },
      {
        text: newZipCodes
      },
      {
        text: `\n\nFürstenfeldbruck, ${new Date()}`
      }
    ]
  }

  try {
    const fontDescriptors = {
      Roboto: {
        normal: 'assets/fonts/Roboto-Regular.ttf',
        bold: 'assets/fonts/Roboto-Medium.ttf',
        italics: 'assets/fonts/Roboto-Italic.ttf',
        bolditalics: 'assets/fonts/Roboto-Italic.ttf'
      }
    }
    const printer = new PdfPrinter(fontDescriptors)

    const doc = printer.createPdfKitDocument(docDefinition)

    doc.pipe(
      fs.createWriteStream(`contracts/${fileName}`).on('error', (err) => {
        console.log(err)
      })
    )

    doc.on('end', () => {
      console.log('PDF successfully created and stored')
    })

    doc.end()
  } catch (err) {
    throw (err)
  }
};

function generateContractOne (fileName) {
  const docDefinition = {
    content: [
      {
        text: '\nI. SZÁMÚ MELLÉKLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Verziószám: I.000',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Jelen melléklet a szerződés elválaszthatatlan részét képezi.\n\n\n\n\n',
        alignment: 'center'
      },
      {
        text: 'A SZOLGÁLTATÓ díjszabása:'
      },
      {

        text: '•	Minden parkolási ciklus – kivétel a bérletvásárlás és bérlethasználat – kényelmi szolgáltatási díja: 	1 EURO + ÁFA.\n\n\n\n'
      },
      {
        text: '•	Bérletvásárlás díjszabása:'
      },
      {
        text: 'o	Heti bérletvásárlás kényelmi szolgáltatási díja: 	      3 EURO + ÁFA'
      },
      {
        text: 'o	Havi bérletvásárlás kényelmi szolgáltatás díja: 	      10 EURO + ÁFA'
      },
      {
        text: 'o	Negyedéves bérletvásárlás kényelmi szolgáltatás díja:   20 EURO + ÁFA'
      },
      {
        text: 'o	Féléves bérletvásárlás kényelmi szolgáltatás díja: 	    40 EURO + ÁFA'
      },
      {
        text: 'o	Éves bérletvásárlás kényelmi szolgáltatás díja: 	      50 EURO + ÁFA\n\n\n\n'
      },
      {
        text: '•	A bérletvásárlási lehetőséget a parkolni szándékozó gépkocsi vezetőjének mobilapplikációja kínálja fel.'
      },
      {
        text: `\n\n\nFürstenfeldbruck,  ${new Date()}`
      }
    ]
  }

  try {
    const fontDescriptors = {
      Roboto: {
        normal: 'assets/fonts/Roboto-Regular.ttf',
        bold: 'assets/fonts/Roboto-Medium.ttf',
        italics: 'assets/fonts/Roboto-Italic.ttf',
        bolditalics: 'assets/fonts/Roboto-Italic.ttf'
      }
    }
    const printer = new PdfPrinter(fontDescriptors)

    const doc = printer.createPdfKitDocument(docDefinition)

    doc.pipe(
      fs.createWriteStream(`contracts/${fileName}`).on('error', (err) => {
        console.log(err)
      })
    )

    doc.on('end', () => {
      console.log('PDF successfully created and stored')
    })

    doc.end()
  } catch (err) {
    throw (err)
  }
};

function generateContractTwo (fileName, countryName) {
  const docDefinition = {
    content: [
      {
        text: '\nIV. SZÁMÚ MELLÉKLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Ajánlott határozati javaslat tartalom önkormányzatok számára\n\n\n\n',
        alignment: 'center'
      },
      {
        text: 'Szokásos fejléc\n\n'
      },
      {

        text: 'Tárgy: Kivonat a ____________________ számú képviselőtestületi határozatból.\n\n\n\n'
      },
      {
        text: `${countryName} város képviselőtestülete megtárgyalta a SZARVAS Parking System Germany GmbH által működtetett Egységes1`
      },
      {
        text: 'Parkolási Rendszer alkalmazásának lehetőségét. A képviselőtestület a ___________________ számú határozatával '
      },
      {
        text: 'felhatalmazza és kötelezi a Polgármestert a jelen képviselőtestületi határozattal szorosan összefüggő „Együttműködési '
      },
      {
        text: 'Szolgáltatási Szerződés” aláírására.'
      },
      {
        text: 'A képviselőtestület felkéri a Polgármestert, hogy a város '
      },
      {
        text: '   •	minél kedvezőbb előnyének'
      },
      {
        text: '   •	minél nagyobb díjbevételének '
      },
      {
        text: '   •	a lakosság nagyobb kényelmi és komfortérzetének '
      },
      {
        text: 'érdekében működjön együtt a SZOLGÁLTATÓ-val, azaz a SZARVAS Parking System Germany GmbH-val.\n\n\n\n\n'
      },
      {
        text: '______________________, 20__.  __________________.	_________________________'

      },
      {
        text: '  (Ügyfél városnév)        	        (Dátum)	             (Név, Titulus) \n\n\n'

      },
      {
        text: '                                        Bélyegző'
      }
    ]
  }

  try {
    const fontDescriptors = {
      Roboto: {
        normal: 'assets/fonts/Roboto-Regular.ttf',
        bold: 'assets/fonts/Roboto-Medium.ttf',
        italics: 'assets/fonts/Roboto-Italic.ttf',
        bolditalics: 'assets/fonts/Roboto-Italic.ttf'
      }
    }
    const printer = new PdfPrinter(fontDescriptors)

    const doc = printer.createPdfKitDocument(docDefinition)

    doc.pipe(
      fs.createWriteStream(`contracts/${fileName}`).on('error', (err) => {
        console.log(err)
      })
    )

    doc.on('end', () => {
      console.log('PDF successfully created and stored')
    })

    doc.end()
  } catch (err) {
    throw (err)
  }
};

module.exports = {
  checkIfUserHasPermission,
  rejectPromise,
  catchException,
  putS3Object,
  uploadImageToS3,
  getUid,
  getLatLonCenterFromGeometry,
  generateParkingZoneContract,
  createUid,
  generateVoucherContract,
  generateContractOne,
  generateContractTwo
}
