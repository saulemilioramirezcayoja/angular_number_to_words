import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exercise_1';
  number: number = 0;

  private units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  private tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  private special = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  private hundreds = ['', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  constructor(private snack_bar: MatSnackBar) {
  }

  convert() {
    const result = this.convert_to_words(this.number);
    this.snack_bar.open(result, 'Cerrar', {
      duration: 3000
    });
  }

  private convert_to_words(num: number): string {
    if (num < 0 || num > 999999) {
      return 'Número fuera de rango (0 - 999999)';
    }

    if (num < 10) {
      return this.units[num];
    } else if (num < 20) {
      return this.special[num - 10];
    } else if (num < 100) {
      return this.convert_tens(num);
    } else if (num < 1000) {
      return this.convert_hundreds(num);
    } else if (num < 1000000) {
      return this.convert_thousands(num);
    }

    return '';
  }

  private convert_tens(num: number): string {
    const unit = num % 10;
    const ten = Math.floor(num / 10);

    if (unit === 0) {
      return this.tens[ten];
    } else if (ten === 2) {
      return 'veinti' + this.units[unit];
    } else {
      return this.tens[ten] + ' y ' + this.units[unit];
    }
  }

  private convert_hundreds(num: number): string {
    const tens = num % 100;
    const hundred = Math.floor(num / 100);

    if (tens === 0) {
      return hundred === 1 ? 'cien' : this.hundreds[hundred];
    } else {
      return this.hundreds[hundred] + ' ' + this.convert_to_words(tens);
    }
  }

  private convert_thousands(num: number): string {
    const hundreds = num % 1000;
    const thousands = Math.floor(num / 1000);

    const thousands_word = thousands === 1 ? 'mil' : this.convert_to_words(thousands) + ' mil';
    if (hundreds === 0) {
      return thousands_word;
    } else {
      return thousands_word + ' ' + this.convert_to_words(hundreds);
    }
  }
}
