let ar
let ti = new Array;
let t = [];
let tCopia = [];
let T = [];
let E = [];
let I = [];
let promT = 0;
let promE = 0;
let promI = 0;
let indexti;
let indext
class Excel{
    
    constructor(content){
        this.content=content;
    }
    header(){
        indexti = this.content[0].indexOf('Ti');
        indext = this.content[0].indexOf('t');
        return this.content[0];
    }
    rows(){
        ar = this.content.slice(1,this.content.length);
        return this.content.slice(1,this.content.length);
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
            ti[index] = ar[index][indexti];
            t[index] = ar[index][indext];
    }
    tCopia = [...t]
    console.log(ti);
    roundRobin(ti, t);

})

function roundRobin(ti, t) {
    let tf = new Array(ti.length);
    let clock = 0;
    let acum = 0;
    const q = 4;

    do {
        flag = false;

        // Aplicando Round Robin
        for (let i = 0; i < ti.length; i++) {
            if (ti[i] <= clock && tf[i] == null) {
                if (t[i] > q) {
                    t[i] -= q;
                    clock += q;
                } else {
                    for (t[i]; t[i] > 0; t[i]--) {
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

    console.log("---ti---t---tf---T---E---I");

    for (let i = 0; i < ti.length; i++) {
        T[i] = tf[i] - ti[i];
        E[i] = T[i] - tCopia[i];
        I[i] = tCopia[i] / T[i];

        promT += T[i];
        promE += E[i];
        promI += I[i];
        if(i+1==ti.length){

            promT /= ti.length;
            promE /= ti.length;
            promI /= ti.length;

        }

        console.log(
            `${ti[i].toString().padStart(2)}   ${tCopia[i].toString().padStart(2)}   ${tf[i].toString().padStart(2)}   ${T[i].toString().padStart(2)}   ${E[i].toString().padStart(2)}   ${I[i].toFixed(2).padStart(5)}`
        );
    }

    // Línea con promedios
    console.log("Promedios:");
    console.log(
        `${promT.toFixed(2).padStart(8)}   ${promE.toFixed(2).padStart(8)}   ${promI.toFixed(2).padStart(8)}`
    );
}


