export class AsistenciaModel {
    public text: string;
    public date: Date;

    constructor(text: string){
        this.text = text;
        this.date = new Date();
        
    }

}

    