// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minweight = document.querySelector('.minweight__input'); // 
const maxweight = document.querySelector('.maxweight__input'); // 


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

let color;
let li;
let div;
let tmpEl;
let randNum;
let minweightVal;
let maxweightVal;
let kindInputVal;
let colorInputVal;
let weightInputVal;

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  li = fruitsList.innerHTML ="";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild

    switch(fruits[i].color) {
    case 'фиолетовый':
      color = 'violet';
      break;    
    case 'зеленый':
      color = 'green';
      break;
    case 'розово-красный':
      color = 'carmazin';
      break;
    case 'желтый':
      color = 'yellow';
      break;
    case 'светло-коричневый':
      color = 'lightbrown';
      break;   

    }

    li = fruitsList.appendChild(document.createElement("li"));
    li.className = "fruit__item fruit_"+color;
    
    li.insertAdjacentHTML("beforeend", `
    <div class="fruit__info">
        <div>index: ${i}</div>
        <div>kind: ${fruits[i].kind}</div>
        <div>color: ${fruits[i].color}</div>
        <div>weight (кг): ${fruits[i].weight}</div>
    </div>
`);


  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)

    randNum = getRandomInt(0, fruits.length-1);

    tmpEl = fruits[randNum];
    result.push(tmpEl);
    fruits.splice(randNum, 1);

  }

  fruits === result ? alert('Повторите. Порядок элементов не изменился') : fruits = result;
  
  return true;

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits() ? display() : alert('Что-то не так с перемешиванием!');

});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {

  minweightVal = parseInt(minweight.value);
  maxweightVal = parseInt(maxweight.value);

  console.log("minweightVal: "+minweightVal);

  if(minweightVal=="" || minweightVal === undefined || isNaN(minweightVal)) {
    console.log("min weight 1: "+minweightVal);

    fruits.sort((a, b) => a.weight > b.weight ? 1 : -1);
    minweightVal = fruits[0].weight;
    console.log("min: 0 "+minweightVal);
    minweight.value = minweightVal;
  }

  if(maxweightVal=="" || maxweightVal === undefined || isNaN(maxweightVal)) {
    console.log("max weight 1: "+maxweightVal);
    fruits.sort((a, b) => a.weight > b.weight ? 1 : -1);
    maxweightVal = parseInt(fruits[fruits.length-1].weight);
    console.log("min: 0 "+maxweightVal);
    maxweight.value = maxweightVal;     

  }
  


  console.log("min weight: "+minweightVal);
  console.log("max weight: "+maxweightVal);  
  minweightVal > maxweightVal ? maxweightVal = [minweightVal, minweightVal = maxweightVal][0] : minweightVal;
  console.log("min weight: "+minweightVal);
  console.log("max weight: "+maxweightVal);
  fruits = JSON.parse(fruitsJSON);
  let filteredFruits = fruits.filter((item) => {
    // TODO: допишите функцию
    // return number >= minweight && number <= maxweight;
    item.weight = parseInt(item.weight);

    console.log("item weight: "+item.weight+" int? : "+Number.isInteger(item.weight));
    console.log(item.weight >= minweightVal && item.weight <= maxweightVal);

    return item.weight >= minweightVal && item.weight <= maxweightVal;
  });
  fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {

  filterFruits();
  display();
  //console.log("fruit len: "+fruits.length);

});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  //console.log("a: "+a);
  //console.log("a comp color: "+a.color);

  if(sortKind = 'bubbleSort') {
    return a.color > b.color ? true : false; // фиолетовый

  } else {
    return a.kind > b.kind ? true : false; // фиолетовый
  }
 
  
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    
   const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }          


//    
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    console.log("start qs");

    function swap(arr, leftIndex, rightIndex){
        var temp = arr[leftIndex];
        console.log("left ind: "+arr[leftIndex]);
        console.log("right ind: "+arr[rightIndex]);
        arr[leftIndex] = arr[rightIndex];
        arr[rightIndex] = temp;
    }

function partition(arr, left, right) {
    var pivot   = arr[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
        console.log("pivot: "+pivot);
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(arr, left, right) {
    var index;
    if (arr.length > 1) {
        index = partition(arr, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(arr, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(arr, index, right);
        }
    }
    return arr;
}    

// first call to quick sort
var sortedArray = quickSort(arr, 0, arr.length - 1);
console.log(sortedArray); 

//
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind === 'bubbleSort' ? sortKind = 'quickSort' : sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'сортировка...';
  const sort = sortAPI[sortKind];
  console.log("сорт: "+sortKind);
  
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  kindInputVal = kindInput.value;
  colorInputVal = colorInput.value;
  weightInputVal = weightInput.value;
  console.log("kind inp: "+kindInput.value);
  if (kindInput.value === '' || colorInput.value ===''|| weightInput.value === '') {
    alert('Все поля должны быть заполнены')

  } else {
  let newFrukt = {kind: kindInput.value, color: colorInput.value, weight: weightInput.value};
  fruits.push(newFrukt);    
  }


  display();
});
