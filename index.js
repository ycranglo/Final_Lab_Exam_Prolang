const records = new Array(100000);
let CountRecords = 0;

//this are the validations for the input of the users

function isValidDiscription(partDiscription) {
  let isValidate = false;
  const maxLength = 26;

  if (partDiscription.length < maxLength) {
    isValidate = true;
  }
  return isValidate;
}

function isValidPartNumber(partNumber) {
  const maxlenght = 10;
  let isValid = true;
  if (partNumber.length != maxlenght || partNumber.match(".*[a-zA-Z].*")) {
    isValid = false;
  }
  return isValid;
}

function isValidPrice(price) {
  let isValid = true;
  if (price.match(".*[a-zA-Z].*")) {
    isValid = false;
  }
  return isValid
}



//this are the functions needed in craeating a transactions with the user
function create(partNumber, partDescriptionString, price, isDelete = false) {
  if (CountRecords < records.length) {
    records[CountRecords] = {
      partNumber: partNumber,
      partDescriptionString: partDescriptionString,
      price: price,
      isDelete: isDelete
    };
    CountRecords++;
  } else {
    console.log('Inventory array is full');
  }
}

function upDatePrice(partNumber, newPrice) {
  let isChanged = false;
  for (let i = 0; i < CountRecords; i++) {
    if (records[i] !== null && records[i].partNumber === partNumber) {
      records[i].price = newPrice;
      isChanged = true;
      console.log(`Updated price for partNumber ${partNumber} to ${newPrice}`);
      break; // Exit the loop after updating the first matching record
    }
  }
  
  if (!isChanged) {
    console.log('Record not found');
  }
}

function upDateDescription(partNumber, newPartDescription) {
  let isChange = false;
  try {
    for (let i = 0; i < CountRecords; i++) {
      if (records[i] != null && records[i].partNumber === partNumber) {
        records[i].partDescriptionString = newPartDescription;
        isChange = true;
      }
    }
  } catch (e) {
    console.log("Wrong input part number, please try again.");
  }
  return isChange;
}

function findPartNum(partNum) {
  let isFind = false;
  for (let i = 0; i < CountRecords; i++) {
    if (records[i] != null && records[i].partNumber === partNum && records[i].isDelete === false) {
      isFind = true;
      break; // Assuming we stop searching after finding the first match
    }
  }
  return isFind;
}

function deleteRecord(partNumber) {
  let isFind = false;
  for (let i = 0; i < CountRecords; i++) {
    if (records[i] !== null && records[i].partNumber === partNumber) {
      records[i].isDelete = true;
      isFind = true;
      console.log(`Deleted record with partNumber ${partNumber}`);
    }
  }
  if (!isFind) {
    console.log(`Record with partNumber ${partNumber} not found`);
  }
  return isFind;
}

function read() {
  console.log("Inventory Records");
  console.log();
  console.log("PartNumber     || Description               || Price     ");
  for (let i = 0; i < CountRecords; i++) {
    if (records[i] !== null && records[i].isDelete !== true) {
      console.log(
        `${records[i].partNumber}     || ${records[i].partDescriptionString}          || $ ${records[i].price}`
      );
    }
  }
}

// Export the functions and any necessary data
module.exports = {
  create,
  upDatePrice,
  upDateDescription,
  findPartNum,
  records,         // Exporting the records array for direct access if needed
  CountRecords,
  read,
  deleteRecord,
  isValidDiscription,
  isValidPartNumber
};
