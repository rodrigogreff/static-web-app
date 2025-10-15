import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'; // ajuste o caminho se necessário

@Component({
  selector: 'app-root',
  template: `
    <h1>Dados do Backend</h1>

    <div *ngIf="carregando">Carregando...</div>

    <table *ngIf="!carregando && dados?.length" class="tabela-dados">
      <thead>
        <tr>
          <th>Data</th>
          <th>Temperatura (°C)</th>
          <th>Resumo</th>
          <th>Temperatura (°F)</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of dados">
          <td>{{ item.date }}</td>
          <td>{{ item.temperatureC }}</td>
          <td>{{ item.summary }}</td>
          <td>{{ item.temperatureF }}</td>
        </tr>
      </tbody>
    </table>

    <div *ngIf="!carregando && (!dados || dados.length === 0)">
      Nenhum dado disponível.
    </div>
  `,
  styles: [`
    .tabela-dados {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .tabela-dados th, .tabela-dados td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: center;
    }
    .tabela-dados th {
      background-color: #f4f4f4;
    }
    .tabela-dados tr:nth-child(even) {
      background-color: #fafafa;
    }
  `]
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


