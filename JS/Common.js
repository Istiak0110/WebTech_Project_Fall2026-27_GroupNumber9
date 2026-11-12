// Each validation function returns true or false, like the HMS sample.
function showError(inputId, message)
{
    document.getElementById(inputId + "Error").textContent = message;
    document.getElementById(inputId).setAttribute("aria-invalid", "true");
}

function clearError(inputId)
{
    document.getElementById(inputId + "Error").textContent = "";
    document.getElementById(inputId).removeAttribute("aria-invalid");
}

function showResult(resultId, valid, message)
{
    let result = document.getElementById(resultId);
    result.textContent = message;
    result.className = "message failed";
    if (valid)
    {
        result.className = "message success";
    }
}

function clearResult(resultId)
{
    document.getElementById(resultId).textContent = "";
    document.getElementById(resultId).className = "message";
}

function clearFormErrors(formId, resultId)
{
    let form = document.getElementById(formId);
    let errors = form.querySelectorAll(".error");
    let inputs = form.querySelectorAll("input, select");
    for (let i = 0; i < errors.length; i++)
    {
        errors[i].textContent = "";
    }
    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].removeAttribute("aria-invalid");
    }
    clearResult(resultId);
}

function focusFirstError(formId)
{
    let input = document.getElementById(formId).querySelector('[aria-invalid="true"]');
    if (input)
    {
        input.focus();
    }
}

function validateRequired(inputId, label)
{
    if (document.getElementById(inputId).value.trim() === "")
    {
        showError(inputId, "Please enter " + label + ".");
        return false;
    }
    clearError(inputId);
    return true;
}

function validateName(inputId)
{
    let value = document.getElementById(inputId).value.trim();
    if (value.length < 3 || value.length > 60 ||
        !/^[A-Za-z .'-]+$/.test(value) || !/[A-Za-z]/.test(value))
    {
        showError(inputId, "Use 3 to 60 English letters, spaces, dots, apostrophes or hyphens.");
        return false;
    }
    clearError(inputId);
    return true;
}

function validateEmail(inputId)
{
    let email = document.getElementById(inputId).value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    {
        showError(inputId, "Enter a valid email address, such as name@example.com.");
        return false;
    }
    clearError(inputId);
    return true;
}

function validateSelect(inputId, options, label)
{
    let value = document.getElementById(inputId).value;
    for (let i = 0; i < options.length; i++)
    {
        if (value === options[i])
        {
            clearError(inputId);
            return true;
        }
    }
    showError(inputId, "Please select " + label + " from the list.");
    return false;
}

function validatePhone(inputId)
{
    let phone = document.getElementById(inputId).value.trim();
    if (phone !== "" && !/^01[3-9][0-9]{8}$/.test(phone))
    {
        showError(inputId, "Enter an 11-digit mobile number starting with 013 to 019.");
        return false;
    }
    clearError(inputId);
    return true;
}

function validatePassword(inputId)
{
    let password = document.getElementById(inputId).value;
    if (password.length < 8 || !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) || !/[0-9]/.test(password))
    {
        showError(inputId, "Use at least 8 characters with an uppercase letter, a lowercase letter and a number.");
        return false;
    }
    clearError(inputId);
    return true;
}

function validateConfirmPassword(passwordId, confirmId)
{
    let password = document.getElementById(passwordId).value;
    let confirm = document.getElementById(confirmId).value;
    if (confirm === "" || confirm !== password)
    {
        showError(confirmId, "The passwords must match.");
        return false;
    }
    clearError(confirmId);
    return true;
}

function togglePassword(inputId, checkbox)
{
    document.getElementById(inputId).type = "password";
    if (checkbox.checked)
    {
        document.getElementById(inputId).type = "text";
    }
}
