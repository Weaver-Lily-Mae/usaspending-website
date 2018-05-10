/**
 * CoreRecipient-test.js
 * Created by Lizzie Salita 5/7/18
 */

import CoreRecipient from 'models/v2/state/CoreRecipient';

const recipientData = {
    name: 'Virginia',
    id: 1,
    totalAmount: 1234500,
    totalAwards: 98765
};

const recipient = Object.create(CoreRecipient);
recipient.populateCore(recipientData);

describe('Core Recipient getter functions', () => {
    it('should store the id as a string', () => {
        expect(recipient._id).toEqual(1);
        expect(recipient.id).toEqual('1');
    });
    it('should format the award total', () => {
        expect(recipient.totalAmount).toEqual('$1.2 million');
    });
    it('should format the total awards', () => {
        expect(recipient.totalAwards).toEqual('98,765');
    });
});
