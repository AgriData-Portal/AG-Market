import {Typography, Spacing, Colors, Mixins} from '_styles';
import {Platform} from 'react-native';
import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import {log} from '_utils';

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
