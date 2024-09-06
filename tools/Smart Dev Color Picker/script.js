const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay');
const hexValue = document.getElementById('hexValue');
const copyBtn = document.getElementById('copyBtn');
const copyNotification = document.getElementById('copyNotification');

colorPicker.addEventListener('input', function() {
    const selectedColor = colorPicker.value;
    colorDisplay.style.backgroundColor = selectedColor;
    hexValue.textContent = selectedColor;
});

copyBtn.addEventListener('click', function() {
    // Copy hex value to clipboard
    navigator.clipboard.writeText(hexValue.textContent)
        .then(() => {
            // Show the notification
            copyNotification.classList.add('show');
            setTimeout(() => {
                copyNotification.classList.remove('show');
            }, 2000); // Hide after 2 seconds
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});
