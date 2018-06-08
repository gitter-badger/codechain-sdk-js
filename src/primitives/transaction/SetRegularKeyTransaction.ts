import { H160, H512, U256 } from "../index";

export type SetRegularKeyTransactionData = {
    address: H160;
    nonce: U256;
    key: H512;
};
/**
 * Registers address' regular key. The regular key can sign in place of the account's private key.
 * Its nonce has to be identical with the address account's nonce.
 * If there already exists a regular key, then the old one gets overwritten.
 * If the nonce is not identical, the transaction fails.
 */
export class SetRegularKeyTransaction {
    private data: SetRegularKeyTransactionData;
    private type = "setRegularKey";

    constructor(data: SetRegularKeyTransactionData) {
        this.data = data;
    }

    static fromJSON(data: any) {
        const { address, nonce, key } = data["setRegularKey"];
        return new this({
            address: new H160(address),
            nonce: new U256(nonce),
            key: new H512(key),
        });
    }

    toJSON() {
        const { address, nonce, key } = this.data;
        return {
            [this.type]: {
                address: address.value,
                nonce: nonce.value.toString(),
                key: key.value,
            }
        };
    }

    toEncodeObject() {
        const { address, nonce, key } = this.data;
        return [2, address.toEncodeObject(), nonce.toEncodeObject(), key.toEncodeObject()];
    }
}
