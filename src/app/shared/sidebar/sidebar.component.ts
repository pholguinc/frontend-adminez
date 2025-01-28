//Servicios de Angular
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

//Servicios de FontAwesome

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faChevronDown,
  faChevronUp,
  faDashboard,
} from '@fortawesome/free-solid-svg-icons';

// Servicios de la Aplicación

import { MenuItem, MenuService } from '@services/menu.service';
import AdminLayoutComponent from '@shared/layout/admin-layout/admin-layout.component';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private adminLayoutComponent = inject(AdminLayoutComponent);
  private menuService = inject(MenuService);
  private router = inject(Router);
  isDropdownOpen = false;

  open = faChevronUp;
  close = faChevronDown;

  dashboard = faDashboard;
  right = faArrowRight;

  menus: MenuItem[] = [];

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSubmenuState();
      });
  }

  ngOnInit(): void {
    this.menus = this.menuService.getMenus();
    this.updateSubmenuState();
  }

  updateSubmenuState(): void {
    const currentRoute = this.router.url;
    this.menus.forEach((menu) => {
      if (menu.isSubmenu) {
        menu.isOpen = menu.children?.some(
          (child) => currentRoute === child.link || this.isChildActive(child)
        );
      }
    });
  }

  isChildActive(child: MenuItem): boolean {
    return this.router.url.startsWith(child.link || '');
  }

  toggleDropdown(menu: MenuItem): void {
    this.menuService.toggleDropdown(menu);
  }

  get isSidebarOpen() {
    return this.adminLayoutComponent.isSidebarOpen();
  }

  toggleSidebar() {
    this.adminLayoutComponent.isSidebarOpen.update((current) => !current);
    console.log(this.adminLayoutComponent.isSidebarOpen());
  }

  isMenuActive(menu: MenuItem): boolean {
    if (menu.isSubmenu) {
      return (
        !!menu.isOpen ||
        menu.children?.some((child) => this.isChildActive(child)) ||
        false
      );
    }
    return this.isChildActive(menu);
  }
}
