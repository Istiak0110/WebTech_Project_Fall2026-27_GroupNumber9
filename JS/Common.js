// Shared form helpers. Each validate function returns true or false.
// Forms stay disabled in HTML until their JavaScript validation is ready.
function enableFormFields()
{
    let fieldsets = document.querySelectorAll("fieldset");
    for (let i = 0; i < fieldsets.length; i++)
    {
        fieldsets[i].disabled = false;
    }
}

function showError(errorId, message)
{
    document.getElementById(errorId).textContent = message;
    let input = document.getElementById(errorId.replace(/Error$/, ""));
    if (input)
    {
        input.setAttribute("aria-invalid", "true");
    }
}

function clearError(errorId)
{
    document.getElementById(errorId).textContent = "";
    let input = document.getElementById(errorId.replace(/Error$/, ""));
    if (input)
    {
        input.removeAttribute("aria-invalid");
    }
}

function showResult(isValid, message)
{
    let result = document.getElementById("ResultText");
    result.className = "form-result failed";
    result.textContent = "Please correct the marked fields and try again.";
    if (isValid)
    {
        result.className = "form-result success";
        result.textContent = message;
    }
}

function clearFormResult()
{
    let result = document.getElementById("ResultText");
    if (result)
    {
        result.textContent = "";
        result.className = "form-result";
    }
    let continueLink = document.getElementById("ContinueLogin");
    if (continueLink)
    {
        continueLink.hidden = true;
    }
}

function clearAllErrors()
{
    let errors = document.querySelectorAll(".error");
    for (let i = 0; i < errors.length; i++)
    {
        clearError(errors[i].id);
    }
    clearFormResult();
}

function focusFirstError()
{
    let input = document.querySelector('[aria-invalid="true"]');
    if (input)
    {
        input.focus();
    }
}

// Changing a field removes an old success message, but keeps useful field errors.
function prepareFormFeedback()
{
    let form = document.querySelector("form");
    if (form)
    {
        form.addEventListener("input", clearFormResult);
        form.addEventListener("change", clearFormResult);
    }
}

function validateRequired(inputId, errorId, label)
{
    let value = document.getElementById(inputId).value.trim();
    if (value === "")
    {
        showError(errorId, "Please enter " + label + ".");
        return false;
    }
    clearError(errorId);
    return true;
}

function validateName(inputId, errorId)
{
    let value = document.getElementById(inputId).value.trim();
    if (value.length < 3 || value.length > 60)
    {
        showError(errorId, "Enter a name between 3 and 60 characters.");
        return false;
    }
    if (!/^[A-Za-z .'-]+$/.test(value) || !/[A-Za-z]/.test(value))
    {
        showError(errorId, "Use English letters, spaces, dots, apostrophes or hyphens.");
        return false;
    }
    clearError(errorId);
    return true;
}

function validateEmail(inputId, errorId)
{
    let value = document.getElementById(inputId).value.trim();
    let expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length > 254 || !expression.test(value))
    {
        showError(errorId, "Enter a valid email, such as name@example.com.");
        return false;
    }
    clearError(errorId);
    return true;
}

function validatePattern(inputId, errorId, expression, message)
{
    let value = document.getElementById(inputId).value.trim();
    if (!expression.test(value))
    {
        showError(errorId, message);
        return false;
    }
    clearError(errorId);
    return true;
}

function validateSelect(inputId, errorId, choices, label)
{
    let value = document.getElementById(inputId).value;
    for (let i = 0; i < choices.length; i++)
    {
        if (value === choices[i])
        {
            clearError(errorId);
            return true;
        }
    }
    showError(errorId, "Please select " + label + " from the list.");
    return false;
}

function validatePhone(inputId, errorId)
{
    let value = document.getElementById(inputId).value.trim();
    if (value !== "" && !/^01[3-9][0-9]{8}$/.test(value))
    {
        showError(errorId, "Use 11 digits starting with 013–019, or leave this optional field blank.");
        return false;
    }
    clearError(errorId);
    return true;
}

function validatePassword(inputId, errorId)
{
    // Passwords are not trimmed: a space is part of the entered password.
    let value = document.getElementById(inputId).value;
    if (value.length < 8)
    {
        showError(errorId, "Use at least 8 characters.");
        return false;
    }
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value))
    {
        showError(errorId, "Include an uppercase letter, a lowercase letter and a number.");
        return false;
    }
    clearError(errorId);
    return true;
}

function validateConfirmPassword(passwordId, confirmId, errorId)
{
    let password = document.getElementById(passwordId).value;
    let confirm = document.getElementById(confirmId).value;
    if (confirm === "" || confirm !== password)
    {
        showError(errorId, "Enter the same password again.");
        return false;
    }
    clearError(errorId);
    return true;
}

function togglePassword(inputId, checkbox)
{
    let input = document.getElementById(inputId);
    input.type = "password";
    if (checkbox.checked)
    {
        input.type = "text";
    }
}
