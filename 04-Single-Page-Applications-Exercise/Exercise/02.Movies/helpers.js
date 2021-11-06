export function buildNotificationEl() {
    let notificationEl = document.createElement('p');
    notificationEl.style.textAlign = 'center';
    notificationEl.style.fontWeight = 'bold';
    notificationEl.style.display = 'none';
    notificationEl.style.color = 'red';
    return notificationEl;
}