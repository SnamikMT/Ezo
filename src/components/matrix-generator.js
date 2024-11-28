export function generateMatrixSVG(chakras) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svgContainer = document.createElementNS(svgNamespace, "svg");
    svgContainer.setAttribute("width", "600");
    svgContainer.setAttribute("height", "600");
    svgContainer.setAttribute("viewBox", "0 0 600 600");

    const positions = {
        top: { cx: 297, cy: 30, color: "#A855F7", r: "25", fontSize: "18", textColor: "white"},
        bottom: { cx: 300, cy: 570, color: "#eb4b41", r: "25", fontSize: "18", textColor: "white"},
        right: { cx: 570, cy: 300, color: "#eb4b41", r: "25", fontSize: "18", textColor: "white"},

        bottomRight: { cx: 480, cy: 480, color: "white", r: "30", fontSize: "20" },

        left: { cx: 35, cy: 300, color: "#A855F7", r: "25", fontSize: "18", textColor: "white"},
        topLeft: { cx: 100, cy: 100, color: "white", r: "30", fontSize: "20" },
        bottomLeft: { cx: 120, cy: 470, color: "#3366cc", r: "25", fontSize: "20" },

        top2: { cx: 297, cy: 90, color: "#6366F1", r: "20", fontSize: "16", textColor: "white" },
        bottom2: { cx: 297, cy: 470, color: "#f97316", r: "15", fontSize: "14", textColor: "white" },
        right2: { cx: 465, cy: 300, color:'#f97316', r: "15", fontSize: "16", textColor: "white" },

        X: { cx: 375, cy: 375, color:'#ffffff', r: "15", fontSize: "14" },

        left2: { cx: 90, cy: 300, color:"#6366F1", r:"20", fontSize: "16", textColor: "white" },
        topLeft2: { cx: 180, cy: 180, color: "#ffffff", r:"15", fontSize: "14" },

        top3: { cx: 297, cy: 147, color: "#3b82f6", r: "15", fontSize: "14", textColor: "white" },
        bottom3: { cx: 297, cy: 510, color: "white", r: "20", fontSize: "16" },
        right3: { cx: 510, cy: 300, color:'white', r: "20", fontSize: "16" },
        left3: {cx: 142, cy: 300, color: "#3b82f6", r: "15", fontSize: "14", textColor: "white" },
        
        top4: { cx: 297, cy: 210, color: "#22c55e", r: "15", fontSize: "14", textColor: "white" },
        left4: { cx: 210, cy: 300, color: "#22c55e", r: "15", fontSize: "14", textColor: "white" },

        center: { cx: 297, cy: 300, r: "30", color: "#ffff99", fontSize: "25" },
        centerRight: { cx: 350, cy: 300, r: "20", color: "#ffffff", fontSize: "16" },
        centerRight_Right: { cx: 390, cy: 300, r: "15", color: "#ffffff", fontSize: "15" },

        s1 : { cx: 175, cy: 175, r: "15", color: "#ffffff", fontSize: "15" },
        s2 : { cx: 150, cy: 150, r: "15", color: "#ffffff", fontSize: "15" },
        s3 : { cx: 445, cy: 445, r: "15", color: "#ffffff", fontSize: "15" },
        s4 : { cx: 420, cy: 420, r: "15", color: "#ffffff", fontSize: "15" },
        p1 : { cx: 425, cy: 175, r: "15", color: "#ffffff", fontSize: "15" },
        p2 : { cx: 450, cy: 150, r: "15", color: "#ffffff", fontSize: "15" },
        p3 : { cx: 175, cy: 425, r: "15", color: "#ffffff", fontSize: "15" },
        p4 : { cx: 150, cy: 450, r: "15", color: "#ffffff", fontSize: "15" },

        x: { cx: 380, cy: 380, color: "#ffffff", r: "15", fontSize: "14" },
        x1: { cx: 360, cy: 420, color: "#ffffff", r: "15", fontSize: "14" },
        x2: { cx: 420, cy: 360, color: "#ffffff", r: "15", fontSize: "14" },

        sumTopRight: { cx: 500, cy: 100, color: "white", r: "30", fontSize: "20" },
        sumBottomLeft: { cx: 100, cy: 500, color: "white", r: "30", fontSize: "20" },
        sumBottomRight: { cx: 500, cy: 500, color: "white", r: "30", fontSize: "20" }
    };

    const idToPositionMap = {
        a: ['left'],
        b: ['top'],
        l: ['topLeft'],
        
        a2: ['left2'],
        b2: ['top2'],
        a1: ['left3'],

        b1: ['top3'],
        a3: ['left4'],
        b3: ['top4'],

        e: ['center'],
        c1: ['right2'],

        d1: ['bottom2'],
        c: ['right'],

        d: ['bottom'],
        d2: ['bottom3'],

        c2: ['right3'],

        e1: ['centerRight_Right'],
        e2: ['centerRight'],

        b_c: ['sumTopRight'],
        a_d: ['sumBottomLeft'],
        c_d: ['sumBottomRight'],

        s1: ['s1'],
        s2: ['s2'],
        s3: ['s3'],
        s4: ['s4'],

        p1: ['p1'],
        p2: ['p2'],
        p3: ['p3'],
        p4: ['p4'],

        x: ['x'],
        x1: ['x1'],
        x2: ['x2']
    };

    for (let [id, positionArr] of Object.entries(idToPositionMap)) {
        const positionKey = positionArr[0]; // Получаем строку позиции из массива
        const value = chakras[id] || "0"; // Вытягиваем значение из chakras
    
        if (positions[positionKey]) {
            const radius = positions[positionKey].r || "25";
            const textColor = positions[positionKey].textColor || "black"; 
    
            const circle = document.createElementNS(svgNamespace, "circle");
            circle.setAttribute("cx", positions[positionKey].cx);
            circle.setAttribute("cy", positions[positionKey].cy);
            circle.setAttribute("r", radius);
            circle.setAttribute("fill", positions[positionKey].color);
            circle.setAttribute("stroke", "black");
            circle.setAttribute("stroke-width", "2");
            svgContainer.appendChild(circle);
    
            const text = document.createElementNS(svgNamespace, "text");
            text.setAttribute("x", positions[positionKey].cx);
            text.setAttribute("y", positions[positionKey].cy + 5);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", positions[positionKey].fontSize);
            text.setAttribute("font-weight", "bold");
            text.setAttribute("fill", textColor);
            text.textContent = value;
            svgContainer.appendChild(text);
    
            console.log(`Setting ${id} at ${positionKey} with value ${value}`);
        }
    }
    

    // Вставляем SVG в нужный контейнер на странице
    const matrixContainer = document.getElementById("matrixResult");
    if (matrixContainer) {
            matrixContainer.innerHTML = ""; // Очищаем старое содержимое
            matrixContainer.appendChild(svgContainer); // Вставляем новое SVG
    } else {
        console.error('Контейнер для матрицы не найден');
    }
    
}

