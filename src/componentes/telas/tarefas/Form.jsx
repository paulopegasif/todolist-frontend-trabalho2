import { useContext } from 'react';
import TaskContext from './TaskContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import CampoEntradaRead from '../../comuns/CampoEntradaRead';
import CampoEntradaRadio from '../../comuns/CampoEntradaRadio';
import Dialogo from '../../comuns/Dialogo';
import Alerta from '../../comuns/Alerta';

function Form() {

    const { objeto, handleChange, acaoCadastrar, listaCategorias, alerta } = useContext(TaskContext);

    return (


        <Dialogo id="modalEdicao" titulo="Tarefa" acaoCadastrar={acaoCadastrar} idform="form">
            <Alerta alerta={alerta} />

            <CampoEntradaRead
                id="txtCodigo"
                label="Código"
                tipo="text"
                name="codigo"
                value={objeto.codigo}
                onchange={handleChange}
                readonly={true}
                requerido={false} />


            <CampoEntrada
                id="txtTitulo"
                label="Título"
                tipo="text"
                name="titulo"
                value={objeto.titulo}
                onchange={handleChange}
                readonly={false}
                requerido={true}
                msgvalido="Nome Válido"
                msginvalido="Informe um nome válido"
                maxlength={40}
                placeholder="Insira o título da tarefa" />

            <CampoEntrada
                id="txtDescricao"
                label="Descrição"
                tipo="text"
                name="descricao"
                value={objeto.descricao}
                onchange={handleChange}
                readonly={false}
                requerido={true}
                msgvalido="Descrição Válida"
                msginvalido="Informe uma descrição válida"
                maxlength={40}
                placeholder="Descrição da Tarefa" />

            <CampoEntrada
                id="dateDataConclusao"
                label="Data Conclusão"
                tipo="date"
                name="dataconclusao"
                value={objeto.dataconclusao}
                onchange={handleChange}
                readonly={false}
                requerido={false}
                msgvalido="Data Válida"
                msginvalido="Informe uma data válida" />


            <label className="form-label fw-bold mt-3 d-block" htmlFor="radioNormal">Prioridade</label>

            <CampoEntradaRadio
                id="radioBaixa"
                label="Baixa"
                tipo="radio"
                name="prioridade"
                value="Baixa"
                checked={objeto.prioridade === "Baixa"}
                onchange={handleChange}
                readonly={false}
                requerido={true}
                msginvalido="Selecione uma prioridade" />

            <CampoEntradaRadio
                id="radioNormal"
                label="Normal"
                tipo="radio"
                name="prioridade"
                value="Normal"
                checked={objeto.prioridade === "Normal"}
                onchange={handleChange}
                readonly={false}
                requerido={true}
                msginvalido="Selecione uma prioridade" />

            <CampoEntradaRadio
                id="radioAlta"
                label="Alta"
                tipo="radio"
                name="prioridade"
                value="Alta"
                checked={objeto.prioridade === "Alta"}
                onchange={handleChange}
                readonly={false}
                requerido={true}
                msginvalido="Selecione uma prioridade" />




            <label className="form-label fw-bold mt-3 d-block" htmlFor="categoriaPessoal">Categoria</label>

            <div class="mb-3">
                <label htmlFor="selectCategoria"
                    className="form-label">Categoria</label>
                <select className="form-control"
                    required
                    value={objeto.categoria}
                    name="categoria" onChange={handleChange}>
                    <option disabled value="">
                        Selecione a categoria
                    </option>
                    {
                        listaCategorias.map((categoria) => (
                            <option key={categoria.codigo} value={categoria.codigo}>
                                {categoria.nome}
                            </option>
                        ))
                    }
                </select>
                <div class="valid-feedback">
                    Categoria Válida
                </div>
                <div class="invalid-feedback">
                    Informe a categoria
                </div>
            </div>
        </Dialogo>

    )

}

export default Form;