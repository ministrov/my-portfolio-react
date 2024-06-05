
const obj = {
  a: {
    b: {
      c: 'd'
    },
    e: 'f'
  }
};

get(obj, 'a.b');   // { c : 'd' }
get(obj, 'a.b.c'); // 'd'
get(obj, 'a.e');   // 'f'
get(obj, 'x.x.e'); // undefined
get(obj, 'a.x.e', true); // true
get(obj, 'a.x.e', 'My default value'); // My default value

// Напишите функцию get, которая получает объект и путь к вложенному свойству объекта и возвращает значение этого свойства
//  (или undefined, если свойства не существует). Третий, опциональный аргумент функции — значение по умолчанию, которое
// возвращается, если значения по указанному пути не существует.

const getObjectValue = (obj, path, defaultValue = obj.a.b) => {

}

export default getObjectValue;