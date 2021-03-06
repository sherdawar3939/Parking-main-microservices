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
        text: '\nII. SZ??M?? MELL??KLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Verzi??sz??m: II.000',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Jelen mell??klet a szerz??d??s elv??laszthatatlan r??sz??t k??pezi.\n\n\n',
        alignment: 'center'
      },
      {
        text: '\n\n??GYF??L a regisztr??ci??ja sor??n a k??vetkez?? k??dsz??m?? parkol??si z??n??(ka)t hozta l??tre:'
      },
      {
        text: newZipCodes
      },
      {
        text: '\n\nAVEV?? friss??tette a k??vetkez?? parkol??si z??n??kat:'
      },
      {
        text: updatedZipCodes
      },
      {
        text: '\n\n??GYF??L a regisztr??ci??ja sor??n a k??vetkez?? k??dsz??m?? parkol??si z??n??(ka)t t??r??lte:'
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
        text: '\nIII. SZ??M?? MELL??KLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Verzi??sz??m: III.000',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Jelen mell??klet a szerz??d??s elv??laszthatatlan r??sz??t k??pezi.\n\n\n',
        alignment: 'center'
      },
      {
        text: '??GYF??L a regisztr??ci??ja sor??n a k??vetkez?? k??dsz??m?? parkol??b??rleteket t??r??lte:'
      },
      {
        // text: ['73120007 - 19 March, 2020\n', '73120007 - 19 March, 2020\n']
        text: deletedZipCodes
      },
      {
        text: '\n\n??GYF??L a regisztr??ci??ja sor??n a k??vetkez?? k??dsz??m?? parkol??b??rlet(eket) ??s a hozz??juk tartoz?? ??rakat hozta l??tre:'
      },
      {
        text: newZipCodes
      },
      {
        text: `\n\nF??rstenfeldbruck, ${new Date()}`
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
        text: '\nI. SZ??M?? MELL??KLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Verzi??sz??m: I.000',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Jelen mell??klet a szerz??d??s elv??laszthatatlan r??sz??t k??pezi.\n\n\n\n\n',
        alignment: 'center'
      },
      {
        text: 'A SZOLG??LTAT?? d??jszab??sa:'
      },
      {

        text: '???	Minden parkol??si ciklus ??? kiv??tel a b??rletv??s??rl??s ??s b??rlethaszn??lat ??? k??nyelmi szolg??ltat??si d??ja: 	1 EURO + ??FA.\n\n\n\n'
      },
      {
        text: '???	B??rletv??s??rl??s d??jszab??sa:'
      },
      {
        text: 'o	Heti b??rletv??s??rl??s k??nyelmi szolg??ltat??si d??ja: 	      3 EURO + ??FA'
      },
      {
        text: 'o	Havi b??rletv??s??rl??s k??nyelmi szolg??ltat??s d??ja: 	      10 EURO + ??FA'
      },
      {
        text: 'o	Negyed??ves b??rletv??s??rl??s k??nyelmi szolg??ltat??s d??ja:   20 EURO + ??FA'
      },
      {
        text: 'o	F??l??ves b??rletv??s??rl??s k??nyelmi szolg??ltat??s d??ja: 	    40 EURO + ??FA'
      },
      {
        text: 'o	??ves b??rletv??s??rl??s k??nyelmi szolg??ltat??s d??ja: 	      50 EURO + ??FA\n\n\n\n'
      },
      {
        text: '???	A b??rletv??s??rl??si lehet??s??get a parkolni sz??nd??koz?? g??pkocsi vezet??j??nek mobilapplik??ci??ja k??n??lja fel.'
      },
      {
        text: `\n\n\nF??rstenfeldbruck,  ${new Date()}`
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
        text: '\nIV. SZ??M?? MELL??KLET',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'Aj??nlott hat??rozati javaslat tartalom ??nkorm??nyzatok sz??m??ra\n\n\n\n',
        alignment: 'center'
      },
      {
        text: 'Szok??sos fejl??c\n\n'
      },
      {

        text: 'T??rgy: Kivonat a ____________________ sz??m?? k??pvisel??test??leti hat??rozatb??l.\n\n\n\n'
      },
      {
        text: `${countryName} v??ros k??pvisel??test??lete megt??rgyalta a SZARVAS Parking System Germany GmbH ??ltal m??k??dtetett Egys??ges1`
      },
      {
        text: 'Parkol??si Rendszer alkalmaz??s??nak lehet??s??g??t. A k??pvisel??test??let a ___________________ sz??m?? hat??rozat??val '
      },
      {
        text: 'felhatalmazza ??s k??telezi a Polg??rmestert a jelen k??pvisel??test??leti hat??rozattal szorosan ??sszef??gg?? ???Egy??ttm??k??d??si '
      },
      {
        text: 'Szolg??ltat??si Szerz??d??s??? al????r??s??ra.'
      },
      {
        text: 'A k??pvisel??test??let felk??ri a Polg??rmestert, hogy a v??ros '
      },
      {
        text: '   ???	min??l kedvez??bb el??ny??nek'
      },
      {
        text: '   ???	min??l nagyobb d??jbev??tel??nek '
      },
      {
        text: '   ???	a lakoss??g nagyobb k??nyelmi ??s komfort??rzet??nek '
      },
      {
        text: '??rdek??ben m??k??dj??n egy??tt a SZOLG??LTAT??-val, azaz a SZARVAS Parking System Germany GmbH-val.\n\n\n\n\n'
      },
      {
        text: '______________________, 20__.  __________________.	_________________________'

      },
      {
        text: '  (??gyf??l v??rosn??v)        	        (D??tum)	             (N??v, Titulus) \n\n\n'

      },
      {
        text: '                                        B??lyegz??'
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
