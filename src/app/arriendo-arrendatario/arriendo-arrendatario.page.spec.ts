import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArriendoArrendatarioPage } from './arriendo-arrendatario.page';

describe('ArriendoArrendatarioPage', () => {
  let component: ArriendoArrendatarioPage;
  let fixture: ComponentFixture<ArriendoArrendatarioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArriendoArrendatarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArriendoArrendatarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
