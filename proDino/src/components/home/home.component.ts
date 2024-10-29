import { Component, OnInit } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurservice.service';
import { EnclosureService } from '../../services/enclosureservice.service';
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

  constructor(
    private dinosaurService: DinosaurService,
    private enclosureService: EnclosureService
  ) {}

  ngOnInit() {
    this.dinosaurService.getDinosaurs().subscribe(data => {
      this.dinosaurs = data;
    });

    this.enclosureService.getEnclosures().subscribe(data => {
      this.enclosures = data;
    });
  }

  handleClick() {
    this.clickCount++;
    this.coins += 50; 
    this.updateUnlockStatus();
  }

  updateUnlockStatus() {
    this.clicksToNextUnlock = 10 - (this.clickCount % 10);
    this.message = this.clickCount % 10 === 0 ? '¡Nueva mejora desbloqueada!' : '';
  }

  buyDinosaur(dinosaur: any) {
    if (this.coins >= dinosaur.cost) {
      this.coins -= dinosaur.cost;
      this.message = `Has comprado un ${dinosaur.name}.`;
    }
  }

  buyEnclosure(enclosure: any) {
    if (this.coins >= enclosure.cost) {
      this.coins -= enclosure.cost;
      this.message = `Has comprado el recinto ${enclosure.name}.`;
    }
  }
}
