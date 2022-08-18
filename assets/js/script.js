/**
 * Key-Value of encryption rules
 **/
let rules = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };

/**
 * Key-Value of DOM Elements
 **/
let html = {
    footer_icon: document.getElementById("footer-icon"),
    footer_info: document.getElementById("footer-info"),
    not_found: document.getElementById("not-found"),
    txt_found: document.getElementById("txt-found"),
    response: document.getElementById("response"),
    encrypt: document.getElementById("encrypt"),
    decrypt: document.getElementById("decrypt"),
    output: document.getElementById("output"),
    input: document.getElementById("input"),
    copy: document.getElementById("copy"),
};

/**
 * Returns the text entered by the user encrypted
 * @param {string} input user typed text
 * @return {string} encrypted text
 **/
function encrypt(input) {
    let output = "";
    let letter = "";

    for (i in input) {
        letter = Object.keys(rules).filter((key) => (input[i] === key ? key : ""));
        letter == input[i] ? (output += rules[letter]) : (output += input[i]);
    }

    return output;
}

/**
 * Returns the text entered by the user decrypted
 * @param {string} input user typed text
 * @return {string} decrypted text
 **/
function decrypt(input) {
    let output = "";
    let letter = "";

    for (let i = 0; i < input.length; i++) {
        letter = Object.keys(rules).filter((key) => (input[i] === key ? key : ""));

        if (letter == input[i]) {
            output += letter;
            i += rules[letter].length - 1;
        } else output += input[i];
    }

    return output;
}

/**
 * Shows a hidden element in the UI
 * @param {string} id html element id
 * @return {none}
 **/
function show(id) {
    id.classList.remove("hide");
    id.classList.add("show");
}

/**
 * Hides the elements shown in the UI
 * @param {string} id html element id
 * @return {none}
 **/
function hide(id) {
    id.classList.remove("show");
    id.classList.add("hide");
}

/**
 * Controls the UI for encrypt
 * @return {none}
 **/
function encryption() {
    html.encrypt.addEventListener("click", () => {
        if (html.input.value.length > 0) {
            html.output.value = encrypt(html.input.value);
            show(html.txt_found);
            hide(html.not_found);
        } else {
            show(html.not_found);
            hide(html.txt_found);
        }
    });
}

/**
 * Controls the UI for decrypt
 * @return {none}
 **/
function decryption() {
    html.decrypt.addEventListener("click", () => {
        if (html.input.value.length > 0) {
            html.output.value = decrypt(html.input.value);
            show(html.txt_found);
            hide(html.not_found);
        } else {
            show(html.not_found);
            hide(html.txt_found);
        }
    });
}

/**
 * Copy data from clipboard and focus on input
 * @return {none}
 **/
function copyOutput() {
    html.copy.addEventListener("click", () => {
        navigator.clipboard.writeText(html.output.value).then(() => {
            html.input.focus(html.input.select());
            setTimeout(() => show(html.response), 300);
            setTimeout(() => hide(html.response), 3000);
        });
    });
}

/**
 * Initialize the set of functions to run the app
 * @return {none}
 **/
function appInit() {
    html.input.focus();
    encryption();
    decryption();
    copyOutput();
}
