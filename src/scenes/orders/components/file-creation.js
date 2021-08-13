import {Typography, Spacing, Colors, Mixins} from '_styles';
import {Platform} from 'react-native';
import Share from 'react-native-share';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import * as RNFS from 'react-native-fs';

import XLSX from 'xlsx';

import agridataLogo from '_styles/image';
import dayjs from 'dayjs';
import {log} from '_utils';
import {checkLocationAccuracy} from 'react-native-permissions';

export const createPDF = async (
  id,
  retailer,
  supplier,
  createdAt,
  items,
  amount,
  receivedBy,
) => {
  const base64img = agridataLogo;
  const logoPath = RNFS.DocumentDirectoryPath + '/logo.png';
  await RNFS.writeFile(logoPath, base64img, 'base64');
  var noProduct = items.length;
  var positionY = 2000;
  var positionY2 = 3100;
  const page1 = PDFPage.create().setMediaBox(2480, 3508);
  const page2 = PDFPage.create().setMediaBox(2480, 3508);
  page1
    .drawImage(logoPath, 'png', {
      x: 1800,
      y: 2500,
      width: 965,
      height: 519,
    })
    .drawText('Thanks For Your Order!', {
      x: 100,
      y: 3100,
      color: Colors.LIME_GREEN,
      fontName: 'Poppins-Regular',
      fontSize: 150,
    })
    .drawText('Invoice#: ' + id, {
      x: 100,
      y: 2900,
      fontName: 'Poppins-Regular',
      fontSize: 80,
    })
    .drawText('Date : ' + dayjs(createdAt).format('DD MMMM YYYY'), {
      x: 100,
      y: 2600,
      fontName: 'Poppins-Regular',
      fontSize: 80,
    })
    .drawText('Bought By: ' + retailer.name, {
      x: 100,
      y: 2800,
      fontName: 'Poppins-Regular',
      fontSize: 80,
    })
    .drawText('Sold By: ' + supplier.name, {
      x: 100,
      y: 2700,
      fontName: 'Poppins-Regular',
      fontSize: 80,
    })
    .drawRectangle({
      x: 200,
      y: 2400,
      width: 2100,
      height: 0,
    })
    .drawRectangle({
      x: 200,
      y: 2250,
      width: 2100,
      height: 0,
    })
    .drawText('PRODUCT', {
      x: 200,
      y: 2300,
      fontName: 'Poppins-Regular',
      fontSize: 70,
      color: Colors.GRAY_DARK,
    })
    .drawText('QTY.', {
      x: 1000,
      y: 2300,
      fontName: 'Poppins-Regular',
      fontSize: 70,
      color: Colors.GRAY_DARK,
    })
    .drawText('UNIT PRICE', {
      x: 1400,
      y: 2300,
      fontName: 'Poppins-Regular',
      fontSize: 70,
      color: Colors.GRAY_DARK,
    })
    .drawText('AMOUNT', {
      x: 2000,
      y: 2300,
      fontName: 'Poppins-Regular',
      fontSize: 70,
      color: Colors.GRAY_DARK,
    });
  for (let i = 0; i < noProduct; i++) {
    if (i < 6) {
      page1
        .drawText(items[i].name, {
          x: 200,
          y: positionY,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawText(items[i].quantity + ' kg', {
          x: 1000,
          y: positionY,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawText('RM ' + items[i].price + '/kg', {
          x: 1400,
          y: positionY,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawText('RM ' + items[i].price * items[i].quantity, {
          x: 2000,
          y: positionY,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawRectangle({
          x: 200,
          y: positionY - 80,
          width: 2100,
          height: 0,
          color: Colors.GRAY_MEDIUM,
        });
      positionY -= 200;
    } else {
      page2
        .drawText(items[i].name, {
          x: 200,
          y: positionY2,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawText(items[i].quantity + ' kg', {
          x: 1000,
          y: positionY2,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawText('RM ' + items[i].price + '/kg', {
          x: 1400,
          y: positionY2,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawText('RM ' + items[i].price * items[i].quantity, {
          x: 2000,
          y: positionY2,
          fontName: 'Poppins-Regular',
          fontSize: 70,
        })
        .drawRectangle({
          x: 200,
          y: positionY2 - 80,
          width: 2100,
          height: 0,
          color: Colors.GRAY_MEDIUM,
        });
      positionY2 -= 200;
    }
  }
  if (noProduct <= 6) {
    page1
      .drawText('Total Cost:', {
        x: 1400,
        y: positionY - 100,
        fontName: 'Poppins-Regular',
        fontSize: 70,
      })
      .drawText('RM ' + amount, {
        x: 2000,
        y: positionY - 100,
        fontName: 'Poppins-Regular',
        fontSize: 70,
        color: Colors.LIME_GREEN,
      })
      .drawText('Received By:', {
        x: 1700,
        y: 500,
        fontName: 'Poppins-Regular',
        fontSize: 70,
      })
      .drawText(receivedBy, {
        x: 1700,
        y: 250,
        fontName: 'Poppins-Regular',
        fontSize: 70,
      })
      .drawRectangle({
        x: 1700,
        y: 200,
        width: 500,
        height: 0,
      });
  } else {
    page2
      .drawText('Total Cost:', {
        x: 1400,
        y: positionY2 - 100,
        fontName: 'Poppins-Regular',
        fontSize: 70,
      })
      .drawText('RM ' + amount, {
        x: 2000,
        y: positionY2 - 100,
        fontName: 'Poppins-Regular',
        fontSize: 70,
        color: Colors.LIME_GREEN,
      })
      .drawText('Received By:', {
        x: 1700,
        y: 500,
        fontName: 'Poppins-Regular',
        fontSize: 70,
      })
      .drawText(receivedBy, {
        x: 1700,
        y: 250,
        fontName: 'Poppins-Regular',
        fontSize: 70,
      })
      .drawRectangle({
        x: 1700,
        y: 200,
        width: 500,
        height: 0,
      });
  }

  var filePath = RNFS.DocumentDirectoryPath + '/AG-MarketInvoice' + id + '.pdf';
  if (noProduct <= 6) {
    PDFDocument.create(filePath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        log('PDF created at: ' + path);
        // alert('PDF created');
      })
      .catch(e => {
        // alert('PDF fail to create');
      });
  } else {
    PDFDocument.create(filePath)
      .addPages(page1, page2)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        log('PDF created at: ' + path);
        // alert('PDF created');
      })
      .catch(e => {
        // alert('PDF fail to create');
      });
  }
  const shareOptions = {
    url:
      Platform.OS == 'ios'
        ? filePath
        : 'file:///data/user/0/com.agridata_app/files/AG-MarketInvoice' +
          id +
          '.pdf',
  };
  try {
    const ShareResponse = await Share.open(shareOptions);
    //RNFS.unlink(filePath);
  } catch (error) {
    log('Error: ', error);
    RNFS.unlink(filePath);
  }
};

export const createCSV = async (
  id,
  company,
  createdAt,
  items,
  amount,
  receivedBy,
) => {
  var data = items;
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'AgriDataInvoice' + id.slice(0, 6));
  const wbout = XLSX.write(wb, {
    type: 'binary',
    bookType: 'xlsx',
  });
  var file =
    RNFS.DocumentDirectoryPath + '/AgriDataInvoice' + id.slice(0, 6) + '.xlsx';
  RNFS.writeFile(file, wbout, 'ascii')
    .then(r => {
      log('CSV created at: ' + file);
      //alert('CSV created');
    })
    .catch(e => {
      //alert('CSV failed to create');
    });
  const shareOptions = {
    message: 'Share CSV Test',
    url:
      Platform.OS == 'ios'
        ? file
        : 'file:///data/user/0/com.agridata_app/files/AgriDataInvoice' +
          id.slice(0, 6) +
          '.xlsx',
  };
  try {
    const ShareResponse = await Share.open(shareOptions);
    log(ShareResponse);
    //RNFS.unlink(file);
  } catch (error) {
    log('Error1: ', error);
    RNFS.unlink(file);
  }
};

export const createPDF2 = async (id, createdAt, items) => {
  const base64img = agridataLogo;
  const logoPath = RNFS.DocumentDirectoryPath + '/logo.png';
  await RNFS.writeFile(logoPath, base64img, 'base64');
  var noProduct = 10;
  var positionY = 2095;
  var positionY2 = 3100;
  const page2 = PDFPage.create().setMediaBox(2480, 3508);
  const page1 = PDFPage.create().setMediaBox(2480, 3508);
  page1
    .drawImage(logoPath, 'png', {
      x: 1980,
      y: 3189,
      width: 370,
      height: 183,
    })
    .drawText('INVOICE', {
      x: 120,
      y: 3232,
      color: Colors.LIME_GREEN,
      fontName: 'Poppins-Bold',
      fontSize: 100,
    })
    .drawText('Invoice No. ', {
      x: 120,
      y: 3157,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Invoice Date', {
      x: 120,
      y: 3091,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Terms', {
      x: 120,
      y: 3020,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText(': ' + id, {
      x: 494,
      y: 3157,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': ' + dayjs(createdAt).format('DD MMMM YYYY'), {
      x: 494,
      y: 3091,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': COD', {
      x: 494,
      y: 3020,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText('Invoice To:', {
      x: 122,
      y: 2864,
      fontName: 'Poppins-Regular',
      fontSize: 45,
    })
    .drawText("WONG'S WHOLESALE", {
      x: 122,
      y: 2768,
      fontName: 'Poppins-SemiBold',
      fontSize: 65,
    })
    .drawRectangle({
      x: 122,
      y: 2760,
      width: 621,
      height: 5,
      color: Colors.LIME_GREEN,
    })
    .drawText('Name', {
      x: 122,
      y: 2655,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Contact No.', {
      x: 122,
      y: 2589,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Registration No.', {
      x: 122,
      y: 2523,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Address', {
      x: 122,
      y: 2457,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText(': John Wong', {
      x: 494,
      y: 2655,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': 011-65691998', {
      x: 494,
      y: 2589,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': 123456789', {
      x: 494,
      y: 2523,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': T1 bundusan, Jalan Bundusan', {
      x: 494,
      y: 2457,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText('  Penampang, Kota Kinabalu,', {
      x: 494,
      y: 2391,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText('  Sabah 88300  ', {
      x: 494,
      y: 2325,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawRectangle({
      x: 120,
      y: 2182,
      width: 2240,
      height: 98,
      color: Colors.LIME_GREEN,
    })
    .drawText('Item', {
      x: 338,
      y: 2215,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('Product', {
      x: 979,
      y: 2215,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('QTY', {
      x: 1591,
      y: 2215,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('Rate', {
      x: 1816,
      y: 2215,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('Amount', {
      x: 2090,
      y: 2215,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    });

  for (let i = 0; i < noProduct; i++) {
    if (i < 10) {
      page1
        .drawText((i + 1).toString(), {
          x: 142,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 215,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText('Lorem Ipsum', {
          x: 249,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 594,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText('Lorem Ipsum', {
          x: 628,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1544,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText('50', {
          x: 1597,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1729,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText('39.40', {
          x: 1813,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1729,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText('500', {
          x: 2145,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 2010,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawRectangle({
          x: 120,
          y: positionY - 45,
          width: 2240,
          height: 5,
          color: '#C4C4C4',
        });
      positionY -= 130;
    }
  }
  if (noProduct <= 10) {
    page1
      .drawText('Total', {
        x: 1816,
        y: positionY,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawText('MYR 4,000.00', {
        x: 2050,
        y: positionY,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawText('Received by: Jun Kaih', {
        x: 120,
        y: 494,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      //draw big box top horizontal line
      .drawRectangle({
        x: 120,
        y: 451,
        width: 718,
        height: 10,
        color: '#0C5E99',
      })
      //draw big box btm horizontal ine
      .drawRectangle({
        x: 120,
        y: 240,
        width: 718,
        height: 10,
        color: '#0C5E99',
      })
      // draw big box left vertical line
      .drawRectangle({
        x: 120,
        y: 240,
        width: 10,
        height: 211,
        color: '#0C5E99',
      })
      //draw big box right vertical line
      .drawRectangle({
        x: 826,
        y: 240,
        width: 10,
        height: 211,
        color: '#0C5E99',
      })
      //draw small box top horizontal line
      .drawRectangle({
        x: 144,
        y: 431,
        width: 674,
        height: 3,
        color: '#0C5E99',
      })
      //draw small box bottom horizontal line
      .drawRectangle({
        x: 144,
        y: 260,
        width: 674,
        height: 3,
        color: '#0C5E99',
      })
      //draw small box left vertical line
      .drawRectangle({
        x: 142,
        y: 260,
        width: 3,
        height: 178,
        color: '#0C5E99',
      })
      //draw small box right vertical line
      .drawRectangle({
        x: 813,
        y: 260,
        width: 3,
        height: 178,
        color: '#0C5E99',
      })
      //draw middle line
      .drawRectangle({
        x: 168,
        y: 359,
        width: 621,
        height: 2,
        color: '#0C5E99',
      })
      .drawText('CITY GROCER', {
        x: 242,
        y: 368,
        fontName: 'Poppins-Bold',
        fontSize: 70,
      })
      .drawText('T1 Bundusan, Jalan Bundusan, Penampang,', {
        x: 266,
        y: 324,
        fontName: 'Poppins-Medium',
        fontSize: 19,
      })
      .drawText('Kota Kinabalu, Sabah 88900', {
        x: 338,
        y: 302,
        fontName: 'Poppins-Medium',
        fontSize: 19,
      })
      .drawText('Registration No:', {
        x: 340,
        y: 281,
        fontName: 'Poppins-Bold',
        fontSize: 19,
      })
      .drawText('12345678-T', {
        x: 505,
        y: 281,
        fontName: 'Poppins-Medium',
        fontSize: 19,
      })
      .drawText('Delivered by:', {
        x: 1642,
        y: 494,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      //draw big box top horizontal line
      .drawRectangle({
        x: 1642,
        y: 451,
        width: 718,
        height: 10,
        color: '#0C5E99',
      })
      //draw big box btm horizontal ine
      .drawRectangle({
        x: 1642,
        y: 240,
        width: 718,
        height: 10,
        color: '#0C5E99',
      })
      // draw big box left vertical line
      .drawRectangle({
        x: 1642,
        y: 240,
        width: 10,
        height: 211,
        color: '#0C5E99',
      })
      //draw big box right vertical line
      .drawRectangle({
        x: 2348,
        y: 240,
        width: 10,
        height: 211,
        color: '#0C5E99',
      })
      //draw small box top horizontal line
      .drawRectangle({
        x: 1666,
        y: 431,
        width: 674,
        height: 3,
        color: '#0C5E99',
      })
      //draw small box bottom horizontal line
      .drawRectangle({
        x: 1666,
        y: 260,
        width: 674,
        height: 3,
        color: '#0C5E99',
      })
      //draw small box left vertical line
      .drawRectangle({
        x: 1664,
        y: 260,
        width: 3,
        height: 178,
        color: '#0C5E99',
      })
      //draw small box right vertical line
      .drawRectangle({
        x: 2335,
        y: 260,
        width: 3,
        height: 178,
        color: '#0C5E99',
      })
      //draw middle line
      .drawRectangle({
        x: 1690,
        y: 359,
        width: 621,
        height: 2,
        color: '#0C5E99',
      })
      .drawText('CITY GROCER', {
        x: 1788,
        y: 368,
        fontName: 'Poppins-Bold',
        fontSize: 70,
      })
      .drawText('T1 Bundusan, Jalan Bundusan, Penampang,', {
        x: 1812,
        y: 324,
        fontName: 'Poppins-Medium',
        fontSize: 19,
      })
      .drawText('Kota Kinabalu, Sabah 88900', {
        x: 1884,
        y: 302,
        fontName: 'Poppins-Medium',
        fontSize: 19,
      })
      .drawText('Registration No:', {
        x: 1886,
        y: 281,
        fontName: 'Poppins-Bold',
        fontSize: 19,
      })
      .drawText('12345678-T', {
        x: 2051,
        y: 281,
        fontName: 'Poppins-Medium',
        fontSize: 19,
      });
  }
  var filePath = RNFS.DocumentDirectoryPath + '/AG-MarketInvoice' + id + '.pdf';
  if (noProduct <= 10) {
    PDFDocument.create(filePath)
      .addPages(page1)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        log('PDF created at: ' + path);
        // alert('PDF created');
      })
      .catch(e => {
        // alert('PDF fail to create');
      });
  } else {
    PDFDocument.create(filePath)
      .addPages(page1, page2)
      .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        log('PDF created at: ' + path);
        // alert('PDF created');
      })
      .catch(e => {
        // alert('PDF fail to create');
      });
  }
  const shareOptions = {
    url:
      Platform.OS == 'ios'
        ? filePath
        : 'file:///data/user/0/com.agridata_app/files/AG-MarketInvoice' +
          id +
          '.pdf',
  };
  try {
    const ShareResponse = await Share.open(shareOptions);
    //RNFS.unlink(filePath);
  } catch (error) {
    log('Error: ', error);
    RNFS.unlink(filePath);
  }
};
