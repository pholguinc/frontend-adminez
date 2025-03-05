import { Component, OnInit } from '@angular/core';
import { PagosService } from './services/pagos.service';
import { ActivatedRoute } from '@angular/router';

declare var Izipay: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
})
export default class PagosComponent implements OnInit {
  decodedQueryParams: any;
  modalOpen: boolean = false;
  orderNumber: string = 'R202211101518';
  orderAmount: string = '15.00';
  orderCurrency: string = 'PEN';

  constructor(
    private pagosService: PagosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const encodedQueryString = Object.keys(params)[0];

      console.log('Encoded query string:', encodedQueryString);

      if (encodedQueryString) {
        const decodedQueryString = atob(encodedQueryString);

          const queryParams = new URLSearchParams(decodedQueryString);



        const token = queryParams.get('token');
        const total = queryParams.get('total');
        const transactionId = queryParams.get('transactionid');

        this.decodedQueryParams = {
          token,
          total,
          transactionId,
        };

        console.log('Decoded query string:', decodedQueryString);
        console.log('Query params:', queryParams);
      } else {
        console.error('No encoded query string found in the URL.');
      }
    });
    this.initializeIzipay();
  }

  openIzipay(): void {
    this.initializeIzipay();
  }


  callbackResponsePayment(response: any): void {
    console.log('Respuesta de pago:', response);
  }

  initializeIzipay(): void {
    try {
      const checkout = new Izipay({
        config: {
          transactionId: this.decodedQueryParams.transactionId,
          action: 'pay',
          merchantCode: '4007701',
          amount: this.decodedQueryParams.amount,
          order: {
            orderNumber: 'R202211101518',
            currency: 'PEN',
            amount: this.decodedQueryParams.total,
            processType: 'AT',
            merchantBuyerId: '123456',
            dateTimeTransaction: '1670258741603000',
          },
          billing: {
            firstName: 'Juan',
            lastName: 'Wick Quispe',
            email: 'jwickq@izi.com',
            phoneNumber: '958745896',
            street: 'Av. Jorge Chávez 275',
            city: 'Lima',
            state: 'Lima',
            country: 'PE',
            postalCode: '15038',
            documentType: 'DNI',
            document: '21458796',
          },
        },
      });
      console.log('check', checkout);

      checkout.LoadForm({
        authorization: this.decodedQueryParams.token,
        keyRSA: 'VErethUtraQuxas57wuMuquprADrAHAb',
        callbackResponse: this.callbackResponsePayment,
      });
    } catch (error) {
      console.error('Error al iniciar Izipay', error);
    }
  }
}
