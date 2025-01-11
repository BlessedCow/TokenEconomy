function showRewardsMenu() {
  var html = HtmlService.createHtmlOutputFromFile('RewardsMenu')
      .setWidth(800)
      .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Redeem Rewards');
}

function getRewardsData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Rewards Catalog");
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
  return data;
}

function getClientBalance() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var redeemSheet = spreadsheet.getSheetByName('Redeem');
  var selectedClient = redeemSheet.getRange("B2").getValue();
  var clientSheet = spreadsheet.getSheetByName(selectedClient);
  
  if (clientSheet) {
    var balance = clientSheet.getRange('G1').getValue(); // Assuming balance is in cell G1
    return { balance: balance, clientName: selectedClient };
  }
  return { balance: 0, clientName: 'Unknown' }; // Return default values if the client sheet doesn't exist
}


function processPurchase(clientName, selectedRewards, staffInitials) {
  var clientSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(clientName);
  if (!clientSheet) {
    throw new Error("Client sheet not found.");
  }

  var timestamp = new Date();
  var totalCost = 0;

  selectedRewards.forEach(function(reward) {
    var rewardName = reward.name;
    var quantity = reward.quantity;
    var totalCostPerReward = reward.coins;
    totalCost += totalCostPerReward;

    clientSheet.appendRow([timestamp, clientName, -totalCostPerReward, rewardName, staffInitials]);
    var lastRow = clientSheet.getLastRow();

    // Highlight the first 5 columns (A to E) of the last row
    clientSheet.getRange(lastRow, 1, 1, 5).setBackground('#cc0000'); // Highlight columns A to E
});

  var currentBalance = clientSheet.getRange('G1').getValue();
  clientSheet.getRange('G1').setValue(currentBalance - totalCost);
}
