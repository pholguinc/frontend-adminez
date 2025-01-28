import { Injectable } from '@angular/core';
import {
  faBoxesStacked,
  faCashRegister,
  faCheckDouble,
  faCheckToSlot,
  faCircleDollarToSlot,
  faDashboard,
  faFontAwesome,
  faGlasses,
  faGripVertical,
  faMapMarked,
  faMoneyBill1Wave,
  faShield,
  faTag,
  faTags,
  faTruckFast,
  faUser,
  faUserShield,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export interface MenuItem {
  title: string;
  icon?: IconDefinition;
  link?: string;
  open?: boolean;
  isSubmenu?: boolean;
  isOpen?: boolean;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  dashboard: IconDefinition = faDashboard;
  admin: IconDefinition = faGripVertical;
  users: IconDefinition = faUser;
  roles: IconDefinition = faUserShield;
  permission: IconDefinition = faCheckToSlot;
  categories: IconDefinition = faTags;


  private menus: MenuItem[] = [
    {
      title: 'Dashboard',
      link: '/admin',
      icon: this.dashboard,
      open: false,
      isSubmenu: false,
    },

    {
      title: 'Administración',
      icon: this.admin,
      isOpen: false,
      isSubmenu: true,
      children: [
        {
          title: 'usuarios',
          link: '/admin/usuarios',
          icon: this.users,
          isSubmenu: true,
        },
        {
          title: 'Roles',
          link: '/admin/roles',
          icon: this.roles,
          isSubmenu: true,
        },
        {
          title: 'Permisos',
          link: '/admin/permisos',
          icon: this.permission,
          isSubmenu: true,
        },
      ],
    },

    {
      title: 'Operaciones',
      icon: this.admin,
      isOpen: false,
      isSubmenu: true,
      children: [
        {
          title: 'Creación de fichas',
          link: '/admin/categorias',
          icon: this.categories,
          isSubmenu: true,
        },

      ],
    },

  ];

  getMenus(): MenuItem[] {
    return this.menus;
  }

  toggleDropdown(menu: MenuItem): void {
    if (menu.isSubmenu) {
      menu.isOpen = !menu.isOpen;
    }
  }
}
