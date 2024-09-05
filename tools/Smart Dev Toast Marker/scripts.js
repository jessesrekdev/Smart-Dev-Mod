// Handle 'Create Dialog' button click
function createDialog() {
    const inputText = document.getElementById("inputText").value.trim();
  
    const outputText = document.getElementById('outputText');

    if (inputText === "") {
        showNotification("error");
        return;
    }

    let dialogCode;
    if (selectedOption === 'base64') {
        const base64Text = btoa(inputText); // Convert to Base 64
        dialogCode = `
const/4 v0, 0x1

const-string v1, "${base64Text}"

invoke-static {p0, v1, v0}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;

move-result-object v0

invoke-virtual {v0}, Landroid/widget/Toast;->show()V
        `;
    } else {
        dialogCode = `
const/4 v0, 0x1

const-string v1, "${inputText}"

invoke-static {p0, v1, v0}, Landroid/widget/Toast;->makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;

move-result-object v0

invoke-virtual {v0}, Landroid/widget/Toast;->show()V
        `;
    }

    document.getElementById('outputText').value = dialogCode.trim();
}

// Clear the readonly textarea when input changes
function clearOutput() {
    document.getElementById('outputText').value = '';
}

// Show a notification with the specified type
function showNotification(type) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const loadingProgress = document.getElementById('loadingProgress');
    const successSvg = document.getElementById('successSvg');
    const errorSvg = document.getElementById('errorSvg');

    if (type === "error") {
        notificationText.textContent = "Our Toast cannot be empty!";
        errorSvg.style.display = "block";
        successSvg.style.display = "none";
        loadingProgress.style.display = "none";
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000);
    } else if (type === "success") {
        notificationText.textContent = "Copied Successfully";
        successSvg.style.display = "block";
        errorSvg.style.display = "none";
        loadingProgress.style.display = "none";
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000);
    }
}

// Handle the floating action button (FAB) click
function handleFabClick() {
    const outputText = document.getElementById('outputText').value.trim();

    if (outputText === "") {
        showNotification("error");
        return;
    }

    // Show the loading progress
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const loadingProgress = document.getElementById('loadingProgress');
    const successSvg = document.getElementById('successSvg');
    const errorSvg = document.getElementById('errorSvg');

    notificationText.textContent = "Copying code";
    loadingProgress.style.display = "block";
    successSvg.style.display = "none";
    errorSvg.style.display = "none";
    notification.classList.add("show");

    // Simulate the loading process
    setTimeout(() => {
        // Copy the text to the clipboard
        navigator.clipboard.writeText(outputText).then(() => {
            // Show the success message
            loadingProgress.style.display = "none";
            successSvg.style.display = "block";
            notificationText.textContent = "Copied Successfully";

            // Hide the notification after 2 seconds
            setTimeout(() => {
                notification.classList.remove("show");
            }, 2000);
        });
    }, 1500);
}

// Handle the create toast preview click
function createToastPreview() {
    const outputText = document.getElementById('outputText').value.trim();

    if (outputText === "") {
        showNotification("error");
        return;
    }

    // Show the toast preview
    const previewToast = document.getElementById('previewToast');
    const toastText = document.querySelector('.toast-text');
    let txt = document.getElementById("inputText").value;


    toastText.textContent = txt;
    previewToast.classList.add("show");

    // Hide the toast preview after 2 seconds
    setTimeout(() => {
        previewToast.classList.remove("show");
    }, 2000);
}

// Toggle between Simple Text and Base 64
let selectedOption = 'simpleText';

document.getElementById('simpleTextToggle').addEventListener('click', () => {
    selectOption('simpleText');
});

document.getElementById('base64Toggle').addEventListener('click', () => {
    selectOption('base64');
});

function selectOption(option) {
    selectedOption = option;
    document.getElementById('simpleTextToggle').classList.remove('selected');
    document.getElementById('base64Toggle').classList.remove('selected');

    if (option === 'simpleText') {
        document.getElementById('simpleTextToggle').classList.add('selected');
    } else {
        document.getElementById('base64Toggle').classList.add('selected');
    }
}

// Clear output when input text changes
document.getElementById('inputText').addEventListener('input', clearOutput);

// Handle FAB click
document.querySelector('.fab').addEventListener('click', handleFabClick);

// Handle create toast preview click
document.querySelector('.preview-fab').addEventListener('click', createToastPreview);

// Add vibration on button click
document.querySelector('.dialog-maker').addEventListener('click', () => {
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
});

// Update the visibility of the preview FAB based on outputText
function updatePreviewIcon() {
    const outputText = document.getElementById('outputText').value.trim();
    const previewFab = document.querySelector('.preview-fab');

    if (outputText === "") {
        previewFab.style.display = "block";
    } else {
        previewFab.style.display = "flex";
    }
}

// Initialize preview icon state
updatePreviewIcon();

// Handle FAB click for previewing the code (toast)
function handlePreviewClick() {
    const outputText = document.getElementById('outputText').value.trim();

    if (outputText !== "") {
        const previewToast = document.getElementById('previewToast');
        previewToast.querySelector('.toast-text').textContent = "Previewing Code";
        previewToast.classList.add("show");

        setTimeout(() => {
            previewToast.classList.remove("show");
        }, 2000);
    }
}
