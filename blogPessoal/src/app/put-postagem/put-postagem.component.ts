import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number 

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.idPost = this.route.snapshot.params["id"]
    this.findByIdPostagem(this.idPost)

    this.findAllTemas()
  }

  salvar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: any = Postagem) => {
      this.postagem = resp
      this.router.navigate(['/feed'])
      alert('Postagem alterada com sucesso')
    }, err => {
      if (err.status == '500') {
        alert ('Preencha todos os campos corretamente!')
      }
    })
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

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: any = Postagem) => {
      this.postagem = resp
    })
  }

}
