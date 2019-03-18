// validateForm(fields) {
//   // Имя - до 60 символов, проверка по маске /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/
//   // Фамилия - до 60 символов, проверка по маске /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/
//   // Отчество - до 60 символов, проверка по маске /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/
//   // Адрес электронной почты: ограничение в 255 символов, проверка по маске /^[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.   [А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?\.)+[a-zA-Z0-9А-яёЁ]   (?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?$/
//   // Дата рождения:
//   // Соответствие формату "ДД.ММ.ГГГГ",
//   // ДД - числа месяца, может принимать значения 1-31
//   // ММ - номер месяца, может принимать значения 1-12
//   // ГГГГ - год, может приниматься значения с 1998 до текущего года
//   // Так же проверяется возможность существования указанной даты, например, дата 31.02.2018 будет признана некорректной     (в феврале нет 31-го дня)

//   const errors = {};

//   if (!fields.name && this.isValidName(fields.name)) errors.name = "Имя - до 60 символов";
//   if (!fields.soname && this.isValidSoname(fields.soname)) errors.soname = "Фамилия - до 60 символов";
//   if (!fields.phname && this.isValidPhname(fields.phname)) errors.phname = "Отчество - до 60 символов";
//   if (!fields.birthday && this.isValidBirthday(fields.birthday)) errors.birthday = "Введите пароль";
//   if (!fields.email && this.isValidEmail(fields.email)) errors.email = "Адрес электронной почты: ограничение в 255 символов";


//   return errors;
// }

// isValidName(name) {
//   const regExpName = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
//   return regExpName.test(name);
// }

// isValidSoname(soname) {
//   const regExpSoname = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
//   return regExpSoname.test(soname);
// }

// isValidPhname(phname) {
//   const regExpPhname = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/;
//   return regExpPhname.test(phname);
// }

// isValidEmail(email) {
//   const regExpEmail = /^[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?\.)+[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?$/;
//   return regExpEmail.test(email);
// }

// isValidBirthday(date) {
//   const regExpBirthday = /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/;
//   return regExpBirthday.test(date);
// }