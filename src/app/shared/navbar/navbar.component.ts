import { Component, HostListener, inject } from '@angular/core';
import AdminLayoutComponent from '@shared/layout/admin-layout/admin-layout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  adminLayoutComponent = inject(AdminLayoutComponent);

  isSidebarOpen = false;
  isDropdownUserOpen = false;
  isFlagOpen = false;

  onToggleSidebar() {
    this.adminLayoutComponent.toggleSidebar();
  }

  toggleUserDropdown() {
    this.isDropdownUserOpen = !this.isDropdownUserOpen;
  }

  toggleFlagDropdown() {
    this.isFlagOpen = !this.isFlagOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: MouseEvent) {
    const dropdown = document.getElementById('user-dropdown');
    const button = document.getElementById('user-dropdown-btn');
    const target = event.target as HTMLElement;

    if (
      dropdown &&
      button &&
      !dropdown.contains(target) &&
      !button.contains(target)
    ) {
      this.isDropdownUserOpen = false;
    }
  }
}
