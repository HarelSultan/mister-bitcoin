import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent {
  @Input() contact!: Contact;
  @Output() transferCoins = new EventEmitter();

  onSubmit(form: NgForm) {
    this.transferCoins.emit(form.value.coins);
    form.reset();
  }
}
