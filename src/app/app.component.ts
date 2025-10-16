import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
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
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      margin: 40px auto;
      width: 90%;
      max-width: 800px;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 20px;
    }

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
