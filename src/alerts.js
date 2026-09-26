import Swal from 'sweetalert2';

export const alerts = Swal.mixin({ position: 'bottom', customClass: { popup: 'app-alert' }, confirmButtonText: 'Entendido', confirmButtonColor: '#6d28d9', cancelButtonColor: '#475569', reverseButtons: true });
export function notify(titleText) {
  return alerts.fire({ titleText, icon: 'success', toast: true, position: 'bottom', showConfirmButton: false, showCloseButton: true, closeButtonAriaLabel: 'Cerrar aviso', timer: 2800, timerProgressBar: true, didOpen: popup => { popup.onmouseenter = Swal.stopTimer; popup.onmouseleave = Swal.resumeTimer; } });
}
