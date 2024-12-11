import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  indicators: any[] = [];
  chart: any;

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit() {
    this.dashboardService.getIndicators().subscribe(
      (data) => {
        this.indicators = data; 
        this.renderChart();
      },
      (error) => {
        console.error('Erro ao buscar indicadores:', error);
      }
    );

    if (typeof window !== 'undefined' && localStorage) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user.name || 'Usuário';
    }
  }

  renderChart() {
    const ctx = document.getElementById('alertsChart') as HTMLCanvasElement;

    const hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00'];
    const alertCounts = [8, 2, 1, 3, 1, 1, 2];

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [
          {
            label: 'Number of Alerts',
            data: alertCounts,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
