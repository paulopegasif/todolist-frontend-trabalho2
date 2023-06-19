import { useContext } from 'react';
import TaskContext from './CategoriaContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import CampoEntradaRead from '../../comuns/CampoEntradaRead';
import Dialogo from '../../comuns/Dialogo';
import Alerta from '../../comuns/Alerta';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(TaskContext);

    return (


        <Dialogo id="modalEdicao" titulo="Categorias" acaoCadastrar={acaoCadastrar} idform="form">
            <Alerta alerta={alerta} />

            <CampoEntradaRead
                id="txtCodigo"
                label="Código"
                tipo="text"
                name="codigo"
                value={objeto && objeto.codigo}
                onchange={handleChange}
                readonly={true}
                requerido={false} />


            <CampoEntrada
                id="txtNome"
                label="Nome"
                tipo="text"
                name="nome"
                value={objeto.nome}
                onchange={handleChange}
                readonly={false}
                requerido={true}
                msgvalido="Nome Válido"
                msginvalido="Informe um nome válido"
                maxlength={40}
                placeholder="Insira o nome da categoria" />

            
        </Dialogo>

    )

}

export default Form;