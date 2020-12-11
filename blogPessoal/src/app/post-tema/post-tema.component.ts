import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router
  ) { }

  ngOnInit(){
    this.findAllTemas()
    this.findByIdTema()
    
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
     console.log("Lista de temas "+ JSON.stringify(this.listaTemas))
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.id).subscribe((resp: any = Tema) => {
      this.tema = resp;
    })
  }

  cadastrar() {
    if (this.tema.descricao == null) {
      alert('Preencha o campo "Descrição" corretamente')
    } else {
      this.temaService.postTema(this.tema).subscribe((resp: any = Tema) => {
        this.tema = resp
        this.router.navigate(['/feed'])
        alert('Tema cadastrado com sucesso!')
      })
    }

  }

}
