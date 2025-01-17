function updateClientList() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var referenceSheet = ss.getSheetByName("Reference");
  var redeemSheet = ss.getSheetByName("Redeem");
  var giveCoinSheet = ss.getSheetByName("Give Coin");

  if (!referenceSheet) {
    Logger.log("Reference sheet not found.");
    return;
  }

  // Get client names from Reference sheet starting from A2
  var clientNamesRange = referenceSheet.getRange("A2:A" + referenceSheet.getLastRow());
  var clientNames = clientNamesRange.getValues().flat().filter(String); // Filter out empty cells

  // Set data validation for dropdowns in Redeem and Give Coin sheets
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(clientNames, true).build();
  redeemSheet.getRange("B2").setDataValidation(rule);
  giveCoinSheet.getRange("B2:B3").setDataValidation(rule);

  // Define the color palette (Google Sheets default colors)
  var colors = [
    "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf",
    "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fffffc"
  ];

  // Clear any existing conditional formatting rules
  redeemSheet.clearConditionalFormatRules();
  giveCoinSheet.clearConditionalFormatRules();

  // Apply conditional formatting rules for each client name in Redeem sheet
  var redeemRules = clientNames.map(function(client, i) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(client)
      .setBackground(colors[i % colors.length])
      .setRanges([redeemSheet.getRange("B2")])
      .build();
  });
  redeemSheet.setConditionalFormatRules(redeemRules);

  // Apply conditional formatting rules for each client name in Give Coin sheet
  var giveCoinRules = clientNames.map(function(client, i) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(client)
      .setBackground(colors[i % colors.length])
      .setRanges([giveCoinSheet.getRange("B2:B3")])
      .build();
  });
  giveCoinSheet.setConditionalFormatRules(giveCoinRules);

  Logger.log("Dropdowns updated and colors applied.");
}
