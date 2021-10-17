# VHS code challenge, Block explorer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- Display the latest 10 blocks on the Ethereum blockchain
- Allow the user to select a block and see the transactions associated with it
- Only the transactions sending ETH should be displayed
- Display some relevant details associated with each transaction

Extra credit:

- Update the blocks in real time
- Add transaction filtering based on the user wallet address.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Improvements

### Medium priority

- Encapsulate Web3 api
- Investigate [Batch Request](https://web3js.readthedocs.io/en/v1.5.2/include_package-core.html?highlight=batch#batchrequest) for fetching the latest 10 blocks

### Low priority

- Calculate transactions fee while are being displayed on the table, it should improve performance.
- UX/UI improvements
- Calculate [Block Reward](https://eth.wiki/en/fundamentals/mining) 
- Handling errors