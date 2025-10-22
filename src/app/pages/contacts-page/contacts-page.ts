import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { Contact } from '../../interfaces/contact';
import { AuthService } from '../../services/auth-service';
import { ContactsService } from '../../services/contacts-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts-page',
  imports: [RouterModule, ContactListItem, FormsModule],
  templateUrl: './contacts-page.html',
  styleUrl: './contacts-page.scss'
})
export class ContactsPage implements OnInit {
  searchTerm = '';
  onlyFavorites = false;
  authService = inject(AuthService);
  contactsService = inject(ContactsService);

  ngOnInit(): void {
    this.contactsService.getContacts();
  }

  get filteredContacts(): Contact[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.contactsService.contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const matchesText =
        term.length === 0 ||
        fullName.includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.number.toLowerCase().includes(term);
      const matchesFavorite = !this.onlyFavorites || contact.isFavorite;

      return matchesText && matchesFavorite;
    });
  }
}
