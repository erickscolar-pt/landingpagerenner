import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from './app.service';
import { formatDate } from '@angular/common';

export interface ModalOne {
  nome: string;
  telefone: string;
}
export interface ModalTwo {
  nome: string;
  telefone: string;
  horario: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  nome!: string;
  telefone!: string;
  horario!: string;


  constructor(
    public dialog: MatDialog,
    public appService: AppService,
    @Inject(LOCALE_ID) public locale: string,
    ){}
  title = 'Veloe';

  ngOnInit() {
  }

  modalOne(): void {
    const dialogRef = this.dialog.open(AppModalOne, {
      width: '500px',
      data: { nome: this.nome,
              telefone: this.telefone},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.nome = result.nome;
      this.telefone = result.telefone;

      this.appService.weCallYou(this.nome, this.telefone).subscribe(res => {
      })
    });
  }

  modalTwo(): void {
    const dialogRef = this.dialog.open(AppModalTwo, {
      width: '500px',
      data: { nome: this.nome,
              telefone: this.telefone,
              horario: this.horario},
    });

    dialogRef.afterClosed().subscribe(result => {

      this.nome = result.nome;
      this.telefone = result.telefone;
      this.horario = result.horario
      console.log(this.horario)

      this.appService.scheduleCallYou(this.nome, this.telefone, this.horario).subscribe(res => {
      })
    });
  }

  public redirect(dir: any){

    if(dir == 'whatsapp'){
      //window.open("https://wa.me/555139215464")
      window.open("https://api.whatsapp.com/send?phone=555139215464&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")

    }

    if(dir == 'chat'){
      window.open("https://omne.link/QuWdev")
    }

    if(dir == 'site'){
      window.open("https://lojasrenner.com.br/cartoes")
    }

    if(dir == 'app'){
      if(navigator.platform.indexOf("Mac") === 0 || navigator.platform === "iPhone"){
        window.open("https://ren-ner.co/dg0r")
      }else{
        window.open("https://ren-ner.co/dg0r")
      }
    }
  }
}

//Component Modal one
@Component({
  selector: 'app-modal-one',
  templateUrl: 'app-modal-one.html',
  styleUrls: ['./app.component.scss']
})
export class AppModalOne {

  error: boolean = false;

  errorDate: boolean = false;
  dataUser!: any;
  nome!: any;
  telefone!: any;
  agendamento!: any;
  constructor(
    public dialogRef: MatDialogRef<AppModalOne>,
    @Inject(MAT_DIALOG_DATA) public data: ModalOne,
  ){
    this.dataUser = data;
    this.nome = data.nome;
    this.telefone = data.telefone;
  }

  stateDialog(state:any){
    if(this.dataUser.nome == undefined ||
       this.dataUser.telefone == undefined ||
       this.dataUser.nome == '' ||
       this.dataUser.telefone == ''){
        this.error = true;
        return;
      }

    if(this.dataUser.nome !== undefined ||
      this.dataUser.telefone !== undefined ||
      this.dataUser.nome !== '' ||
      this.dataUser.telefone !== '') {



    this.dialogRef.close(this.dataUser)
    this.error = false;
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

//Component Modal Two
@Component({
  selector: 'app-modal-two',
  templateUrl: 'app-modal-two.html',
  styleUrls: ['./app.component.scss']
})
export class AppModalTwo {

  error: boolean = false;
  errorDate: boolean = false;
  dataUser!: any;
  nome!: any;
  telefone!: any;
  agendamento!: any;

  constructor(
    public dialogRef: MatDialogRef<AppModalTwo>,
    @Inject(MAT_DIALOG_DATA) public data: ModalTwo,
    @Inject(LOCALE_ID) public locale: string,
  ){
    this.dataUser = data;
    this.nome = data.nome;
    this.telefone = data.telefone;
    this.agendamento = data.horario;
  }

  stateDialog(state:any){
    if(this.dataUser.nome == undefined ||
       this.dataUser.telefone == undefined ||
       this.dataUser.horario == undefined ||
       this.dataUser.nome == '' ||
       this.dataUser.telefone == '' ||
       this.dataUser.horario == ''){
        this.error = true;
        return;
      }

    if(this.dataUser.nome !== undefined ||
      this.dataUser.telefone !== undefined ||
      this.dataUser.horario !== undefined ||
      this.dataUser.nome !== '' ||
      this.dataUser.telefone !== '' ||
      this.dataUser.horario !== '') {


    var str = this.dataUser.horario

    let varHora = str.substring(0, 2)+'/'+str.substring(2, 4)+'/'+str.substring(4, 8)+' '+str.substring(8, 10)+':'+str.substring(10,12)
    //let varHoraTwo = new Date(varHora);
    //console.log(varHoraTwo)
    var time = new Date();

    let hora = time.toLocaleString('pt-BR', { hour: 'numeric', hourCycle: 'h24' })
    let minuto = time.toLocaleString('pt-BR', { minute: 'numeric', hourCycle: 'h24' })
    let dia = time.toLocaleString('pt-BR', { day: '2-digit' })
    let mes = time.toLocaleString('pt-BR', { month: '2-digit' })
    let ano = time.toLocaleString('pt-BR', { year: 'numeric' })

    let horario = str.substring(8, 10)+':'+str.substring(10,12)
//console.log(horario)
    let varDate = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto;
    let date = str.substring(0, 2)+'/'+str.substring(2, 4)+'/'+str.substring(4, 8) + ' ' + horario;

    if(date<varDate){
      this.errorDate = true;
      return;
    }

    this.dataUser.horario = 'Data e hora: ' + date;
    this.dialogRef.close(this.dataUser)
    this.error = false;
    }

  }

  onNoClick(): void {

    this.dialogRef.close();
  }
}
