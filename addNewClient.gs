function addNewClientSheet() {
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
      // Check if a sheet with this name already exists
      var sheet = ss.getSheetByName(sheetName);
      
      // If the sheet does not exist, create it
      if (!sheet) {
        var newSheet = ss.insertSheet(sheetName);
        
        // Hide the newly created sheet
        newSheet.hideSheet();
      }
    }
  }
  
  Logger.log("Script execution completed.");
}
