// Ланцюжок відповідальності (Chain of Responsibility) — це паттерн програмування, який дозволяє передавати запити послідовно через ланцюжок обробників, кожен з яких може обробити або передати запит далі.

//AuthProcessor клас для обробки аутентифікації.
class AuthProcessor {
  // setNextProcessor Метод, який приймає наступний обробник (processor) в ланцюгу.

  setNextProcessor(processor) {
    this.processor = processor;
    return this.processor;
  }
  // Зберігає наступ setNextProcessorний обробник в поточному об'єкті.
  // Повертає переданий обробник, щоб дозволити подальше ланцюжкове викликання.
  //validate Метод для перевірки аутентифікації. Приймає ім'я користувача (username) і пароль (passkey).

  validate(username, passkey) {
    if (this.processor) return this.processor.validate(username, passkey);
    else false;
  }
  // Перевіряє, чи є наступний обробник в ланцюгу.
  // Якщо так, передає запит на перевірку аутентифікації наступному обробнику,this.nextProcessor.validate(username, passkey), та повертаємо результат.
  // Якщо наступного обробника немає, повертає false, сигналізуючи про невдалу аутентифікацію.
}

// TwoStepProcessor Клас обробника, який перевіряє двофакторний код. Наслідує базовий клас AuthProcessor.
class TwoStepProcessor extends AuthProcessor {
  // Метод для перевірки аутентифікації validate. Перевіряє ім'я користувача (username), пароль (passkey) і викликаємо метод isValidTwoStepCode().
  validate(username, passkey) {
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log("Вхід дозволено з двофакторною аутентифікацією");
      return true;
    } else {
      super.validate(username, passkey);
    }
    // Якщо username дорівнює "john", passkey дорівнює "password" та метод isValidTwoStepCode() повертає true, аутентифікація успішна.
    // Виводить повідомлення про успішну аутентифікацію: Вхід дозволено з двофакторною аутентифікацією, і повертає true.
    // Якщо дані не вірні, запит на аутентифікацію передається наступному обробнику в ланцюгу, super.validate(username, passkey).
  }

  isValidTwoStepCode() {
    return true;
  }

  // isValidTwoStepCode Метод для перевірки двофакторного коду,який повертає true.
}

// RoleProcessor Клас обробника, який перевіряє ролі користувача. Наслідує базовий клас AuthProcessor.
class RoleProcessor extends AuthProcessor {
  validate(role, passkey) {
    if (role === "guest") {
      console.log(" Вхід дозволено з роллю гостя");
      return true;
    }
    super.validate(role, passkey);
  }
}

// CredentialsProcessor Клас обробника, який перевіряє облікові дані користувача. Наслідує базовий клас AuthProcessor.
class CredentialsProcessor extends AuthProcessor {
  validate(username, password) {
    if (username == "admin" && password === "admin123") {
      console.log("Вхід дозволено за обліковими даними");
      return true;
    } else super.validate(username, password);
  }
  // Якщо облікові дані вірні, username=admin, та passkey=admin123, аутентифікація успішна.
  // Виводить повідомлення про успішну аутентифікацію Вхід дозволено за обліковими даними, і повертає true.
  // Якщо облікові дані не вірні, запит на аутентифікацію передається наступному обробнику в ланцюгу.
}

// Клас Builder для створення об'єкта ланцюга обробників.
class ProcessorBuilder {
  constructor() {
    this.firstProcessor = null;
    this.lastProcessor = null;
  }

  add(processor) {
    if (!this.firstProcessor) {
      this.firstProcessor = processor;
      this.lastProcessor = processor;
    } else {
      this.lastProcessor.setNextProcessor(processor);
      this.lastProcessor = processor;
    }
    return this;
  }
  create() {
    return this.firstProcessor;
  }
  // Метод create для створення ланцюга обробників.
  // Повертає перший обробник у ланцюгу.
}
console.log("Завдання 6 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено
