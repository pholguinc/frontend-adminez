import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cursos-abiertos',
  imports: [FontAwesomeModule],
  templateUrl: './cursos-abiertos.component.html',
  styleUrl: './cursos-abiertos.component.scss'
})
export class CursosAbiertosComponent {
  search= faSearch;

}
