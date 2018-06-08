# Install package (not available yet)

```sh
npm install codechain-sdk
```

or

```sh
yarn add codechain-sdk
```

# Usage example
Make sure that your CodeChain RPC server is listening. In the examples, we assume it is localhost:8080

## Send PaymentTransaction

```javascript
import { SDK, Parcel, U256, H256, H160, PaymentTransaction } from "codechain-sdk";

// Create SDK object with CodeChain RPC server URL
const sdk = new SDK("http://localhost:8080");

// Create PaymentTransaction that sends 10000 CCC from 0x5bcd7c... to 0x744142..
// Transaction is only valid if the nonce matches the nonce of the sender.
// The nonce of the sender is increased by 1 when this transaction is confirmed.
const tx = new PaymentTransaction({
    nonce: new U256(0),
    sender: new H160("0x5bcd7c840f108172d94a4d084af711d879630fe6"),
    receiver: new H160("0x744142069fe2d03d48e61734cbe564fcc94e6e31"),
    value: new U256(10000)
});

// Parcel is only valid if the nonce matches the nonce of the parcel signer.
// The nonce of the signer is increased by 1 when this parcel is confirmed.
const parcelSignerNonce = new U256(0);
// Parcel signer pays 10 CCC as fee.
const fee = new U256(10);
// Network ID prevents replay attacks or confusion among different CodeChain networks.
const networkId = 17;
// Create Parcel
const parcel = new Parcel(parcelSignerNonce, fee, networkId, tx);

// Sign the parcel with the secret key of the address 0x31bd8354de8f7dbab6764a11851086061fee3f25.
const parcelSignerSecret = new H256("b15139f97aad25ae0330432aeb091ef962eee643e41dc07a1e04457c5c2c6088");
const signedParcel = parcel.sign(parcelSignerSecret);

// Send the signed parcel to the CodeChain node. The node will propagate this
// parcel and attempt to confirm it.
sdk.sendSignedParcel(signedParcel).then((hash) => {
    // sendSignedParcel returns a promise that resolves with a parcel hash if parcel has
    // been verified and queued successfully. It doesn't mean parcel was confirmed.
    console.log(`Parcel sent:`, hash);
    return sdk.getParcel(hash);
}).then((parcel) => {
    // getParcel returns a promise that resolves with a parcel.
    // blockNumber/blockHash/parcelIndex fields in Parcel is present only for the
    // confirmed parcel
    console.log(`Parcel`, parcel);
}).catch((err) => {
    console.error(`Error:`, err);
});

```

# [SDK](classes/sdk.html) methods
 * getAsset
 * getAssetScheme
 * getBalance
 * getBlock
 * getBlockHash
 * getBlockNumber
 * getNonce
 * getParcel
 * getParcelInvoices
 * getPendingParcels
 * getRegularKey
 * getTransactionInvoice
 * ping
 * sendSignedParcel

# Transactions
 * [PaymentTransaction](classes/paymenttransaction.html)
 * [SetRegularKeyTransaction](classes/setregularkeytransaction.html)
 * [AssetMintTransaction](classes/assetminttransaction.html)
 * [AssetTransferTransaction](classes/assettransfertransaction.html)