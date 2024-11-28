import { generateMatrixSVG } from '../components/matrix-generator';




export function calculateMatrix(event) {
    if (event) event.preventDefault();

    const dobElement = document.getElementById('year');
    if (!dobElement) {
        console.error('Элемент с id "year" не найден.');
        return;
    }

    const dob = dobElement.value;
        // Лог для отладки
    console.log("Дата рождения:", dob);
    if (!dob) {
        alert('Пожалуйста, введите дату рождения.');
        return;
    }

    const dateParts = dob.split('-');
    if (dateParts.length !== 3) {
        alert('Пожалуйста, выберите дату');
        return;
    }

    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const day = parseInt(dateParts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert('Неверный формат даты.');
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    const ageDisplay = document.getElementById('age-display');
    const ageText = document.getElementById('ageText');
    if (ageText) {
        ageText.innerText = `Возраст: ${age}`;
    }

    if (event && ageDisplay) {
        ageDisplay.style.display = 'block';
    } else if (ageDisplay) {
        ageDisplay.style.display = 'none';
    }

    const chakras = calculateChakras(day, month, year);
    if (chakras) {
        generateMatrixSVG(chakras); // Генерация SVG
    } else {
        console.error('Чакры не были вычислены.');
    }

    return chakras;
}



// Функция для применения правила редукции чисел
export function reduceNumber(num) {
    while (num > 22) {
        num = num
            .toString()
            .split('')
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return num;
}

export function calculateChakras (day, month, year) {
    const chakras = [];

    // Лог для отладки
    console.log("День:", day, "Месяц:", month, "Год:", year);

    // Сахасрара
    chakras.a = reduceNumber(day); // Зона ресурса
    chakras.b = month; // Главный талант
    chakras.c = reduceNumber(year.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0)); // Задача Души
      

    chakras.l = reduceNumber(chakras.a + chakras.b); // Родовая программа по мужскому роду

    // Манипура
    chakras.d = reduceNumber(chakras.a + chakras.b + chakras.c);
    chakras.e = reduceNumber(chakras.a + chakras.b + chakras.c + chakras.d);

        // Применение редукции к сумме чакр
        chakras.b_c = reduceNumber((chakras.b || 0) + (chakras.c || 0)); // Родовая программа по женскому роду
        chakras.a_d = reduceNumber((chakras.a || 0) + (chakras.d || 0)); // Родовая программа по женскому роду
        
    // Вишудха
    chakras.a1 = reduceNumber(chakras.a + chakras.e);

    // Аджна
    chakras.a2 = reduceNumber(chakras.a + chakras.a1);

    // Анахата
    chakras.a3 = reduceNumber(chakras.a1 + chakras.e);

    // Свадхистана
    chakras.c1 = reduceNumber(chakras.c + chakras.e);

    // Муладхара
    chakras.d1 = reduceNumber(chakras.d + chakras.e);

    // Энергия
    chakras.b1 = reduceNumber(chakras.b + chakras.e);
    chakras.b2 = reduceNumber(chakras.b + chakras.b1);
    chakras.b3 = reduceNumber(chakras.b1 + chakras.e);

    // Эмоции
    chakras.l1 = reduceNumber(chakras.a2 + chakras.b2);
    chakras.l2 = reduceNumber(chakras.a1 + chakras.b1);
    chakras.l3 = reduceNumber(chakras.a3 + chakras.b3);
    chakras.l4 = reduceNumber(chakras.e + chakras.e);
    
    chakras.x = reduceNumber(chakras.d1 + chakras.c1); // Точка баланса
    chakras.x1 = reduceNumber(chakras.d1 + chakras.x); // Подходящий партнер
    chakras.x2 = reduceNumber(chakras.c1 + chakras.x); // Энергия денежного канала
    
    chakras.c_d = reduceNumber(chakras.c + chakras.d); // Родовая программа по мужскому роду



    // Чакры Между
        // м.у d1 и d
    chakras.d2 = reduceNumber(chakras.d1 + chakras.d);
        // м/у С1 и С
    chakras.c2 = reduceNumber(chakras.c1 + chakras.c);

    chakras.e1 = reduceNumber(chakras.l + chakras.b_c + chakras.c_d + chakras.a_d);
    chakras.e2 = reduceNumber(chakras.e + chakras.e1);


    // Таланты по линии женского рода
    chakras.p1 = reduceNumber(chakras.b_c + chakras.e1);
    chakras.p2 = reduceNumber(chakras.b_c + chakras.p1);

    chakras.p3 = reduceNumber(chakras.a_d + chakras.e1);
    chakras.p4 = reduceNumber(chakras.a_d + chakras.p3);

    
    // Таланты по линии мужского рода
    chakras.s1 = reduceNumber(chakras.e1 + chakras.l);
    chakras.s2 = reduceNumber(chakras.l + chakras.s1);

    chakras.s4 = reduceNumber(chakras.c_d + chakras.e1);
    chakras.s3 = reduceNumber(chakras.c_d + chakras.s4);

    // Итого
    chakras.d3 = reduceNumber(chakras.a + chakras.a2 + chakras.a1 + chakras.a3 + chakras.e + chakras.c1 + chakras.c);
    chakras.c3 = reduceNumber(chakras.b + chakras.b2 + chakras.b1 + chakras.b3 + chakras.e + chakras.d1 + chakras.d);
    chakras.e3 = reduceNumber(chakras.l + chakras.l1 + chakras.l2 + chakras.l3 + chakras.l4 + chakras.x + chakras.c_d);
    

    // Предназначение
    chakras.h = reduceNumber(chakras.b + chakras.d);
    chakras.j = reduceNumber(chakras.a + chakras.c);

    chakras.n = reduceNumber(chakras.l + chakras.c_d);
    chakras.t = reduceNumber(chakras.b_c + chakras.a_d);

    chakras.m = reduceNumber(chakras.h + chakras.j);
    chakras.z = reduceNumber(chakras.n + chakras.t);

    chakras.s = reduceNumber(chakras.m + chakras.z);
    chakras.r = reduceNumber(chakras.z + chakras.s);


    // Обновление таблицы с проверками
        // Сахасрара
    if (document.getElementById("n33")) document.getElementById("n33").innerText = chakras.a;
    if (document.getElementById("n34")) document.getElementById("n34").innerText = chakras.b;
    if (document.getElementById("n35")) document.getElementById("n35").innerText = chakras.l;

        // Аджна
    if (document.getElementById("n36")) document.getElementById("n36").innerText = chakras.a2;
    if (document.getElementById("n37")) document.getElementById("n37").innerText = chakras.b2;
    if (document.getElementById("n38")) document.getElementById("n38").innerText = chakras.l1;

        // Вишудха
    if (document.getElementById("n39")) document.getElementById("n39").innerText = chakras.a1;
    if (document.getElementById("n40")) document.getElementById("n40").innerText = chakras.b1;
    if (document.getElementById("n41")) document.getElementById("n41").innerText = chakras.l2;

        // Анахата
    if (document.getElementById("n42")) document.getElementById("n42").innerText = chakras.a3;
    if (document.getElementById("n43")) document.getElementById("n43").innerText = chakras.b3;
    if (document.getElementById("n44")) document.getElementById("n44").innerText = chakras.l3;

        // Манипура
    if (document.getElementById("n45")) document.getElementById("n45").innerText = chakras.e;
    if (document.getElementById("n46")) document.getElementById("n46").innerText = chakras.e;
    if (document.getElementById("n47")) document.getElementById("n47").innerText = chakras.l4;

        // Свадхистана
    if (document.getElementById("n48")) document.getElementById("n48").innerText = chakras.c1;
    if (document.getElementById("n49")) document.getElementById("n49").innerText = chakras.d1;
    if (document.getElementById("n50")) document.getElementById("n50").innerText = chakras.x;

        // Муладхара
    if (document.getElementById("n51")) document.getElementById("n51").innerText = chakras.c;
    if (document.getElementById("n52")) document.getElementById("n52").innerText = chakras.d;
    if (document.getElementById("n53")) document.getElementById("n53").innerText = chakras.c_d;

        // ИТОГО
    if (document.getElementById("n54")) document.getElementById("n54").innerText = chakras.d3;
    if (document.getElementById("n55")) document.getElementById("n55").innerText = chakras.c3;
    if (document.getElementById("n56")) document.getElementById("n56").innerText = chakras.e3;

        // Поиск себя
    if (document.getElementById("n57")) document.getElementById("n57").innerHTML = chakras.h;
    if (document.getElementById("n58")) document.getElementById("n58").innerHTML = chakras.m;
    if (document.getElementById("n59")) document.getElementById("n59").innerHTML = chakras.j;

        // Социализация
    if (document.getElementById("n60")) document.getElementById("n60").innerHTML = chakras.n;
    if (document.getElementById("n61")) document.getElementById("n61").innerHTML = chakras.z;
    if (document.getElementById("n62")) document.getElementById("n62").innerHTML = chakras.t;

        // Духовная гармония
    if (document.getElementById("n63")) document.getElementById("n63").innerHTML = chakras.s;

        // Планетарное
    if (document.getElementById("n64")) document.getElementById("n64").innerHTML = chakras.r;


    
    return chakras;
}

document.addEventListener("DOMContentLoaded", () => {
    const calculateButton = document.querySelector('.btn');
    if (calculateButton) {
        calculateButton.addEventListener('click', (e) => {
            e.preventDefault();
            const chakras = calculateMatrix(e);
            if (!chakras) {
                console.error('Чакры не были вычислены.');
            }
        });
    }
});
