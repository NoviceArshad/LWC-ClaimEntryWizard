import { LightningElement, track, api } from 'lwc';

export default class ClaimEntryVehicle extends LightningElement {
    @api claimid;
    @track isLoading = false;

    handleClick(event) {
        event.preventDefault();
        console.log(this.claimid);
    }

    handleSubmit() {
        this.isLoading = true;
    }

    handleSuccess(event){
        this.isLoading = false;
        event.preventDefault();       // stop the form from submitting
        //const fields = event.detail.fields;
        this.dispatchEvent(new CustomEvent('wizardnext', {detail: {step:4}}));
    }
}