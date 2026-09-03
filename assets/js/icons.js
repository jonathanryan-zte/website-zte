/* ============================================================
   IKON — gaya garis (outline) mengikuti brand guide.
   Semua memakai stroke, bukan isian, agar mewarisi warna teks.
   Pakai lewat: ICON('truck')
   ============================================================ */
window.ICONS = {
  truck:
    '<path d="M2 8.5A1.5 1.5 0 0 1 3.5 7H14a1 1 0 0 1 1 1v9H2z"/><path d="M15 11h3.6a2 2 0 0 1 1.7 1l1.4 2.3a2 2 0 0 1 .3 1V17h-7z"/><circle cx="6.5" cy="17.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/>',
  boxes:
    '<path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="m4 7 8 4 8-4"/><path d="M12 11v10"/>',
  route:
    '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M15.5 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H8.5"/>',
  ship:
    '<path d="M3 15.5 12 12l9 3.5"/><path d="M4.5 21c1.6 0 1.6-1.2 3.2-1.2S9.3 21 10.9 21s1.6-1.2 3.2-1.2S15.7 21 17.3 21s1.6-1.2 3.2-1.2"/><path d="M5.5 15V9.5A1.5 1.5 0 0 1 7 8h10a1.5 1.5 0 0 1 1.5 1.5V15"/><path d="M12 8V4"/><path d="M9.5 4h5"/>',
  warehouse:
    '<path d="M2 9.5 12 4l10 5.5V21H2z"/><path d="M7 21v-7h10v7"/><path d="M7 17.5h10"/>',
  shield:
    '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6z"/><path d="m9 12 2.2 2.2L15.4 10"/>',
  bolt: '<path d="M13.2 2 4 13.4h6.2L10.8 22 20 10.6h-6.2z"/>',
  trendUp: '<path d="M3 17.5 9.5 11l4 4L21 7.5"/><path d="M15.5 7.5H21v5.5"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3.2 9.5h17.6M3.2 14.5h17.6"/><path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2"/>',
  phone:
    '<path d="M6.3 3h3l1.5 4-2 1.4a12 12 0 0 0 5.4 5.4l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.3 5.2 2 2 0 0 1 6.3 3Z"/>',
  mail: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  mapPin: '<path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10.5" r="2.7"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  arrowRight: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  arrowDown: '<path d="M12 4v15"/><path d="m6 13 6 6 6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  sun:
    '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/>',
  moon: '<path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z"/>',
  whatsapp:
    '<path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.2 21.8l5-1.4A9.7 9.7 0 1 0 12 2.2Zm5.5 13.6c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a13.5 13.5 0 0 1-6.6-5.8c-.5-.8-.8-1.7-.8-2.5 0-.9.5-1.4.8-1.7.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.9 3.4c.3.1.5.1.6-.1l.8-1c.2-.2.3-.2.6-.1l1.8.9c.3.1.5.2.5.4z"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M14.5 8.5h2.8V5h-2.8a4.3 4.3 0 0 0-4.3 4.3v2H8v3.5h2.2V22h3.5v-7.2h2.6l.6-3.5h-3.2V9.6c0-.6.4-1.1 1.3-1.1Z"/>',
  linkedin:
    '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10.5V17M7.5 7.4v.1M11.5 17v-3.6a2.1 2.1 0 0 1 4.2 0V17"/>',
  tiktok:
    '<path d="M15 3.2c.4 2.4 1.8 3.9 4.2 4.1v2.9a6.9 6.9 0 0 1-4-1.3v5.9a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3a2.7 2.7 0 1 0 1.9 2.6V3.2z"/>',
  quote: '<path d="M9.5 6.5C6.4 7.6 4.5 10 4.5 13v4.5h6V11H7.8c.2-1.4 1-2.3 2.5-2.9zM19.5 6.5C16.4 7.6 14.5 10 14.5 13v4.5h6V11h-2.7c.2-1.4 1-2.3 2.5-2.9z"/>',
  package: '<path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="m4 7 8 4 8-4"/><path d="M12 11v10"/><path d="m8 5 8 4"/>',
  handshake: '<path d="m11 8-2.5 2.5a2 2 0 0 0 2.8 2.8L13 12l2.5 2.5a1.8 1.8 0 0 0 2.5-2.5L14 8H9.5L7 10"/><path d="M3 8h3M18 8h3M3 14h3M18 14h3"/>'
};

/* Bungkus jalur ikon menjadi elemen <svg> yang siap pakai */
window.ICON = function (name, className) {
  var path = window.ICONS[name];
  if (!path) return '';
  return (
    '<svg class="' +
    (className || '') +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    path +
    '</svg>'
  );
};
