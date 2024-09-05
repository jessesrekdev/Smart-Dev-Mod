let selectedOption = 'base64';

window.onload = function() {
    selectOption('base64');
};

function selectOption(option) {
    selectedOption = option;

    const toBase64Div = document.getElementById('toBase64');
    const toTextDiv = document.getElementById('toText');
    const convertButton = document.getElementById('convertButton');

    if (option === 'base64') {
        toBase64Div.classList.add('selected');
        toTextDiv.classList.remove('selected');
        toTextDiv.classList.add('unselected');
        toBase64Div.classList.remove('unselected');
        convertButton.textContent = 'Convert to Base64';
    } else {
        toTextDiv.classList.add('selected');
        toBase64Div.classList.remove('selected');
        toBase64Div.classList.add('unselected');
        toTextDiv.classList.remove('unselected');
        convertButton.textContent = 'Convert to Text';
    }
}

function convert() {
    const inputText = document.getElementById('inputText').value;
    let outputText = '';

    if (selectedOption === 'base64') {
        outputText = btoa(inputText);
    } else {
        try {
            outputText = atob(inputText);
        } catch (e) {
            outputText = 'Invalid Base64 string';
        }
    }

    document.getElementById('outputText').value = outputText;
}

function copyText() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');

    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const loadingProgress = document.getElementById('loadingProgress');
    const successSvg = document.getElementById('successSvg');

    notification.classList.add('show');

    setTimeout(() => {
        loadingProgress.style.display = 'none';
        successSvg.style.display = 'flex';  // Show the success SVG
        notificationText.innerHTML = 'Copied Successfully';

        setTimeout(() => {
            notification.classList.remove('show');
            loadingProgress.style.display = 'flex';
            successSvg.style.display = 'none';  // Hide the success SVG
            notificationText.innerHTML = 'Copying Encoded Text';
        }, 1500);
    }, 1500);

    // Add vibration on click (if supported by the device)
    if (navigator.vibrate) {
        navigator.vibrate(20); // Vibrate for 200 milliseconds
    }
}

// Assuming the fab element has an ID of "fabButton"
const fabButton = document.getElementById('fabButton');

if (fabButton) {
    fabButton.addEventListener('click', copyText);
}
