const ti = []; 
const t = [];
let indexti; // indice en la tabla ti del excel
let indext; // indice en la tabla t del excel
let exceldata; // cotenedor de la tabla del excel
let q; // quantum
let indexq; // indice en la tabla q del excel
let alerta = false; // booleano que indica si se paso o no el archivo
let listapromI = []; // arreglo para guardar los promedios de I 
let promT;
let promE;
let promI;

class Excel{
    
    constructor(content){
        this.content=content;
    }
    header(){
        indexti = this.content[0].indexOf('Ti');
        indext = this.content[0].indexOf('t');
        indexq = this.content[0].indexOf('quantum');
        return this.content[0];
    }
    rows(){
        exceldata = this.content.slice(1,this.content.length);
        return exceldata;
    }

}

const excelInput =  document.getElementById("excel-input")

excelInput.addEventListener('change',async function(){
    const content = await readXlsxFile(excelInput.files[0]);

    const excel = new Excel(content);

    excel.header(); // se inicializan los contenidos de los encabezados
    excel.rows(); // se inicializa el contenido de la tabla de los encabezados

    for (let index = 0; index < exceldata.length; index++) {
        ti[index] = exceldata[index][indexti] !== null ? exceldata[index][indexti] : 0; // si en la tabla ti no hay un valor nullo se agrega el valor en la tabla sino 0
        t[index] = exceldata[index][indext] !== null ? exceldata[index][indext] : 0; // si en la tabla t no hay un valor nullo se agrega el valor en la tabla sino 0
    }
    tCopia = [...t]
    q = exceldata[0][indexq];
    alerta = true;
})

function mostrarTabla(tf){

        let tb = document.createElement('tbody')//tbody
        tb.id = 'tb';
        let tbr = document.getElementById('tbr');//table result
        tbr.appendChild(tb);
        T = new Array(ti.length);
        E = new Array(ti.length);
        I = new Array(ti.length);
        promT = 0;
        promE = 0;
        promI = 0;

        tHead = document.createElement("thead");
        tHead.id = "th";

        const tr = document.createElement('tr');

        // Creamos los th y los añadimos a la fila
        const headers = ['Ti', 't', 'tf', 'T', 'E', 'I'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            tr.appendChild(th);
        });

        // Añadimos la fila al thead
        tHead.appendChild(tr);

        tbr.insertBefore(tHead,tb);

        for (let i = 0; i < ti.length; i++) {
            T[i] = tf[i] - ti[i];
            E[i] = T[i] - t[i];
            I[i] = t[i] / T[i];

            promT += T[i];
            promE += E[i];
            promI += I[i];

            // Crea una nueva fila tr y sus celdas td
            const tr = document.createElement('tr');

            // Crea y añade las celdas td con los datos correspondientes
            const tiTd = document.createElement('td');
            tiTd.textContent = ti[i];
            tr.appendChild(tiTd);

            const tTd = document.createElement('td');
            tTd.textContent = t[i];
            tr.appendChild(tTd);

            const tfTd = document.createElement('td');
            tfTd.textContent = tf[i];
            tr.appendChild(tfTd);

            const TTd = document.createElement('td');
            TTd.textContent = T[i];
            tr.appendChild(TTd);

            const ETd = document.createElement('td');
            ETd.textContent = E[i];
            tr.appendChild(ETd);

            const ITd = document.createElement('td');
            ITd.textContent = I[i].toFixed(2);
            tr.appendChild(ITd);

            // Agrega la fila al tbody
            tb.appendChild(tr);
        }
        promT /= ti.length;
        promE /= ti.length;
        promI /= ti.length;

    // Creamos el tfoot
     const tfoot = document.createElement('thead');
     const trFoot = document.createElement('tr');

     // Creamos y añadimos las celdas del tfoot con los promedios
     const promTCell = document.createElement('td');
     promTCell.colSpan = 3; // Colspan 3 para ocupar las primeras tres columnas
     promTCell.textContent = 'Promedios:';
     trFoot.appendChild(promTCell);

     const promTValue = document.createElement('td');
     promTValue.textContent = promT.toFixed(4);
     trFoot.appendChild(promTValue);

     const promEValue = document.createElement('td');
     promEValue.textContent = promE.toFixed(4);
     trFoot.appendChild(promEValue);

     const promIValue = document.createElement('td');
     promIValue.textContent = promI.toFixed(4);
     trFoot.appendChild(promIValue);

     // Añadimos la fila al tfoot
     tfoot.appendChild(trFoot);

     // Añadimos el tfoot al final de la tabla
     tbr.appendChild(tfoot);
    
}

const btns = document.querySelectorAll('.boton');
     btns.forEach((btn) => {
         btn.addEventListener('click', e => {
            // Verificar si la posición en el arreglo listapromI está vacía
            promI !== undefined && !listapromI[e.target.id-1] && (listapromI[e.target.id-1] = promI.toFixed(4));

            if(!listapromI[0] == [] && !listapromI[1] == [] && !listapromI[2] == []){
                console.log(listapromI);

                let time_fifo = document.getElementById("t1");
                let time_lifo = document.getElementById("t2");
                let time_roundRobin = document.getElementById("t3");

                time_fifo.textContent = listapromI[0];
                time_lifo.textContent = listapromI[1];
                time_roundRobin.textContent = listapromI[2];

                let maximo = listapromI.map(parseFloat);
                console.log(Math.max(...maximo));

                let indiceGanador = listapromI.findIndex(elemento => parseFloat(elemento) === Math.max(...maximo));

                btns.forEach((boton, index) => {
                    if (index == indiceGanador) {
                        boton.classList.add('ganador');
                    } else {
                        boton.classList.remove('ganador');
                    }
                });

            }
    });
});

const fifo_lifo = (ti, t, lifo = false) => {

    let inicio = performance.now();
    tbr.innerHTML = '';
    if(alerta){

        let clock = 0
        let flag = true
        let tf = new Array(ti.length).fill(null)
        if (lifo) {
            ti = [...ti].reverse();
            t = [...t].reverse();
        }
        do {
            
            let elemento = ti.find((e, i) => {
                if (e <= clock && tf[i] == null) {
                    clock += t[i];
                    tf[i] = clock;
                    return true;
                }
            });

            

            if (!elemento) {
                clock++;
            }
            flag = (tf.includes(null))
            
        } while (flag);
        
        if (lifo) {
            tf.reverse();
            funcion="lf";
        }
        mostrarTabla(tf);

    }else{

        alert("Y SI PASAS EL ARCHIVO PRIMERO?, OSEA NO SE DIGO YO");

    }

    let fin = performance.now();

    console.log(fin-inicio);
    
};

const roundRobin = (ti, t) => {
    let inicio = performance.now();
    let tf = new Array(ti.length).fill(null);
    let clock = 0;
    const tiCopia = [...ti];
    const tCopia = [...t];
    tbr.innerHTML = '';

    if (alerta) {
        while (tf.includes(null)) {
            let allIdle = true; // true si las tareas no se realizaron
            
            tiCopia.forEach((e, i) => {
                if (tiCopia[i] <= clock && tf[i] === null) {
                    allIdle = false; // si la tarea se realizo
                    if (tCopia[i] > q) {
                        tCopia[i] -= q;
                        clock += q;
                    } else {
                        clock += tCopia[i];
                        tf[i] = clock;
                    }
                }
            });

            if (allIdle) {
                clock++;
            }
        }
        mostrarTabla(tf);
    } else {
        alert("Y SI PASAS EL ARCHIVO PRIMERO?, OSEA NO SE DIGO YO");
    }

    let fin = performance.now();
    console.log(fin-inicio);
}