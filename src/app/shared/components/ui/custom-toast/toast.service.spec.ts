import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    service.dismissAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty toast list', () => {
    expect(service.toasts()).toHaveLength(0);
  });

  it('should add a toast when show() is called', () => {
    service.show('Messaggio');
    expect(service.toasts()).toHaveLength(1);
  });

  it('should return the toast id from show()', () => {
    const id = service.show('Messaggio');
    expect(typeof id).toBe('string');
    expect(id.startsWith('toast-')).toBe(true);
  });

  it('should store the correct message', () => {
    service.show('Testo del toast');
    expect(service.toasts()[0].message).toBe('Testo del toast');
  });

  it('should store the correct variant', () => {
    service.show('Ok', 'success');
    expect(service.toasts()[0].variant).toBe('success');
  });

  it('should default to neutral variant', () => {
    service.show('Messaggio');
    expect(service.toasts()[0].variant).toBe('neutral');
  });

  it('should store the title when provided', () => {
    service.show('Messaggio', 'info', { title: 'Titolo' });
    expect(service.toasts()[0].title).toBe('Titolo');
  });

  it('should default to top-right position', () => {
    service.show('Messaggio');
    expect(service.toasts()[0].position).toBe('top-right');
  });

  it('should store the provided position', () => {
    service.show('Messaggio', 'info', { position: 'bottom-left' });
    expect(service.toasts()[0].position).toBe('bottom-left');
  });

  it('should default duration to 4000ms', () => {
    service.show('Messaggio');
    expect(service.toasts()[0].duration).toBe(4000);
  });

  it('should store the provided duration', () => {
    service.show('Messaggio', 'info', { duration: 2000 });
    expect(service.toasts()[0].duration).toBe(2000);
  });

  it('should default dismissible to true', () => {
    service.show('Messaggio');
    expect(service.toasts()[0].dismissible).toBe(true);
  });

  it('should store dismissible false when provided', () => {
    service.show('Messaggio', 'info', { dismissible: false });
    expect(service.toasts()[0].dismissible).toBe(false);
  });

  it('should store the action when provided', () => {
    const action = { label: 'Annulla', onClick: vi.fn() };
    service.show('Messaggio', 'info', { action });
    expect(service.toasts()[0].action?.label).toBe('Annulla');
  });

  it('should show a success toast', () => {
    service.success('Operazione riuscita');
    expect(service.toasts()[0].variant).toBe('success');
  });

  it('should show an error toast with 6000ms duration by default', () => {
    service.error('Errore');
    expect(service.toasts()[0].variant).toBe('error');
    expect(service.toasts()[0].duration).toBe(6000);
  });

  it('should show a warning toast', () => {
    service.warning('Attenzione');
    expect(service.toasts()[0].variant).toBe('warning');
  });

  it('should show an info toast', () => {
    service.info('Informazione');
    expect(service.toasts()[0].variant).toBe('info');
  });

  it('should show a neutral toast', () => {
    service.neutral('Neutro');
    expect(service.toasts()[0].variant).toBe('neutral');
  });

  it('should dismiss a toast by id', () => {
    const id = service.show('Messaggio');
    service.dismiss(id);
    expect(service.toasts()).toHaveLength(0);
  });

  it('should not affect other toasts when dismissing by id', () => {
    service.show('Primo');
    const id = service.show('Secondo');
    service.dismiss(id);
    expect(service.toasts()).toHaveLength(1);
    expect(service.toasts()[0].message).toBe('Primo');
  });

  it('should dismiss all toasts', () => {
    service.show('A');
    service.show('B');
    service.show('C');
    service.dismissAll();
    expect(service.toasts()).toHaveLength(0);
  });

  it('should dismiss toasts by position', () => {
    service.show('Top', 'info', { position: 'top-right' });
    service.show('Bottom', 'info', { position: 'bottom-left' });
    service.dismissPosition('top-right');
    expect(service.toasts()).toHaveLength(1);
    expect(service.toasts()[0].position).toBe('bottom-left');
  });

  it('should pause a toast by id', () => {
    const id = service.show('Messaggio');
    service.pause(id);
    expect(service.toasts()[0].paused).toBe(true);
  });

  it('should resume a toast by id', () => {
    const id = service.show('Messaggio');
    service.pause(id);
    service.resume(id);
    expect(service.toasts()[0].paused).toBe(false);
  });

  it('should enforce MAX_PER_POSITION by removing oldest toast', () => {
    for (let i = 0; i < 6; i++) {
      service.show(`Toast ${i}`, 'info', { position: 'top-right', duration: 0 });
    }
    const topRight = service.toasts().filter(t => t.position === 'top-right');
    expect(topRight.length).toBe(5);
    expect(topRight[0].message).toBe('Toast 1');
  });

  it('should group toasts by position in toastsByPosition', () => {
    service.show('A', 'info', { position: 'top-right', duration: 0 });
    service.show('B', 'info', { position: 'bottom-left', duration: 0 });
    const groups = service.toastsByPosition();
    expect(groups['top-right']).toHaveLength(1);
    expect(groups['bottom-left']).toHaveLength(1);
  });

  it('should generate unique ids for each toast', () => {
    const id1 = service.show('A');
    const id2 = service.show('B');
    expect(id1).not.toBe(id2);
  });
});
