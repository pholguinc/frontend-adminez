import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faFileAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { QuillModule } from 'ngx-quill'
import { CursosAbiertosComponent } from './plantillas/cursos-abiertos/cursos-abiertos.component';
import { CursosCerradosComponent } from './plantillas/cursos-cerrados/cursos-cerrados.component';
@Component({
  selector: 'app-creacion-fichas',
  imports: [
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    CommonModule,
    FontAwesomeModule,
    CursosAbiertosComponent,
    CursosCerradosComponent,
  ],
  templateUrl: './creacion-fichas.component.html',
  styleUrl: './creacion-fichas.component.scss',
})
export default class CreacionFichasComponent {
  currentStep: number = 1;
  file = faFileAlt;
  check = faCheck;
  onUbicacion: boolean = false;
  onImagenCorreo: boolean = false;

  frmFicha!: FormGroup;
  frmFichaDinamico!: FormGroup;
  DatosParticipantes!: FormGroup;
  frmEmailConfig!: FormGroup;
  formElements: any[] = [];
  generatedContent: any;
  trash = faTrash;

  steps: string[] = ['Primer Paso', 'Segundo Paso', 'Tercer Paso'];

  constructor(private fb: FormBuilder) {
    this.frmFicha = this.fb.group({
      terminos: [''],
      ubicacion: [''],
      validarCorreo: [''],
    });

    this.frmFichaDinamico = this.fb.group({
      campo: [null, []],
      ancho: [null, []],
      tipo_plantilla: [null, []],
    });

    this.frmFichaDinamico.controls['campo'].disable();
    this.frmFichaDinamico.controls['ancho'].disable();

    this.DatosParticipantes = this.fb.group({});

    this.frmEmailConfig = this.fb.group({
      correoOrigen: [''],
      imagenCorreo: [''],
      asuntoCorreo: [''],
      MensajeCorreo: [''],
      redireccionar: [''],
      txtMensaje: [''],
    });
  }

  ngOnInit(): void {
    this.frmFicha.get('terminos')?.valueChanges.subscribe((checked) => {
      this.onUbicacion = checked;
      if (!checked) {
        this.frmFicha.get('ubicacion')?.reset();
      }
    });
  }


  cambiarPlantilla(){
    if(this.frmFichaDinamico.controls['tipo_plantilla'].value !== null){

      this.frmFichaDinamico.controls['campo'].enable();
      this.frmFichaDinamico.controls['ancho'].enable();

    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  changeStep(step: number) {
    if (step >= 1 && step <= 3) {
      this.currentStep = step;
      this.uploadComplete = false;
    }
  }

  fileName: string = '';
  fileSize: string = '';
  progress: number = 0;
  isUploading: boolean = false;
  uploadComplete: boolean = false;

  onFileChange(event: any): void {
    const file = event.target.files[0];

    if (this.isUploading || this.uploadComplete) {
      this.resetUpload();
    }

    if (file) {
      this.fileName = file.name;

      if (this.fileName.length > 12) {
        const splitName = this.fileName.split('.');
        this.fileName = splitName[0].substring(0, 13) + '... .' + splitName[1];
      }

      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.isUploading = true;
    let fakeProgress = 0;

    const interval = setInterval(() => {
      if (fakeProgress < 100) {
        fakeProgress += 1;
        this.progress = fakeProgress;
      } else {
        clearInterval(interval);
        this.uploadComplete = true;
        this.isUploading = false;
      }
    }, 50);
  }

  resetUpload(): void {
    this.isUploading = false;
    this.uploadComplete = false;
    this.progress = 0;
    this.fileName = '';
    this.fileSize = '';
  }

  agregarFormulario() {
    const campoSeleccionado = this.frmFichaDinamico.get('campo')?.value;
    const anchoSeleccionado = this.frmFichaDinamico.get('ancho')?.value;

    if (!campoSeleccionado || !anchoSeleccionado) {
      alert('Por favor, selecciona ambos campos.');
      return;
    }

    let formControlName: string;
    switch (campoSeleccionado) {
      case '0': // Input
        formControlName = 'inputField';
        break;
      case '1': // Select
        formControlName = 'selectField';
        break;
      case '2': // Tabla
        formControlName = 'tableField';
        break;
      case '3': // Botón
        formControlName = 'buttonField';
        break;
      default:
        formControlName = 'customField';
    }

    let nuevoElemento = this.fb.control('');

    this.DatosParticipantes.addControl(formControlName, nuevoElemento);

    this.formElements.push({
      campoSeleccionado,
      anchoSeleccionado,
      formControlName,
      formControl: nuevoElemento,
    });
  }

  remove(index: number): void {
    const formControlName = this.formElements[index].formControlName;
    this.frmFichaDinamico.removeControl(formControlName);
    this.formElements.splice(index, 1);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  get tipoPlantilla() {
    return this.frmFichaDinamico.get('tipo_plantilla');
  }
}
