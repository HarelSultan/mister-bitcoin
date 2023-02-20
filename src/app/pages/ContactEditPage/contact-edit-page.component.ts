import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrls: ['./contact-edit-page.component.scss'],
})
export class ContactEditPageComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  contact!: Contact;
  subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ contact }) => {
      this.contact = contact || this.contactService.getEmptyContact();
    });
  }

  async onSaveContact() {
    try {
      await lastValueFrom(this.contactService.saveContact(this.contact));
      this.router.navigateByUrl('/contact');
    } catch (err) {
      console.error('Failed to add contact with error', err);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
