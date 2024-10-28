import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  coins: number = 0;
  clickCount: number = 0;
  clicksToNextUnlock: number = 10; 
  dinosaurCost: number = 50; 
  enclosureCost: number = 30; 
  message: string = '';


  buyDinosaur() {
    if (this.coins >= this.dinosaurCost) {
      this.coins -= this.dinosaurCost;
      this.message = 'Has comprado un nuevo dinosaurio.';
    }
  }

  handleClick() {
    this.clickCount++;
    this.coins++;
    //this.updateUnlockStatus();
  }







}
