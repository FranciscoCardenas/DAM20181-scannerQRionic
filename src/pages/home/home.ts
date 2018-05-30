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

  generate() {
    let prompt = this.alertCtrl.create({
      title: 'Crear QR',
      message: "informacion del usuario",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'phone',
          placeholder: 'Phone'
        }
       /*, {
          name: 'email',
          placeholder: 'Email'
        },*/
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.value = {
              name:data.name,
              phone:data.phone
              //,email:data.email
            };
            this.QRCode = JSON.stringify(this.value);
          }
        }
      ]
    });
    prompt.present();

    
  }

}