import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsistenciaDetallePage } from './asistencia-detalle.page';

describe('AsistenciaDetallePage', () => {
  let component: AsistenciaDetallePage;
  let fixture: ComponentFixture<AsistenciaDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
