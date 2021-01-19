import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerAsistenciasPage } from './ver-asistencias.page';

describe('VerAsistenciasPage', () => {
  let component: VerAsistenciasPage;
  let fixture: ComponentFixture<VerAsistenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAsistenciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerAsistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
