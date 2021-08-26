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
  goodsTaskForRetailerByDate,
  goodsTaskFarmerForSupplierByDate,
  paymentsTaskForRetailerByDate,
  paymentsTaskFarmerForSupplierByDate,
  goodsTaskRetailerForSupplierByDate,
  goodsTaskForFarmerByDate,
  paymentsTaskRetailerForSupplierByDate,
  paymentsTaskForFarmerByDate,
} from '_graphql/queries';

import {
  createPaymentTaskBetweenRandS,
  createPaymentTaskBetweenSandF,
  createInvoiceBetweenRandS,
  createInvoiceBetweenSandF,
  updateGoodsTaskBetweenRandS,
  updateGoodsTaskBetweenSandF,
  updatePaymentTaskBetweenRandS,
  updatePaymentTaskBetweenSandF,
  deletePaymentTaskBetweenRandS,
  deletePaymentTaskBetweenSandF,
  updateInvoiceBetweenRandS,
  updateInvoiceBetweenSandF,
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

//buyer task

//recieve goods
export const getReceiveTask = async (companyType, companyID) => {
  try {
    if (companyType == 'retailer') {
      const task = await API.graphql({
        query: goodsTaskForRetailerByDate,
        variables: {
          retailerID: companyID,
          sortDirection: 'ASC',
        },
      });
      log(task.data.goodsTaskForRetailerByDate.items);
      return task.data.goodsTaskForRetailerByDate.items;
    } else {
      const task = await API.graphql({
        query: goodsTaskFarmerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'ASC',
        },
      });
      log(task.data.goodsTaskFarmerForSupplierByDate.items);
      return task.data.goodsTaskFarmerForSupplierByDate.items;
    }
  } catch (e) {
    log(e);
  }
};

export const getPayTask = async (companyType, companyID) => {
  try {
    if (companyType == 'retailer') {
      const task = await API.graphql({
        query: paymentsTaskForRetailerByDate,
        variables: {
          retailerID: companyID,
          sortDirection: 'ASC',
        },
      });
      log(task.data.paymentsTaskForRetailerByDate.items);
      return task.data.paymentsTaskForRetailerByDate.items;
    } else {
      const task = await API.graphql({
        query: paymentsTaskFarmerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'ASC',
        },
      });
      log(task.data.paymentsTaskFarmerForSupplierByDate.items);
      return task.data.paymentsTaskFarmerForSupplierByDate.items;
    }
    log('payment task');
  } catch (e) {
    log(e);
  }
};

export const received = async (
  companyType,
  supplierID,
  farmerID,
  taskID,
  retailerID,
  sum,
  goods,
  userName,
  receiveTask,
) => {
  var mostRecentInvoiceNum = null;
  try {
    if (companyType == 'retailer') {
      const response = await API.graphql({
        query: getSupplierCompany,
        variables: {id: supplierID},
      });
      mostRecentInvoiceNum =
        response.data.getSupplierCompany.mostRecentInvoiceNumber;
    } else {
      const response = await API.graphql({
        query: getFarmerCompany,
        variables: {id: farmerID},
      });
      mostRecentInvoiceNum =
        response.data.getFarmerCompany.mostRecentInvoiceNumber;
    }
    log('newnum: ' + mostRecentInvoiceNum);
    if (mostRecentInvoiceNum) {
      if (dayjs().format('YYYY-MM') == mostRecentInvoiceNum.slice(4, 11)) {
        var number = parseInt(mostRecentInvoiceNum.slice(12, 16));
        var numberString = (number + 1).toString().padStart(4, '0');
        mostRecentInvoiceNum =
          'INV-' + dayjs().format('YYYY-MM-') + numberString;
      } else {
        mostRecentInvoiceNum = 'INV-' + dayjs().format('YYYY-MM-') + '0001';
      }
    } else {
      mostRecentInvoiceNum = 'INV-' + dayjs().format('YYYY-MM-') + '0001';
    }
    log('updatednum: ' + mostRecentInvoiceNum);
  } catch (e) {
    log(e);
  }
  if (companyType == 'retailer') {
    var input = {
      id: taskID,
      trackingNum: mostRecentInvoiceNum,
      retailerID: retailerID,
      supplierID: supplierID,
      paid: false,
      amount: sum,
      payBefore: dayjs().add(30, 'day').format('DD-MM-YYYY'),
      receipt: null,
    };
  } else {
    var input = {
      id: taskID,
      trackingNum: mostRecentInvoiceNum,
      supplierID: supplierID,
      farmerID: farmerID,
      paid: false,
      amount: sum,
      payBefore: dayjs().add(30, 'day').format('DD-MM-YYYY'),
      receipt: null,
    };
  }

  try {
    if (companyType == 'retailer') {
      const paymentTaskResponse = API.graphql({
        query: createPaymentTaskBetweenRandS,
        variables: {input: input},
      });
    } else {
      const paymentTaskResponse = API.graphql({
        query: createPaymentTaskBetweenSandF,
        variables: {input: input},
      });
    }
    log('payment success!');
  } catch (e) {
    log(e);
  }

  if (companyType == 'retailer') {
    var input = {
      id: taskID,
      trackingNum: mostRecentInvoiceNum,
      retailerID: retailerID,
      supplierID: supplierID,
      items: goods,
      paid: false,
      amount: sum,
      receivedBy: userName,
    };
  } else {
    var input = {
      id: taskID,
      trackingNum: mostRecentInvoiceNum,
      farmerID: farmerID,
      supplierID: supplierID,
      items: goods,
      paid: false,
      amount: sum,
      receivedBy: userName,
    };
  }

  try {
    if (companyType == 'retailer') {
      const invoiceResponse = API.graphql({
        query: createInvoiceBetweenRandS,
        variables: {input: input},
      });
    } else {
      const invoiceResponse = API.graphql({
        query: createInvoiceBetweenSandF,
        variables: {input: input},
      });
    }
    log('success!');
  } catch (e) {
    log(e);
  }

  try {
    if (companyType == 'retailer') {
      const supplierCompanyUpdate = await API.graphql({
        query: updateSupplierCompany,
        variables: {
          input: {
            id: supplierID,
            mostRecentInvoiceNumber: mostRecentInvoiceNum,
          },
        },
      });
    } else {
      const farmerCompanyUpdate = await API.graphql({
        query: updateFarmerCompany,
        variables: {
          input: {
            id: farmerID,
            mostRecentInvoiceNumber: mostRecentInvoiceNum,
          },
        },
      });
    }
    log('update success');
  } catch (e) {
    log(e);
  }

  try {
    if (companyType == 'retailer') {
      const invoiceResponse = await API.graphql({
        query: updateGoodsTaskBetweenRandS,
        variables: {input: {id: taskID, status: 'received'}},
      });
      var tempList = receiveTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == taskID) {
          arr[index] = invoiceResponse.data.updateGoodsTaskBetweenRandS;
        }
      });
    } else {
      const invoiceResponse = await API.graphql({
        query: updateGoodsTaskBetweenSandF,
        variables: {input: {id: taskID, status: 'received'}},
      });
      var tempList = receiveTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == taskID) {
          arr[index] = invoiceResponse.data.updateGoodsTaskBetweenSandF;
        }
      });
    }
    return tempList;

    log('deleted!');
  } catch (e) {
    log(e);
  }
};

export const updateRating = async (companyType, supplier, rating, farmer) => {
  try {
    if (companyType == 'retailer') {
      if (supplier.rating == null) {
        var sendRating = {
          numberOfRatings: 1,
          currentRating: rating,
        };
      } else {
        var newNumberOfRating = supplier.rating.numberOfRatings + 1;
        var newRating =
          (supplier.rating.currentRating * supplier.rating.numberOfRatings +
            rating) /
          newNumberOfRating;
        var sendRating = {
          numberOfRatings: newNumberOfRating,
          currentRating: newRating,
        };
      }
      log(supplier, sendRating);
      const update = await API.graphql({
        query: updateSupplierCompany,
        variables: {
          input: {
            id: supplier.id,
            rating: sendRating,
          },
        },
      });
    } else {
      if (farmer.rating == null) {
        var sendRating = {
          numberOfRatings: 1,
          currentRating: rating,
        };
      } else {
        var newNumberOfRating = farmer.rating.numberOfRatings + 1;
        var newRating =
          (farmer.rating.currentRating * farmer.rating.numberOfRatings +
            rating) /
          newNumberOfRating;
        var sendRating = {
          numberOfRatings: newNumberOfRating,
          currentRating: newRating,
        };
      }
      log(farmer, sendRating);
      const update = await API.graphql({
        query: updateFarmerCompany,
        variables: {
          input: {
            id: farmer.id,
            rating: sendRating,
          },
        },
      });
    }

    log(rating, 'red');
  } catch (e) {
    log(e);
  }
};

//send payment

export const sendReceipt = async (companyType, id, payTask) => {
  try {
    if (companyType == 'retailer') {
      const updated = await API.graphql({
        query: updatePaymentTaskBetweenRandS,
        variables: {input: {id: id, receipt: 'some receipt'}},
      });
      log(updated);

      var tempList = payTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == id) {
          arr[index] = updated.data.updatePaymentTaskBetweenRandS;
        }
      });
    } else {
      const updated = await API.graphql({
        query: updatePaymentTaskBetweenSandF,
        variables: {input: {id: id, receipt: 'some receipt'}},
      });
      log(updated);

      var tempList = payTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == id) {
          arr[index] = updated.data.updatePaymentTaskBetweenSandF;
        }
      });
    }
  } catch (e) {
    log(e);
  }
};

//seller task

export const getSendTask = async (companyType, companyID) => {
  try {
    if (companyType == 'supplier') {
      const task = await API.graphql({
        query: goodsTaskRetailerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'ASC',
        },
      });
      return task.data.goodsTaskRetailerForSupplierByDate.items;
    } else {
      const task = await API.graphql({
        query: goodsTaskForFarmerByDate,
        variables: {
          farmerID: companyID,
          sortDirection: 'ASC',
        },
      });
      return task.data.goodsTaskForFarmerByDate.items;
    }
  } catch (e) {
    log(e);
  }
};

export const getClaimTask = async (companyType, companyID) => {
  try {
    if (companyType == 'supplier') {
      const task = await API.graphql({
        query: paymentsTaskRetailerForSupplierByDate,
        variables: {
          supplierID: companyID,
          sortDirection: 'ASC',
        },
      });
      return task.data.paymentsTaskRetailerForSupplierByDate.items;
    } else {
      const task = await API.graphql({
        query: paymentsTaskForFarmerByDate,
        variables: {
          farmerID: companyID,
          sortDirection: 'ASC',
        },
      });
      return task.data.paymentsTaskForFarmerByDate.items;
    }
  } catch (e) {
    log(e);
  }
};

export const receivedPayment = async (companyType, id, claimTask) => {
  log('test', 'blue');
  try {
    if (companyType == 'supplier') {
      await API.graphql({
        query: deletePaymentTaskBetweenRandS,
        variables: {input: {id: id}},
      });
    } else {
      await API.graphql({
        query: deletePaymentTaskBetweenSandF,
        variables: {input: {id: id}},
      });
    }

    var tempList = claimTask;
    for (let [i, temp] of tempList.entries()) {
      if (temp.id == id) {
        tempList.splice(i, 1);
      }
    }
    try {
      log('updating', 'magenta');
      if (companyType == 'supplier') {
        await API.graphql({
          query: updateInvoiceBetweenRandS,
          variables: {input: {id: id, paid: true}},
        });
      } else {
        await API.graphql({
          query: updateInvoiceBetweenSandF,
          variables: {input: {id: id, paid: true}},
        });
      }
    } catch (e) {
      log('fail to update', 'cyan');
      log(e);
    }
    return tempList;
  } catch (e) {
    log(e);
  }
};

export const updateDeliveryDate = async (
  companyType,
  taskID,
  deliverydate,
  sendTask,
) => {
  try {
    if (companyType == 'supplier') {
      const response = await API.graphql({
        query: updateGoodsTaskBetweenRandS,
        variables: {
          input: {
            id: taskID,
            deliveryDate: deliverydate,
          },
        },
      });
    } else {
      const response = await API.graphql({
        query: updateGoodsTaskBetweenSandF,
        variables: {
          input: {
            id: taskID,
            deliveryDate: deliverydate,
          },
        },
      });
    }

    var tempList = sendTask;

    tempList.forEach((item, index, array) => {
      if (item == taskID) {
        item.deliveryDate = deliverydate;
        array[index] = item;
      }
    });

    return deliverydate;
  } catch (e) {
    log(e);
  }
};
