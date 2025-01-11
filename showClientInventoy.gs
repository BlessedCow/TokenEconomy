function unhideSheetsFromReference() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var referenceSheet = ss.getSheetByName("Reference");
  
  if (!referenceSheet) {
    Logger.log("Reference sheet not found.");
    return;
  }
  
  // Get the data starting from A2 to the last row in the Reference sheet
  var dataRange = referenceSheet.getRange("A2:A" + referenceSheet.getLastRow());
  var data = dataRange.getValues();
  
  for (var i = 0; i < data.length; i++) {
    var sheetName = data[i][0];
    
    if (sheetName) {
      // Check if a sheet with this name exists
      var sheet = ss.getSheetByName(sheetName);
      
      // If the sheet exists, unhide it
      if (sheet) {
        sheet.showSheet();
      }
    }
  }
  
  Logger.log("All relevant sheets have been unhidden.");
}
