// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.
class Writer {
  #content = "";

  // Сетер для властивості content. Він приймає значення newContent (новий текст),

  set content(text) {
    this.#content = text;

    this.#store(this.#content);
  }

  get content() {
    return this.#content;
  }

  #store(text) {
    Version.create(text);
  }

  restore() {
    const newText = Version.restore();
    this.#content = newText;
  }
  // Він викликає статичний метод класу Version, create, передаючи йому поточний текст як аргумент.
  // Метод restore відновлює попередній стан тексту, викликаючи статичний метод класу Version, restore.
  // Цей метод повертає останню збережену версію тексту, яку ми встановлюємо як поточний текст.
}

// Клас Version відповідає за створення та зберігання версій тексту.
class Version {
  static #versions = [];

  static create(content) {
    this.#versions.push(content);
  }

  static restore() {
    this.#versions.pop();
    return this.#versions[this.#versions.length - 1];
  }

  // та повертає останню збережену версію тексту з масиву версій this.#versions[this.#versions.length - 1] .
}
console.log("Завдання 5 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
