import { LightningElement, track, api, wire } from 'lwc';
import getSubOfficesByContactId from '@salesforce/apex/chs_ACMClaimEntryController.getSubOfficesByContactId';

export default class ClaimEntryAccountInfo extends LightningElement {
    @api contactid;
    @track isLoading = false;

    @wire(getSubOfficesByContactId, {idContact: '$contactid'})
    SubOfficeOptions;

    handleSubmit(event){
        this.isLoading = true;
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        fields.Sub_Office__c = this.template.querySelector('.Sub_Office__c').value;
        fields.ContactId = this.contactid;
        console.log(JSON.stringify(fields));
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event){
        this.isLoading = false;
        event.preventDefault();       // stop the form from submitting
        console.log(JSON.stringify(event.detail));
        //const fields = event.detail.fields;
        this.dispatchEvent(new CustomEvent('wizardnext', {detail: {step: 3, claimid: event.detail.id}}));
    }
}