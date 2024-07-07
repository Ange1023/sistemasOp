import readXlsxFile from 'read-excel-file'
class Excel{
    
    constructor(content){
        this.content=content;
    }
    header(){
        indexti = this.content[10].indexOf('Ti');
        indext = this.content[10].indexOf('t');
        indexq = this.content[10].indexOf('quantum');
        return this.content[10];
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
    q = ar[0][indexq];
    a = true;

})