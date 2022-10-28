/* eslint-disable no-underscore-dangle */
import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartManagerService } from '../service/chart-manager.service';
import { ComercioService } from '../service/comercio.service';

@Component({
  selector: 'app-graphic-chart',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicChartComponent implements OnInit {

  @Input() typeChar = '';

  public idGenerate = '';
  public title = '';
  private dataChart = {
    line: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo','Junio','Julio'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    bar: {
      labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
        '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
      datasets: [
        {
          label: 'Sales',
          data: ['467', '576', '572', '79', '92',
            '574', '573', '576'],
          backgroundColor: 'blue'
        },
        {
          label: 'Profit',
          data: ['542', '542', '536', '327', '17',
            '0.00', '538', '541'],
          backgroundColor: 'limegreen'
        }
      ]
    }
  };

  constructor(private _charService: ChartManagerService, private _comercio: ComercioService) { }

  ngOnInit() {
    this.createChart(this.typeChar);
  }

  createChart(key) {
    this.idGenerate = `canva-${key}`;
    if (key === 'pie'){
      this.pieChart();
      return;
    }
    if (key === 'line'){
      this.lineChart();
      return;
    }
    if (key === 'bar'){
      this.barChar();
      return;
    }
  }

  barChar(){
    this._comercio.getCompras().subscribe(data => {
      const result = this._charService.mappingBarChar(data.message);
      this.title = result.title;
      this.builChart('bar', result.data);
    });
  }

  lineChart(){
    this._comercio.getVentas().subscribe(data => {
      const result = this._charService.mappingLineChar(data.message);
      this.title = result.title;
      this.builChart('line', result.data);
    });
  }

  pieChart(){
    this._charService.getPurchasesVsEarnings().subscribe(
      data => {
        const result = this._charService.mappingPieChar(data.message);
        this.title = result.title;
        this.builChart('pie', result.data);
      }
    );
  }

  builChart(type, data){
    new Chart(this.idGenerate, {
      type,
      data,
      options: {
        aspectRatio: 2.5
      }
    });
  }

}
