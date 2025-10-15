import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-root',
  template: `
    <h1>Dados do Backend</h1>

    <div *ngIf="carregando">Carregando...</div>

    <div *ngIf="!carregando && dados">
      <pre>{{ dados | json }}</pre>
    </div>

    <div *ngIf="!carregando && !dados">
      Nenhum dado disponível.
    </div>
  `,
})
export class AppComponent implements OnInit {
  dados: any;
  carregando = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.buscarDados();
  }

  buscarDados() {
    this.carregando = true;
    this.apiService.getData().subscribe({
      next: (res) => {
        this.dados = res;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao chamar API:', err);
        this.carregando = false;
      },
    });
  }
}
