import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
//  @Input() titulo: string;    //Nombre de la sucursal recibido desde el componente app.component.html
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  private inversor = [
    'Inversor',
    'Bateria 1',
    'Bateria 2',
    'Bateria 3',
    'Bateria 4'
  ];
  public items: Array<{ title: string; note: string; icon: string, url: string }> = [];
  constructor(private router: Router) {
    for (let i = 0; i < this.inversor.length; i++) {
      this.items.push({
        title: this.inversor[i],
        note: 'Ademi principal',
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        url: '/home'
      });
    }
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
