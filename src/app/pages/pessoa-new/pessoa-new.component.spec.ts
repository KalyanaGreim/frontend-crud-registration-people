import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaNewComponent } from './pessoa-new.component';

describe('PessoaNewComponent', () => {
  let component: PessoaNewComponent;
  let fixture: ComponentFixture<PessoaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
