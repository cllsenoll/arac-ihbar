self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Tarayıcıya bir Push bildirimi geldiğinde üst panelde gösterme
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Araç İhbar', body: 'Yeni bir mesajınız var!' };
  
  const options = {
    body: data.body,
    icon: 'https://img.icons8.com/fluents/96/car.png',
    badge: 'https://img.icons8.com/fluents/96/car.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Bildirime tıklandığında uygulamayı açma
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
