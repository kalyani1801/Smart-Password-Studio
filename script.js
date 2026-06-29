const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const slider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const historyList = document.getElementById("historyList");

passwordField.placeholder = "Choose your settings and click Generate Password";
strengthText.textContent = "Not Generated";
strengthFill.style.width = "0%";

slider.addEventListener("input", () => {
    lengthValue.textContent = slider.value;
});

function updateStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    if(score <= 2){
        strengthText.textContent = "Weak";
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";
    }
    else if(score <= 4){
        strengthText.textContent = "Medium";
        strengthFill.style.width = "65%";
        strengthFill.style.background = "#f59e0b";
    }
    else{
        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
    }
}

function addHistory(password){

    const item = document.createElement("div");

    item.classList.add("history-item");

    item.textContent = password;

    historyList.prepend(item);

    if(historyList.children.length > 5){
        historyList.removeChild(historyList.lastChild);
    }
}

function generatePassword(){

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}<>?/";

    let chars = "";

    if(document.getElementById("uppercase").checked) chars += upper;
    if(document.getElementById("lowercase").checked) chars += lower;
    if(document.getElementById("numbers").checked) chars += numbers;
    if(document.getElementById("symbols").checked) chars += symbols;

    if(chars.length === 0){
        alert("Select at least one option");
        return;
    }

    let password = "";

    for(let i = 0; i < slider.value; i++){

        const randomIndex = Math.floor(Math.random() * chars.length);

        password += chars[randomIndex];
    }

    passwordField.value = password;

    updateStrength(password);

    addHistory(password);
}

copyBtn.addEventListener("click", () => {

    if(passwordField.value === ""){
        alert("Generate a password first.");
        return;
    }

    navigator.clipboard.writeText(passwordField.value);

    copyBtn.textContent = "Copied";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);
});

generateBtn.addEventListener("click", generatePassword);