// register-form
let registerForm = document.querySelector('.register-form');

if (registerForm.classList.contains('register')) {
  registerForm.classList.add('active');
}

document.querySelector('#register').onclick = () => {
  registerForm.classList.toggle('active');
};

document.querySelector('#close-register-btn').onclick = () => {
  registerForm.classList.remove('active');
};

// Validation register-form
function Validator(options) {
  var selectorRules = {};

  // Hàm thực hiện validate
  function validate(inputElement, rule, errorElement) {
    var errorMessage;
    var rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add('invalid');
    } else {
      errorElement.innerText = '';
      inputElement.parentElement.classList.remove('invalid');
    }

    return !errorMessage;
  }

  // lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var isValid = validate(inputElement, rule, errorElement);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]');

          var formValues = Array.from(enableInputs).reduce(function (values, input) {
            values[input.name] = input.value;
            return values;
          }, {});

          options.onSubmit(formValues);
        } else {
          formElement.submit();
        }
      }
    };

    options.rules.forEach(function (rule) {
      // Lưu lại các rules cho mỗi input

      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

      if (inputElement) {
        // Xử lý trường hợp blur ngoài thẻ input
        inputElement.onblur = function () {
          validate(inputElement, rule, errorElement);
        };

        // Xử lý mỗi khi người dùng nhập
        inputElement.oninput = function () {
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid');
        };
      }
    });
  }
}

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || 'Vui lòng nhập trường này!';
    },
  };
};

Validator.isPassword = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || 'Vui lòng nhập trường này!';
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || 'Vui lòng nhập trường này!';
    },
  };
};

Validator({
  form: '#register-form',
  errorSelector: '.form-message',
  rules: [
    Validator.isRequired('#name', 'Vui lòng nhập Username!'),
    Validator.isRequired('#password', 'Vui lòng nhập Password!'),
    Validator.isRequired('#email'),
    Validator.isEmail('#email', 'Trường này phải là Email'),
  ],
});
