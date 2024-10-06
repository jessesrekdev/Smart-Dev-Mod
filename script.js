// JavaScript
document.getElementById('base64-converter').addEventListener('click', function() {
  console.log('Base 64 Converter selected.');
  window.open('tools/Base 64 Converter/');
});

document.getElementById('color-picker').addEventListener('click', function() {
  window.open('tools/Smart Dev Color Picker/');
});

document.getElementById('toast-maker').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('smali-toast').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
  setTimeout(() => window.open('tools/Smart Dev Toast Marker/'), 10);
});

document.getElementById('smali-toast-color').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
  setTimeout(() => window.open('tools/Toast with color/'), 10);
});

window.addEventListener('click', function(event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').style.display = 'none';
  }
});
