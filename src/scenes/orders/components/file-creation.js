import {Typography, Spacing, Colors, Mixins} from '_styles';
import {Platform} from 'react-native';
import Share from 'react-native-share';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import * as RNFS from 'react-native-fs';

import XLSX from 'xlsx';

import agridataLogo from '_styles/image';
import dayjs from 'dayjs';
import {log} from '_utils';

export const createPDF = async (
  id,
  buyer,
  seller,
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
      width: 500,
      height: 500,
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
    .drawText('Bought By: ' + buyer.name, {
      x: 100,
      y: 2800,
      fontName: 'Poppins-Regular',
      fontSize: 80,
    })
    .drawText('Sold By: ' + seller.name, {
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
        : 'file:///data/user/0/com.agmarket_app/files/AG-MarketInvoice' +
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
        : 'file:///data/user/0/com.agmarket_app/files/AgriDataInvoice' +
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
