/**
 * BaseContract-test.js
 * Created by Lizzie Salita 3/12/18
 */

import BaseContract from 'models/v2/awards/BaseContract';
import CoreLocation from "models/v2/CoreLocation";
import BaseAwardRecipient from "models/v2/awards/BaseAwardRecipient";
import CoreAwardAgency from "models/v2/awards/CoreAwardAgency";
import BaseContractAdditionalDetails from "models/v2/awards/additionalDetails/BaseContractAdditionalDetails";

import { mockContract, mockAwardV1Api } from './mockAwardApi';

const contract = Object.create(BaseContract);
contract.populate(mockContract);

describe('BaseContract', () => {
    describe('monetary values', () => {
        it('should format the contract amount', () => {
            expect(contract.amount).toEqual('$234,234');
        });
        it('should format the obligated amount', () => {
            expect(contract.obligation).toEqual('$123,231,313');
        });
    });
    describe('awardType', () => {
        const contract1 = Object.create(BaseContract);
        contract1.populate(mockAwardV1Api);
        it('should return the idv type for the idv category', () => {
            const mockIdv = Object.assign({}, mockAwardV1Api, {
                category: null
            });
            const idv = Object.create(BaseContract);
            idv.populate(mockIdv);

            expect(idv.awardType).toEqual('mock idv type');
        });
        it('should return the contract type otherwise', () => {
            expect(contract1.awardType).toEqual('mock contract type');
        });
    });
    describe('agencies', () => {
        it('should only populate an awarding/funding agency if it is available in the API response', () => {
            const emptyAgency = Object.create(CoreAwardAgency);
            expect(contract.awardingAgency).not.toEqual(emptyAgency);
            expect(contract.fundingAgency).toEqual(emptyAgency);
        });
        it('should format toptier and subtier names', () => {
            expect(Object.getPrototypeOf(contract.awardingAgency)).toEqual(CoreAwardAgency);
        });
    });
    describe('Place of Performance', () => {
        it('should be an object with CoreLocation in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.placeOfPerformance)).toEqual(CoreLocation);
        });
    });
    describe('Recipient', () => {
        it('should be an object with BaseAwardRecipient in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.recipient)).toEqual(BaseAwardRecipient);
        });
    });
    describe('Additional Details', () => {
        it('should be an object with BaseContractAdditionalDetails in its prototype chain', () => {
            expect(Object.getPrototypeOf(contract.additionalDetails)).toEqual(BaseContractAdditionalDetails);
        });
    });
});
