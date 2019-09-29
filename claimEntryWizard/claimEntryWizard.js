import { LightningElement, track } from 'lwc';

export default class Chs_ACMClaimEntry extends LightningElement {
    @track currentStep = 1;

    @track wizardStep1 = true;
    @track wizardStep2 = false;
    @track wizardStep3 = false;
    @track wizardStep4 = false;
    @track wizardStep5 = false;

    @track contactId =  null;
    @track claimId = null;

    handleWizardNavigation(event) {
        if(event.detail.contactId) this.contactId = event.detail.contactId;
        if(event.detail.claimid) this.claimId = event.detail.claimid;

        const step = event.detail.step;

        this.currentStep = 'step-'+step;
        this.wizardStep1 = (step===1);
        this.wizardStep2 = (step===2);
        this.wizardStep3 = (step===3);
        this.wizardStep4 = (step===4);
        this.wizardStep5 = (step===5);
    }
    
}