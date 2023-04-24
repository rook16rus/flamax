import 'parsleyjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import $ from "jquery";

dayjs.extend(customParseFormat);

window.Parsley.addValidator('requiredIfChecked', {
    requirementType: 'string',
    validateString: function (value, requirement) {

        const checkbox = document.querySelector(requirement);

        if (!checkbox) {
            return false;
        }

        if (checkbox.checked && !value.trim()) {
            return false;
        }

        return true;
    },
    messages: {
        en: 'Required field',
        ru: 'Обязательное поле',
    },
    priority: 33,
});

window.Parsley.addValidator('phone', {
    requirementType: 'string',
    validateString: function (value) {
        if (value.trim() === '') return true;
        return /^((\+|8)+([0-9]){0,15})/.test(value);
    },
    messages: {
        en: 'Number must start with + or 8',
        ru: 'Номер должен начинаться с + или 8',
    },
    priority: 50
});

window.Parsley.addValidator('date', {
    requirementType: 'string',
    validateString: function (value) {
        if (value.trim() === '') return true;
        return dayjs(value, 'DD.MM.YYYY', true).isValid();
    },
    messages: {
        en: 'Enter correct date',
        ru: 'Введите правильно дату',
    },
});


window.Parsley.addValidator('lenght', {
  requirementType: 'string',
  validateString: (value, maxLength) => {
    if(maxLength < value.length) return false;
  },
  messages: {
    en: 'Field accepts less than 1000 characters',
    ru: 'Поле принимает менее 1000 символов'
  },
});

window.Parsley.addValidator('maxFileSize', {
  validateString: function(_value, maxSize, parsleyInstance) {
    let files = parsleyInstance.$element[0].files;

    return files.length != 1  || files[0].size <= maxSize * 1024 * 1024;
  },
  requirementType: 'integer',
  messages: {
    en: 'The file size should not exceed %s MB',
    ru: 'Размер файла не должен превышать %s МБ',
  }
});

Parsley.addMessages('ru', {
    defaultMessage: 'Некорректное значение.',
    type: {
        email: 'Некорректный адрес',
        url: 'Адрес сайта введен неверно',
        number: 'Допустимо использовать только цифры',
        integer: 'Введите целое число',
        digits: 'Введите только цифры',
        alphanum: 'Введите буквенно-цифровое значение',
    },
    notblank: 'Это поле должно быть заполнено',
    required: 'Обязательное поле',
    pattern: 'Это значение некорректно',
    min: 'Это значение должно быть не менее чем %s',
    max: 'Это значение должно быть не более чем %s',
    range: 'Это значение должно быть от %s до %s',
    minlength: 'Это значение должно содержать не менее %s символов.',
    maxlength: 'Это значение должно содержать не более %s символов.',
    length: 'Это значение должно содержать от %s до %s символов',
    mincheck: 'Выберите не менее %s значений',
    maxcheck: 'Выберите не более %s значений',
    check: 'Выберите от %s до %s значений',
    equalto: 'Это значение должно совпадать',
});

Parsley.setLocale('ru');

export default function validation() {
    const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));

    formsToValidate.forEach((form) => {
        const selects = form.querySelectorAll('select');

        selects.forEach(select => {
          select.addEventListener('change', () => {
            $(select).parsley().validate()
          });
        })

        $(form).parsley({
          errorsContainer: function(field) {
            return field.$element.closest('.input-wrapper');
          },
          focus: 'none',
          errorClass: 'is-error',
          successClass: 'success',
          classHandler: (field) => {
            return field.$element.closest('.js-validation-wrapper');
          },
          trigger: 'change'
        });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const url = form.getAttribute("action");

        if ($(form).parsley().isValid()) {
          axios.post(url, formData)
            .then((response) => {
              window.project_API.modal.close();
              window.project_API.modal.onOpen("success");

              $(form).trigger("reset");
            })
            .catch((error) => {
              console.log(error.message);
              window.project_API.modal.close();
              window.project_API.modal.onOpen("error");
            });
        }
      });
    });
}
