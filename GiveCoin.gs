// Function to show the Coin Details dialog
function showCoinDialog() {
  var html = HtmlService.createHtmlOutputFromFile('CoinDetails')
      .setWidth(400)
      .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Enter Coin Details');
}

// Function to get client name from cell B2 on "Give Coin" sheet
function getClientNameFromSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Give Coin");
  var clientName = sheet.getRange("B2").getValue();
  return clientName;
}

// Function to handle the commit action
function commitCoinData(clientName, coinAmount, reason, initials, action) {
  if (action === 'commit') {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Default to "No reason given" if reason is not provided
    if (!reason) {
      reason = "No reason given";
    }
    
    // Get the current date and time
    var timestamp = new Date();
    
    // Check if a sheet with the client's name exists
    var clientSheet = ss.getSheetByName(clientName);
    if (!clientSheet) {
      // If the sheet does not exist, create it
      clientSheet = ss.insertSheet(clientName);
      // Set up the headers
      clientSheet.appendRow(["Timestamp", "Client Name", "Coin Amount", "Reason", "Initials"]);
    }
    
    // Append the transaction data to the client's sheet
    var newRow = clientSheet.appendRow([timestamp, clientName, coinAmount, reason, initials]);
    
    // Get the range of the newly added row
    var lastRow = clientSheet.getLastRow();
    var range = clientSheet.getRange(lastRow, 1, 1, 5); // Columns A to E
    
    // Set the background color to green for the new row
    range.setBackground('#36d336');
    
    // Pop-up message after commit
    SpreadsheetApp.getUi().alert("Thank you!");
  } else if (action === 'cancel') {
    // Cancel action logic
    SpreadsheetApp.getUi().alert("Transaction cancelled!");
  }
}
