import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'date'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.findAllPostagens()
    this.findAllTemas()
   
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
     console.log("Lista de postagens "+ JSON.stringify(this.listaPostagens))
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

     console.log("titulo "+this.postagem.titulo)
     console.log("texto "+this.postagem.texto)
     console.log("tema "+this.postagem.tema.descricao)
    if (this.postagem.titulo == null || this.postagem.texto == null || this.postagem.tema == null) {
      alert('Preencha todos os campos antes de publicar!')
    } else {
      this.postagemService.postPostagem(this.postagem).subscribe((resp: any = Postagem) => {
        this.postagem = resp
        this.postagem = new Postagem()
        alert ('Postagem realizada com sucesso!')
        this.findAllPostagens()
      })
    }
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
     console.log("Lista de temas "+ JSON.stringify(this.listaTemas))
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: any = Tema) => {
      this.tema = resp;
    })
  }



}
