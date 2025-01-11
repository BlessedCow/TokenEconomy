// Function to calculate and display client's balance
function calculateClientBalance() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var redeemSheet = ss.getSheetByName("Redeem");
  
  // Get the selected client from the dropdown in B2
  var selectedClient = redeemSheet.getRange("B2").getValue();
  
  if (!selectedClient) {
    // If no client is selected, show an alert
    SpreadsheetApp.getUi().alert("Please choose a name first!");
    return;
  }
  
  // Get the sheet corresponding to the selected client
  var clientSheet = ss.getSheetByName(selectedClient);
  
  if (!clientSheet) {
    // If the client's sheet doesn't exist, show an alert
    SpreadsheetApp.getUi().alert("No sheet found for the selected client!");
    return;
  }
  
  // Get all values from Column C of the client's sheet (starting from row 2 to avoid headers)
  var coinValues = clientSheet.getRange("C2:C" + clientSheet.getLastRow()).getValues();
  
  var totalBalance = 0;
for (var i = 0; i < coinValues.length; i++) {
  totalBalance += coinValues[i][0] || 0; // Sum values, handling any empty cells as 0
}

// Store the total balance temporarily in cell G1 of the client's sheet
clientSheet.getRange("G1").setValue(totalBalance);

// Display the total balance in an alert, but only if it's greater than 0
if (totalBalance > 0) {
  SpreadsheetApp.getUi().alert(selectedClient + "'s balance is " + totalBalance + " coins");
} else {
  SpreadsheetApp.getUi().alert(selectedClient + "'s balance is 0 coins");
}
}
