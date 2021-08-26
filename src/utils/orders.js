import {API, graphqlOperation, Storage} from 'aws-amplify';
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

import {
  listSupplierListings,
  listFarmerListings,
  supplierListingByNameStartingWithLowestPrice,
  farmerListingByNameStartingWithLowestPrice,
  getSupplierCompany,
  getFarmerCompany,
  listRetailerCompanys,
  listSupplierCompanys,
  invoiceRetailerForSupplierByDate,
  invoiceForFarmerByDate,
  invoiceFarmerForSupplierByDate,
  invoiceForRetailerByDate,
} from '_graphql/queries';

import {
  createMessage,
  createChatGroup,
  updateChatGroup,
  createProductsInPurchaseOrder,
  updateSupplierCompany,
  updateFarmerCompany,
  updateRetailerCompany,
  updateProductsInPurchaseOrder,
  createSupplierListing,
  createFarmerListing,
} from '_graphql/mutations';

//selling orders

export const getInvoiceSellingOrder = async (companyType, companyID) => {
  log('hi', 'cyan');
  if (companyType == 'supplier') {
    try {
      const invoice1 = await API.graphql({
        query: invoiceRetailerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'DESC',
          limit: 20,
        },
      });
      log('supplierCompanyWithRetailerInvoices');
      return invoice1.data.invoiceRetailerForSupplierByDate;
    } catch (e) {
      log(e);
    }
  } else {
    try {
      const invoice = await API.graphql({
        query: invoiceForFarmerByDate,
        variables: {
          farmerID: companyID,
          sortDirection: 'DESC',
          limit: 20,
        },
      });
      log('farmerCompanyInvoices');
      return invoice.data.invoiceForFarmerByDate;
    } catch (e) {
      log(e);
    }
  }
};

export const getMoreInvoiceSellingOrder = async (
  companyType,
  companyID,
  nextToken,
) => {
  if (companyType == 'supplier') {
    try {
      const invoice = await API.graphql({
        query: invoiceRetailerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'DESC',
          limit: 20,
          nextToken: nextToken,
        },
      });
      log('supplierCompanyWithRetailerInvoices');
      return invoice.data.invoiceRetailerForSupplierByDate;
    } catch (e) {
      log(e);
    }
  } else {
    try {
      const invoice = await API.graphql({
        query: invoiceForFarmerByDate,
        variables: {
          farmerID: companyID,
          sortDirection: 'DESC',
          limit: 20,
          nextToken: nextToken,
        },
      });
      log('farmerCompanyInvoices');
      return invoice.data.invoiceForFarmerByDate;
    } catch (e) {
      log(e);
    }
  }
  log('first run');
};

//buying orders

export const getInvoiceBuyingOrder = async (companyType, companyID) => {
  if (companyType == 'supplier') {
    try {
      const invoice = await API.graphql({
        query: invoiceFarmerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'DESC',
          limit: 20,
        },
      });
      log('supplierCompanyWithFarmerInvoices');
      return invoice.data.invoiceFarmerForSupplierByDate;
    } catch (e) {
      log(e);
    }
  } else if (companyType == 'retailer') {
    try {
      const invoice = await API.graphql({
        query: invoiceForRetailerByDate,
        variables: {
          retailerID: companyID,
          sortDirection: 'DESC',
          limit: 20,
        },
      });
      log('retailerCompanyInvoices');
      return invoice.data.invoiceForRetailerByDate;
    } catch (e) {
      log(e);
    }
  }
};

export const getMoreInvoiceBuyingOrder = async (
  companyType,
  companyID,
  nextToken,
) => {
  if (companyType == 'supplier') {
    try {
      const invoice = await API.graphql({
        query: invoiceFarmerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'DESC',
          limit: 20,
          nextToken: nextToken,
        },
      });
      log('supplierCompanyWithFarmerInvoices');
      return invoice.data.invoiceFarmerForSupplierByDate;
    } catch (e) {
      log(e);
    }
  } else if (companyType == 'retailer') {
    try {
      const invoice = await API.graphql({
        query: invoiceForRetailerByDate,
        variables: {
          retailerID: companyID,
          sortDirection: 'DESC',
          limit: 20,
          nextToken: nextToken,
        },
      });
      log('retailerCompanyInvoices');
      return invoice.data.invoiceForRetailerByDate;
    } catch (e) {
      log(e);
    }
  }
  log('first run');
};

//generate document

/*
- Invoice ID
- Invoice Date
- Cash Terms
- Seller Name
- Seller Contact Num
- Seller Reg Num
- Seller Address
- Buyer Name
- Buyer Contact Num
- Buyer Reg Num
- Buyer Address
- Items
- Receiver Name



TODO chop investigatebest method for long text
text of product
text of address

*/

export const createPDF = async (
  id,
  buyer,
  seller,
  createdAt,
  items,
  amount,
  receivedBy,
  buyerChop,
  sellerChop,
) => {
  const rAddress = buyer.address;
  const sAddress = seller.address;
  const [buyerUnit, buyerStreet, buyerCity] = rAddress.split(',');
  const [sellerUnit, sellerStreet, sellerCity] = sAddress.split(',');
  var bChop;
  var sChop;
  await RNFS.readFile(buyerChop, 'base64').then(res => {
    bChop = res;
  });
  await RNFS.readFile(sellerChop, 'base64').then(res => {
    sChop = res;
  });
  const logoPath = RNFS.DocumentDirectoryPath + '/logo.png';
  const bChopPath = RNFS.DocumentDirectoryPath + '/buyerChop.png';
  const sChopPath = RNFS.DocumentDirectoryPath + '/sellerChop.png';
  await RNFS.writeFile(logoPath, agridataLogo, 'base64');
  await RNFS.writeFile(bChopPath, bChop, 'base64');
  await RNFS.writeFile(sChopPath, sChop, 'base64');
  var noProduct = items.length;
  var positionY = 1970;
  var positionY2 = 2900;
  const page2 = PDFPage.create().setMediaBox(2480, 3508);
  const page1 = PDFPage.create().setMediaBox(2480, 3508);
  page1
    .drawImage(logoPath, 'png', {
      x: 1980,
      y: 3120,
      width: 370,
      height: 199,
    })
    .drawText('INVOICE', {
      x: 120,
      y: 3232,
      color: Colors.LIME_GREEN,
      fontName: 'Poppins-Bold',
      fontSize: 100,
    })
    .drawText('Invoice No. ', {
      x: 1550,
      y: 2453,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Invoice Date', {
      x: 1550,
      y: 2402,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Terms', {
      x: 1550,
      y: 2351,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText(': ' + id, {
      x: 1900,
      y: 2453,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': ' + dayjs(createdAt).format('hh:mm a DD MMMM YYYY'), {
      x: 1900,
      y: 2402,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    /* TODO add to API */
    .drawText(': null', {
      x: 1900,
      y: 2351,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    // Buyer
    .drawText(buyer.name, {
      x: 122,
      y: 3083,
      fontName: 'Poppins-SemiBold',
      fontSize: 65,
    })
    .drawText('Contact No.', {
      x: 122,
      y: 3023,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Registration No.', {
      x: 122,
      y: 2957,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Address', {
      x: 122,
      y: 2891,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText(': ' + buyer.contactDetails.phone, {
      x: 494,
      y: 3023,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': ' + buyer.registrationNumber, {
      x: 494,
      y: 2957,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': ' + buyerUnit, {
      x: 494,
      y: 2891,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(' ' + buyerStreet, {
      x: 494,
      y: 2825,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(' ' + buyerCity, {
      x: 494,
      y: 2759,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawRectangle({
      x: 70,
      y: 2700,
      height: 1,
      width: 2320,
    })
    .drawText('Invoice To:', {
      x: 122,
      y: 2610,
      fontName: 'Poppins-Regular',
      fontSize: 45,
    })
    //Seller
    .drawText(seller.name, {
      x: 122,
      y: 2526,
      fontName: 'Poppins-SemiBold',
      fontSize: 65,
    })
    .drawText('Contact No.', {
      x: 122,
      y: 2466,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Registration No.', {
      x: 122,
      y: 2400,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText('Address', {
      x: 122,
      y: 2334,
      fontName: 'Poppins-SemiBold',
      fontSize: 40,
    })
    .drawText(': ' + seller.contactDetails.phone, {
      x: 494,
      y: 2466,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': ' + seller.registrationNumber, {
      x: 494,
      y: 2400,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(': ' + sellerUnit, {
      x: 494,
      y: 2334,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(' ' + sellerStreet, {
      x: 494,
      y: 2268,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawText(' ' + sellerCity, {
      x: 494,
      y: 2202,
      fontName: 'Poppins-Regular',
      fontSize: 40,
    })
    .drawRectangle({
      x: 120,
      y: 2057,
      width: 2240,
      height: 98,
      color: Colors.LIME_GREEN,
    })
    .drawText('Item', {
      x: 338,
      y: 2090,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('Product', {
      x: 979,
      y: 2090,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('QTY', {
      x: 1630,
      y: 2090,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('Rate', {
      x: 1850,
      y: 2090,
      fontName: 'Poppins-SemiBold',
      fontSize: 45,
    })
    .drawText('Amount', {
      x: 2090,
      y: 2090,
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
        .drawText(items[i].id.slice(0, 6), {
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
        .drawText(items[i].name, {
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
        .drawText(items[i].quantity.toFixed(2).toString(), {
          x: 1564,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1800,
          y: positionY - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].price.toFixed(1).toString(), {
          x: 1820,
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
        .drawText((items[i].price * items[i].quantity).toFixed(2).toString(), {
          x: 2030,
          y: positionY,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 120,
          y: positionY - 45,
          width: 2240,
          height: 5,
          color: '#C4C4C4',
        });
      positionY -= 130;
    } else if (i == 10) {
      page2
        .drawImage(logoPath, 'png', {
          x: 1980,
          y: 3120,
          width: 370,
          height: 199,
        })
        .drawRectangle({
          x: 120,
          y: positionY2,
          width: 2240,
          height: 98,
          color: Colors.LIME_GREEN,
        })
        .drawText('Item', {
          x: 338,
          y: positionY2 + 33,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawText('Product', {
          x: 979,
          y: positionY2 + 33,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawText('QTY', {
          x: 1630,
          y: positionY2 + 33,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawText('Rate', {
          x: 1850,
          y: positionY2 + 33,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawText('Amount', {
          x: 2090,
          y: positionY2 + 33,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawText((i + 1).toString(), {
          x: 142,
          y: positionY2 - 87,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 215,
          y: positionY2 - 132,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].id.slice(0, 6), {
          x: 249,
          y: positionY2 - 87,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 594,
          y: positionY2 - 132,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].name, {
          x: 628,
          y: positionY2 - 87,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1544,
          y: positionY2 - 132,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].quantity.toFixed(2).toString(), {
          x: 1564,
          y: positionY2 - 87,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1800,
          y: positionY2 - 132,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].price.toFixed(1).toString(), {
          x: 1820,
          y: positionY2 - 87,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 2010,
          y: positionY2 - 132,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText((items[i].price * items[i].quantity).toFixed(2).toString(), {
          x: 2030,
          y: positionY2 - 87,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 120,
          y: positionY2 - 132,
          width: 2240,
          height: 5,
          color: '#C4C4C4',
        });
      positionY2 -= 217;
    } else {
      page2
        .drawText((i + 1).toString(), {
          x: 142,
          y: positionY2,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 215,
          y: positionY2 - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].id.slice(0, 6), {
          x: 249,
          y: positionY2,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 594,
          y: positionY2 - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].name, {
          x: 628,
          y: positionY2,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1544,
          y: positionY2 - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].quantity.toFixed(2).toString(), {
          x: 1564,
          y: positionY2,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 1800,
          y: positionY2 - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText(items[i].price.toFixed(1).toString(), {
          x: 1820,
          y: positionY2,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 2010,
          y: positionY2 - 45,
          width: 5,
          height: 130,
          color: '#C4C4C4',
        })
        .drawText((items[i].price * items[i].quantity).toFixed(2).toString(), {
          x: 2030,
          y: positionY2,
          fontName: 'Poppins-SemiBold',
          fontSize: 45,
        })
        .drawRectangle({
          x: 120,
          y: positionY2 - 45,
          width: 2240,
          height: 5,
          color: '#C4C4C4',
        });
      positionY2 -= 130;
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
      .drawText('RM ' + amount.toFixed(2).toString(), {
        x: 2050,
        y: positionY,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawText('Received by: ' + receivedBy.toString(), {
        x: 120,
        y: 444,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawImage(bChopPath, 'png', {
        x: 80,
        y: 200,
        width: 718,
        height: 219,
      })
      .drawText('Delivered by:', {
        x: 1642,
        y: 454,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawImage(sChopPath, 'png', {
        x: 1600,
        y: 200,
        width: 718,
        height: 219,
      });
  } else {
    page2
      .drawText('Total', {
        x: 1816,
        y: positionY2,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawText('RM ' + amount.toFixed(2).toString(), {
        x: 2000,
        y: positionY2,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawText('Received by: ' + receivedBy.toString(), {
        x: 120,
        y: 444,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawImage(bChopPath, 'png', {
        x: 80,
        y: 200,
        width: 718,
        height: 219,
      })
      .drawText('Delivered by:', {
        x: 1642,
        y: 454,
        fontName: 'Poppins-SemiBold',
        fontSize: 45,
      })
      .drawImage(sChopPath, 'png', {
        x: 1600,
        y: 200,
        width: 718,
        height: 219,
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
  return null;
};

export const createCSV = async (id, createdAt, items, amount, receivedBy) => {
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
