import { Component } from '@angular/core';
import { DinosaurService } from '../../services/dinosaurservice.service';
import { ParkService } from '../../services/parkservice.service';
import { EnclosureService } from '../../services/enclosureservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})


export class HomeComponent {
  coins: number = 0;
  clickCount: number = 0;
  clicksToNextUnlock: number = 10; 
  dinosaurCost: number = 50; 
  enclosureCost: number = 30; 
  message: string = '';


  constructor(private parkService: ParkService, private dinosaurService: DinosaurService, private enclosureService: EnclosureService) {}

  ngOnInit() {
    this.parkService.getParkStatus().subscribe(data => {
      
    })



    this.dinosaurService.getDinosaurs().subscribe(data => {
      
    })

    this.enclosureService.getEnclosures().subscribe(data => {
      
    })
  }

  handleClick() {
    this.clickCount++;
    this.coins++;
    this.updateUnlockStatus();
  }

  updateUnlockStatus() {
    this.clicksToNextUnlock = 10 - (this.clickCount % 10);
    if (this.clickCount % 10 === 0) {
      this.message = '!';
    } else {
      this.message = '';
    }
  }

  buyDinosaur() {
    if (this.coins >= this.dinosaurCost) {
      this.coins -= this.dinosaurCost;
      this.message = 'Has comprado un nuevo dinosaurio.';
    }
  }

  buildEnclosure() {
    if (this.coins >= this.enclosureCost) {
      this.coins -= this.enclosureCost;
      this.message = 'Has construido un nuevo recinto.';
    }
  }
}
