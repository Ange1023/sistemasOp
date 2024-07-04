const ti = [];
const t = [];
let indexti;
let indext;
let ar;
// const ti = [2,9,8,7,6,5,40,4,39,38,37,36,35,34,33,32,31,30,3,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10]
// const t =[17,47,14,32,48,23,13,37,24,4,25,34,26,38,15,31,42,21,45,43,36,22,49,18,39,27,46,16,30,44,35,20,50,19,33,41,28,40,29]
let tiSize;
let q;
let indexq;

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

const excelInput =  document.getElementById("excel-input")

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
    tiSize = ti.length;
    q = ar[0][indexq];
    fifo(ti, t);
    lifo(ti, t);
    roundRobin (ti,t)

})

const mostrarTabla = (tf) =>{

    T = new Array(tiSize);
    E = new Array(tiSize);
    I = new Array(tiSize);
    promT = 0;
    promE = 0;
    promI = 0;

    console.log("---ti---t---tf---T---E---I");

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

        console.log(
            `${ti[i].toString().padStart(2)}   ${t[i].toString().padStart(2)}   ${tf[i].toString().padStart(2)}   ${T[i].toString().padStart(2)}   ${E[i].toString().padStart(2)}   ${I[i].toFixed(2).padStart(5)}`
        );
    }

    // Línea con promedios
    console.log("Promedios:");
    console.log(
        `${promT.toFixed(4).padStart(8)}   ${promE.toFixed(4).padStart(8)}   ${promI.toFixed(4).padStart(8)}`
    );

};

const fifo = (ti, t, lifo = false) => {
    console.log("Esto es FIFO");
    let limit = tiSize + 2;
    let cont = 0;
    let clk = 0
    let tf = new Array(tiSize)
    do {
        let elemento = ti.find((e, i) => {
            if (e <= clk && tf[i] == null) {
                clk += t[i];
                tf[i] = clk;
                return e;
            }
        });
        if (elemento === undefined) {
            clk++;
        } 
        cont++;
    } while (cont < limit);
    
    if (lifo) {
        tf.reverse();
    }
    mostrarTabla(tf);
};

const lifo = (ti, t) => {
    const tiReversed = [...ti].reverse();
    const tReversed = [...t].reverse();
    fifo(tiReversed, tReversed, true);
};

function roundRobin(ti, t) {
    console.log("Round Robin q = ",q);
    let tf = new Array(ti.length).fill(null);
    let clock = 0;
    let acum = 0;
    const tiCopia = [...ti]
    const tCopia = [...t]

    do {
        flag = false;

        // Aplicando Round Robin
        for (let i = 0; i < ti.length; i++) {
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
        }

        if (acum == ti.length) {
            clock++;
        }
        acum = 0;

        // Comprobando condición de terminación
        for (let i = 0; i < tf.length; i++) {
            if (tf[i] == null) {
                flag = true;
            }
        }
    } while (flag);
    mostrarTabla(tf);
}


