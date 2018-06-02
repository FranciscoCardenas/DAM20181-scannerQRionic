import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //public contacts: any = [];

  value = {
    name: '',
    phone: ''
    //,email: ''
  };

  QRCode;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private contacts: Contacts,
    public alertCtrl: AlertController) { }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.cancelled) return;
      //this.contacts.push(new Object(JSON.parse(barcodeData.text)));
      let readedContact = new Object(JSON.parse(barcodeData.text));

      let contact: Contact = this.contacts.create();
      contact.name = new ContactName(null, null, JSON.parse(barcodeData.text).name);
      contact.phoneNumbers = [new ContactField('mobile', JSON.parse(barcodeData.text).phone)];
      //contact.emails = [new ContactField('email', JSON.parse(barcodeData.text).email)];
      contact.save().then(
        () => alert('Contact saved!'),
        (error: any) => alert('Error saving contact.')
      );

    }).catch(err => {
      alert(err.toString());
    });
  }
