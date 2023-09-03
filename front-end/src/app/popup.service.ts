import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  isCreatePopupOpen = false;
  isUpdatePopupOpen = false;
  isDeletePopupOpen = false;

  openCreatePopup() {
    this.isCreatePopupOpen = true;
  }

  closeCreatePopup() {
    this.isCreatePopupOpen = false;
  }

  openUpdatePopup() {
    this.isUpdatePopupOpen = true;
  }

  closeUpdatePopup() {
    this.isUpdatePopupOpen = false;
  }

  openDeletePopup() {
    this.isDeletePopupOpen = true;
  }

  closeDeletePopup() {
    this.isDeletePopupOpen = false;
  }
}
