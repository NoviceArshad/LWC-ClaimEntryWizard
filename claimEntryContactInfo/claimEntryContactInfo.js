import { LightningElement, track } from 'lwc';
import getContactByEmail from '@salesforce/apex/chs_ACMClaimEntryController.getContactByEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ClaimEntryContactInfo extends LightningElement {
    @track currentStep = 2;
    @track contactId =  null;
    @track isLoading = false;

    handleSubmit(event) {
        const allValid = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputCmp) => {
                        inputCmp.reportValidity();
                        this.lastName = inputCmp.value;
                        return validSoFar && inputCmp.checkValidity();
            }, true);

        if (allValid) {
            this.isLoading = true;
            getContactByEmail({ 
                theEmail: this.template.querySelector('.emailAddress').value, 
                firstName: this.template.querySelector('.firstName').value, 
                lastName: this.template.querySelector('.lastName').value, 
                companyName: this.template.querySelector('.companyName').value })
                .then(result => {
                    this.isLoading = false;
                    console.log('Success return ID '+ JSON.stringify(result));
                    if(result && result.idContact){
                        this.contactId = result.idContact;
                        this.error = undefined;
                        this.dispatchEvent(new CustomEvent('wizardnext', {detail: {step: 2, contactId: this.contactId}}));
                    } else {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Warning',
                                message: result.message,
                                variant: 'warning'
                            })
                        );
                        //alert(result.message);
                    }
                })
                .catch(error => {
                    this.isLoading = false;
                    console.log('Error return');
                    console.log(error);
                    this.error = error;
                    this.recordId = null;
                });
        }
    }

    /* handleEmailChange(event) {
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            console.log(event.target.value);
            getContactByEmail({ theEmail: event.target.value })
                .then(result => {
                    console.log('Success return');
                    //this.recordId = result;
                    //showContactLookupSuggestion(result);
                    afterSelectContact(result[0]);
                    this.error = undefined;
                })
                .catch(error => {
                    console.log('Error return');
                    console.log(error);
                    this.error = error;
                    this.recordId = null;
                });
            //this.searchKey = searchKey;
        }, DELAY);

        //this.recordId = '5006C000004MBhEQAW';
        
        //alert(this.target.value);
    }

    showContactLookupSuggestion(contacts) {

    }

    afterSelectContact(contactId) {
        getSubOfficesByContactId({ idContact: contactId })
            .then(result => {
                for (let i = 0; i < result.length; i++) {
                    const suboffice = result[i];
                    this.subOfficeOptions.push({label: suboffice.Name, value: suboffice.Id});
                    
                }
                this.error = undefined;
            })
            .catch(error => {
                console.log('Error return');
                console.log(error);
                this.error = error;
                this.recordId = null;
            });
    }
    */
    
}