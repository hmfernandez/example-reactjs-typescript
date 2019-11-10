import React from "react";
import loginImg from "../../logo.svg";
import { Link } from 'react-router-dom';
import bcryptjs from 'bcryptjs';

interface IProps {
  history: any;
  location: any;
  match: any;
}

/**
 * Componente que trata do Login da aplicação
 */
export class Login extends React.Component<IProps> {

  // Poderiamos simplesmente tipar objeto dessa forma dadosForm: any
  // Funcionaria mas perderiamos os beneficios do typescript como autocomplete, garantia
  //  que os dados estejam com os nomes corretos e representados adequadamente.
  dadosForm: { [index: string]: string } = {
    username: '',
    password: ''
  };

  private handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    
    // NÃO SE DEVE VALIDAR/PERSISITIR LOGIN/CADASTRO DESSA FORMA.
    // Logica utilizada apaenas para fins de teste, possibilitando o fluxo da navegacao. 
    let dadosStorage= ['', ''];
    let at = localStorage.getItem('auth-token');
    if (at != null) {
      dadosStorage = at.split('_|_');  
    }
    let usernameStorage = dadosStorage[0];
    let hashStorage = dadosStorage[1];

    if (usernameStorage
          && hashStorage
          && usernameStorage === this.dadosForm['username']
          && bcryptjs.compareSync(this.dadosForm['password'], hashStorage)) {
      this.props.history.push(`/app`);
    } else {
      console.log('ERRO');
    }
  }

  /**
   * Exemplo com tipagem generica que, apesar de funcionar, não é recomendada.
   * Importante tipar com o objeto correto para não precisar tratar desnecessariamente os eventos recebidos.
   * Mais abaixo, metodo Ok (myChangeHandler)
   */
  public myChangeHandlerFormaNaoOk = (event: Event) => {
    let nome = '',    //Inicializa para evitar undefined
        valor = '';
    if (event.target != null) {
      nome = (event.target as HTMLInputElement).name;
      valor = (event.target as HTMLInputElement).value;
    }
    this.dadosForm[nome] = valor;
  }

  /**
   * Importante tipar com o objeto correto para não precisar tratar desnecessariamente os eventos recebidos.
   * Acima exemplo com tipagem generica, não recomendada.
   */
  private myChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nome = event.target.name;
    let valor = event.target.value;
    this.dadosForm[nome] = valor;
  }  
  
  // Caso as functions "myChangeHandler" e "handleLogin" não fossem do tipo arrow function seria necessário
  //  fazer o bind() do this
  render() {
    return (
      <div className="base-container">
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="logo" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input type="text" name="username" placeholder="usuario" onChange={ this.myChangeHandler } />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" placeholder="senha" onChange={ this.myChangeHandler } />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.handleLogin}>
            Login
          </button>
          <Link to="/registro">Cadastrar-se</Link>
        </div>
      </div>
    );
  }
}
