import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    // Assert
    expect(comp).toBeTruthy();
  });

  it('title defaults to: app', () => {
    // Assert
    expect(comp.title).toEqual('app');
  });

  it('should render title', () => {
    // Arrange
    const el = fixture.debugElement.nativeElement;
    
    // Act
    fixture.detectChanges();
    const renderedTitle = el.querySelector('h1.title').textContent;

    // Assert
    expect(renderedTitle).toContain('Welcome to app!');
  });
});
