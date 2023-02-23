import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { MoveModel } from 'src/app/models/move.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  contact!: Contact;
  lastMoves!: MoveModel[];
  subscription!: Subscription;

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data.subscribe(({ contact }) => {
      this.contact = contact;
      this.lastMoves = this.userService.getMoves(this.contact._id);
    });
  }

  async onTransferCoins(amount: number) {
    try {
      this.userService.updateUserCoins(this.contact, amount);
    } catch (err) {
      console.log(err);
    }
  }

  onBack() {
    this.router.navigateByUrl('/contact');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
