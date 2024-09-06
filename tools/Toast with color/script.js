const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay');
const hexInput = document.getElementById('hexInput');
const toastTextInput = document.getElementById('toastTextInput');
const createToastBtn = document.getElementById('createToastBtn');
const previewBtn = document.getElementById('previewBtn');
const readonlyCode = document.getElementById('readonlyCode');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const copyNotification = document.getElementById('copyNotification');
const toastPreview = document.getElementById('toastPreview');
const errorSvg = document.getElementById('errorSvg');
const notificationText = document.getElementById('notificationText');

// Task queue and status
const taskQueue = [];
let isProcessing = false;

// Add tasks to the queue
function addTask(task) {
    taskQueue.push(task);
    if (!isProcessing) {
        processQueue();
    }
}

// Process tasks in the queue
function processQueue() {
    if (taskQueue.length === 0) {
        isProcessing = false;
        return;
    }

    isProcessing = true;
    const task = taskQueue.shift();
    task().then(() => processQueue());
}

// Update color display and hex input from the color picker
colorPicker.addEventListener('input', function() {
    addTask(() => {
        const selectedColor = colorPicker.value;
        colorDisplay.style.backgroundColor = selectedColor;
        hexInput.value = selectedColor.toUpperCase();
        readonlyCode.value = ''; // Clear the readonly textarea
        return Promise.resolve();
    });
});

// Update color picker and color display when the hex input is manually changed
hexInput.addEventListener('input', function() {
    addTask(() => {
        const customHex = hexInput.value;
        if (/^#([0-9A-F]{3}){1,2}$/i.test(customHex)) {
            colorDisplay.style.backgroundColor = customHex;
            colorPicker.value = customHex;
        }
        return Promise.resolve();
    });
});

// Clear readonly textarea when toast text input changes
toastTextInput.addEventListener('input', function() {
    addTask(() => {
        readonlyCode.value = ''; // Clear the readonly textarea
        return Promise.resolve();
    });
});

// Generate toast code and display it in the readonly textarea
createToastBtn.addEventListener('click', function() {
    addTask(() => {
        const toastText = toastTextInput.value.trim();
        if (toastText === '') {
            showErrorNotification('Cannot create an empty Toast!');
            return Promise.resolve();
        }
        
        const selectedColor = hexInput.value;
        const toastCode = `
const-string v0, "<b><font color=${selectedColor}>${toastText}</font></b>"
invoke-static {v0}, Landroid/text/Html;->fromHtml(Ljava/lang/String;)Landroid/text/Spanned;
move-result-object v0

const/4 v1, 0x1
invoke-static {p0, v0, v1}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;

move-result-object v2
invoke-virtual {v2}, Landroid/widget/Toast;->show()V
        `;
        readonlyCode.value = toastCode.trim();
        return Promise.resolve();
    });
});

// Show preview of the toast or error notification
previewBtn.addEventListener('click', function() {
    addTask(() => {
        if (!readonlyCode.value.trim()) {
            showErrorNotification('Our Toast cannot be empty!');
            return Promise.resolve();
        }

        const toastText = toastTextInput.value || 'Sample Toast';
        const selectedColor = hexInput.value;

        toastPreview.style.backgroundColor = '#333'; // Set a background for contrast
        toastPreview.style.color = selectedColor;
        toastPreview.textContent = toastText;
        toastPreview.style.display = 'block';
        toastPreview.classList.add('show');
        
        setTimeout(() => {
            toastPreview.classList.remove('show');
        }, 2000); // Display for 2 seconds

        return Promise.resolve();
    });
});

// Copy the code from readonly textarea to clipboard or show error notification
copyCodeBtn.addEventListener('click', function() {
    addTask(() => {
        if (!readonlyCode.value.trim()) {
            showErrorNotification('Our Toast cannot be empty!');
            return Promise.resolve();
        }

        readonlyCode.select();
        document.execCommand('copy');

        // Show the notification
        copyNotification.classList.add('show');
        setTimeout(() => {
            copyNotification.classList.remove('show');
        }, 2000); // Hide the notification after 2 seconds

        return Promise.resolve();
    });
});

// Function to show error notification with custom text
function showErrorNotification(message) {
    return new Promise((resolve) => {
        notificationText.textContent = message;
        errorSvg.style.display = 'block';
        errorSvg.classList.add('show');
        setTimeout(() => {
            errorSvg.classList.remove('show');
            errorSvg.style.display = 'none';
            resolve();
        }, 2000); // Display for 2 seconds
    });
}