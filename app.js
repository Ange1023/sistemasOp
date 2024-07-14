const ti = [];
const t = [];
let indexti;
let indext;
let ar;
// const ti = [2,9,8,7,6,5,40,4,39,38,37,36,35,34,33,32,31,30,3,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10]
// const t =[17,47,14,32,48,23,13,37,24,4,25,34,26,38,15,31,42,21,45,43,36,22,49,18,39,27,46,16,30,44,35,20,50,19,33,41,28,40,29]
let q;
let indexq;
let a = false;
const excelInput =  document.getElementById("excel-input")

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
        ar = this.content.slice(1,this.content.length);
        return ar;
    }

}

excelInput.addEventListener('change',async function(){
    const content = await readXlsxFile(excelInput.files[0]);

    const excel = new Excel(content);

    console.log(excel.header());
    console.log(excel.rows());

    console.log("array con los datos");
    for (let index = 0; index < ar.length; index++) {
        ti[index] = ar[index][indexti] !== null ? ar[index][indexti] : 0;
        t[index] = ar[index][indext] !== null ? ar[index][indext] : 0;
    }
    tCopia = [...t]
    console.log(ti);
    console.log(t);
    q = ar[0][indexq];
    a = true;

})

const mostrarTabla = (tf,funcion) =>{
    let tb = document.createElement('tbody')//tbody
    tb.id = 'tb';
    let tbr = document.getElementById('tbr');//table result
    let ft =  document.getElementById('ft');//tfooter
    tbr.appendChild(tb);
    T = new Array(ti.length);
    E = new Array(ti.length);
    I = new Array(ti.length);
    promT = 0;
    promE = 0;
    promI = 0;

    console.log("---ti---t---tf---T---E---I");

    sendDOM("FIFO",tf,tb);
    sendDOM("LIFO",tf,tb);
    sendDOM("RR",tf,tb);
        
    // Línea con promedios
    console.log("Promedios:");
    console.log(`
        ${promT.toFixed(4).padStart(8)}   ${promE.toFixed(4).padStart(8)}   ${promI.toFixed(4).padStart(8)}
    `);


};

const  sendDOM = (funcion,tf,tb) =>{

    if(funcion==='FIFO'){

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
            if(i + 1 == ti.length) {
                promT /= ti.length;
                promE /= ti.length;
                promI /= ti.length;
            }

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

                console.log(`
                    ${ti[i].toString().padStart(2)}   ${t[i].toString().padStart(2)}   ${tf[i].toString().padStart(2)}   ${T[i].toString().padStart(2)}   ${E[i].toString().padStart(2)}   ${I[i].toFixed(2).padStart(5)}
                `);

        }
        
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

}

const fifo = (ti, t, lifo = false) => {
    
    if(lifo){
        ti = [...ti].reverse();
        t = [...t].reverse();    
    }
    let inicio = performance.now();
    limpiarTabla();
    if(a===true){

    let f = "FIFO";
    let clock = 0
    let flag = true
    let tf = new Array(ti.length).fill(null)

    do {
        
        let elemento = ti.find((e, i) => {
            if (e <= clock && !tf[i]) {
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
        f="LIFO"
    }
    mostrarTabla(tf,f);

}else{

    alert("Y SI PASAS EL ARCHIVO PRIMERO?, OSEA NO SE DIGO YO");

}

let fin = performance.now();

console.log(fin-inicio);

};

const limpiarTabla = ()=>{

tbr.innerHTML = '';

};

const roundRobin = (ti, t) => {
    let inicio = performance.now();
    limpiarTabla();
    if(a){
        let tf = new Array(ti.length).fill(null);
        let clock = 0;
        let acum = 0;
        const q = 4;
        const tiCopia = [...ti]
        const tCopia = [...t]
        let flag = false;
        do {
            

            tiCopia.forEach((e,i) => {
                if (tiCopia[i] <= clock && tf[i] == null) {
                    if (tCopia[i] > q) {
                        tCopia[i] -= q;
                        clock += q;
                    } else {
                        for (tCopia[i]; tCopia[i] > 0; tCopia[i]--) {
                            clock++;
                        }
                        tf[i] = clock;
                    }
                } else {
                    acum++;
                }
            });

            if (acum == ti.length) {
                clock++;
            }
            acum = 0;

            flag = tf.includes(null)

        } while (flag);
        mostrarTabla(tf,"RR");
    }else{

        alert("Y SI PASAS EL ARCHIVO PRIMERO?, OSEA NO SE DIGO YO");

    }
    let fin = performance.now();
    console.log(fin-inicio);
}
