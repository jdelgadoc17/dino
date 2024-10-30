import { Component, OnInit } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurservice.service';
import { EnclosureService } from '../../services/enclosureservice.service';
import { ParkService } from '../../services/parkservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  coins: number = 0;
  clickCount: number = 0;
  clicksToNextUnlock: number = 10;
  message: string = '';
  dinosaurs: any[] = [];
  enclosures: any[] = [];
  dinosauriosComprados: number[] = []; 
  recintosComprados: number[] = []; 
  userId: string = '';

  constructor(
    private dinosaurService: DinosaurService,
    private enclosureService: EnclosureService,
    private parkService: ParkService
  ) {}

  ngOnInit() {
    this.dinosaurService.getDinosaurs().subscribe(data => {
      this.dinosaurs = data;
    });

    this.enclosureService.getEnclosures().subscribe(data => {
      this.enclosures = data;
    });

    this.parkService.getParkStatus().subscribe(data => {
      this.coins = data.coins;
      this.dinosauriosComprados = data.dinosaurIds || [];
      this.recintosComprados = data.recintosIds || [];
      this.userId = data.userId;  // Guardamos el userId del parque
    });
  }

  handleClick() {
    this.clickCount++;
    this.coins += 50; 
    this.updateUnlockStatus();
    this.updatePark(); // Llamamos a updatePark para guardar el estado después de cada click
  }

  updateUnlockStatus() {
    this.clicksToNextUnlock = 10 - (this.clickCount % 10);
    this.message = this.clickCount % 10 === 0 ? '¡Nueva mejora desbloqueada!' : '';
  }

  buyDinosaur(dinosaur: any) {
    if (this.coins >= dinosaur.cost) {
      this.coins -= dinosaur.cost;
      this.dinosauriosComprados.push(dinosaur.id); 
      this.message = `Has comprado un ${dinosaur.name}.`;
      this.updatePark();  // Llamamos a updatePark para actualizar el estado
    }
  }

  buyEnclosure(enclosure: any) {
    if (this.coins >= enclosure.cost) {
      this.coins -= enclosure.cost;
      this.recintosComprados.push(enclosure.id); 
      this.message = `Has comprado el recinto ${enclosure.name}.`;
      this.updatePark();  // Llamamos a updatePark para actualizar el estado
    }
  }

  updatePark() {
    const data = {
      userId: this.userId,  // Incluimos userId
      coins: this.coins,
      dinosaurIds: this.dinosauriosComprados,
      recintosIds: this.recintosComprados,
    };

    this.parkService.updatePark(data).subscribe(response => {
      console.log('Parque actualizado:', response);
    });
  }
}
