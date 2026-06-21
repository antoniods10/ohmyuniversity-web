import { Component, Input } from '@angular/core';
import { CustomTextComponent } from '@ui/custom-text/custom-text.component';

@Component({
  selector: 'app-home-greeting',
  standalone: true,
  imports: [CustomTextComponent],
  templateUrl: './home-greeting.component.html',
})
export class HomeGreetingComponent {
  @Input() userName: string = '';
  @Input() quote: string = '';
  @Input() greeting: string = '';
}
