# Rewards System for Client Coin Economy

This project is a rewards system designed for managing a client-based coin economy. It is built using Google Sheets and Google Apps Script to create a rewards menu where clients can redeem rewards using coins. The system tracks client balances, allows staff to update records, and supports dynamic USD-to-coin conversion.

## Features
- **Reward Redemption**: Clients can select rewards from a catalog and redeem them using coins or USD (converted to coins).
- **Client Balance Management**: Displays the client's current coin balance, deducts coins after a purchase, and updates the balance dynamically.
- **Custom Staff Input**: Staff can input their initials to track who processed the purchase.
- **Coin & USD Logic**: Rewards can be priced using coins or USD, and USD values are automatically converted to coins.
- **Purchase Tracking**: Purchases are recorded in the client's sheet, with timestamps, the reward purchased, and staff initials.

## Setup

### 1. Create Google Sheets
Create a new Google Sheet to use as your database for this rewards system.

- **"Rewards Catalog"**: A sheet containing the available rewards and their associated costs. The columns should be:
  - `Reward`
  - `Coin Cost`
  - `Description/Details`
  - `USD Relative Cost`
  - `Minimum Coin Cost`
  - `Maximum Coin Cost`
  - `Minimum USD Price`
  - `Maximum USD Price`

- **Client Sheets**: A sheet for each client that includes:
  - `Timestamp`
  - `Client Name`
  - `Reward Cost (Negative)`
  - `Reward Name`
  - `Staff Initials`
  - Client balance in `G1`.

### 2. Upload Google Apps Script
- Open your Google Sheets document.
- Go to `Extensions` > `Apps Script`.
- Paste the provided scripts into the Apps Script editor and save.

### 3. Functions Included
- `showRewardsMenu()`: Displays the rewards menu to the user.
- `getRewardsData()`: Fetches the available rewards from the "Rewards Catalog" sheet.
- `getClientBalance()`: Fetches the client's current coin balance.
- `processPurchase()`: Handles processing of the selected rewards and deducts coins from the client’s balance.
- `calculateTotal()`: Computes the total cost of rewards and ensures it's within the client’s balance.

### 4. Google Apps Script UI Integration
The script uses Google Apps Script's HTML service to present an interactive menu where staff can:
- Select rewards from the catalog.
- Input quantities for each reward.
- Input USD values to convert to coin cost.
- View the current balance and see the new balance after the purchase.
- Finalize the purchase, which will update the client sheet with the transaction.

### 5. Client Balance and Reward Management
The system dynamically tracks client balances, and ensures that purchases cannot exceed the available balance. Staff can easily manage rewards, and purchases are logged with the staff's initials for record-keeping.

## Instructions

1. **Open Google Sheets**: Open the Google Sheets file where you’ve added the script.
2. **Run the Script**: Use the custom menu (provided by the Google Apps Script) to display the rewards menu. Staff can then make purchases for clients based on their current coin balance.
3. **Finalize Purchases**: When the total coin amount is confirmed, the transaction is recorded in the client sheet and the client's balance is updated.
4. **Client Purchase Records**: Each transaction will be recorded with a timestamp, client name, reward, coin cost, and the initials of the staff member who processed the transaction.

### Google Sheets Template
You can access the template here: [Google Sheet Template](https://docs.google.com/spreadsheets/d/1uK7HA4TsESonbKKUdK9-uoiIxYQqsX-XRyAalS6KsVU/edit?usp=sharing)
I am not an artist.

## Contribution

Feel free to fork this repository, make improvements, or submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
