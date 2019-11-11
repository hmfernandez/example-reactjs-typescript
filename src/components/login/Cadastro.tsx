import React from "react";
import loginImg from "../../logo.svg";
import bcryptjs from 'bcryptjs';

interface IProps {
  history: any;
  location: any;
  match: any;
}

/**
 * Componente responsavel pelo cadastro do cliente
 */
export class Cadastro extends React.Component<IProps> {
  
  // Tipa (Typescript) e inicializa um objeto.
  dadosForm: { [index: string]: string } = {
    username: '',
    password: ''
  };
  
  handleCadastro = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
        
    // NÃO SE DEVE VALIDAR/PERSISITIR LOGIN/CADASTRO DESSA FORMA.
    // Logica utilizada apaenas para fins de teste, possibilitando o fluxo da navegacao. 
    console.log('USUARIO', this.dadosForm);
    let salt = bcryptjs.genSaltSync(10);
    let hash = bcryptjs.hashSync(this.dadosForm['password'], salt);
    localStorage.setItem('auth-token', `${this.dadosForm['username']}_|_${hash}`);
    this.props.history.push(`/login`);
  }

  /**
   * Exemplo com tipagem generica que, apesar de funcionar, não é recomendada.
   * Importante tipar com o objeto correto para não precisar tratar desnecessariamente os eventos recebidos.
   * Mais abaixo, metodo Ok (myChangeHandler)
   */
  myChangeHandlerFormaNaoOk = (event: Event) => {
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
  myChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let nome = event.target.name;
    let valor = event.target.value;
    this.dadosForm[nome] = valor;
  }

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
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={ this.myChangeHandler } />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" placeholder="senha" onChange={ this.myChangeHandler } />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={ this.handleCadastro }>
            Cadastrar
          </button>
        </div>
      </div>
    );
  }
}
