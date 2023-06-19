import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import TaskContext from "./TaskContext";

function Tarefas() {

    const { listaObjetos, remover,
        alerta, setObjeto, setEditar, setAlerta } = useContext(TaskContext);

    return (
        <div className="p-3">
            <h1>Tarefas: </h1>
            <div >
                <Alerta alerta={alerta} />
                <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal"
                    data-bs-target="#modalEdicao"
                    onClick={
                        () => {
                            setObjeto({
                                codigo: 0,
                                titulo: '',
                                descricao: '',
                                dataconclusao: '',
                                prioridade: '',
                                categoria: ''
                            });
                            setEditar(false);
                            setAlerta({
                                status: '',
                                message: ''
                            });
                        }
                    }>
                    Adicionar <i className="bi bi-file-earmark-plus" />
                </button>
            </div>

            {listaObjetos.length === 0 && <h4>Nenhuma tarefa encontrada!</h4>}
            {listaObjetos.length > 0 && (
                <div className="container-fluid">
                    <div className="row">
                        {listaObjetos.map(objeto => (
                            <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-3 p-0 pe-sm-3">
                                <div className={`card shadow border-2 rounded-3`}>
                                    <div className={`card-header text-center`}>
                                        <span className="badge bg-white text-dark">{objeto.codigo}</span>
                                        {isLate(objeto.dataconclusao) &&
                                            <span className="badge bg-danger ms-2">Atrasada</span>
                                        }
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{objeto.titulo}</h5>
                                        <p className="card-text text-muted">{objeto.descricao}</p>
                                    </div>

                                    <ul className="list-group border-light list-group-flush">
                                        <li className="list-group-item text-muted sm-text">
                                            <i className="bi bi-calendar-check-fill text-success" /> Conclusão: <span className="text-dark fw-bold">{converter(objeto.dataconclusao)}</span>
                                        </li>
                                    </ul>


                                    <div className="card-footer text-center">
                                        <button className="btn btn-success me-2" title="Concluir Tarefa"
                                            onClick={() => remover(objeto)}>
                                            <i className="bi bi-check2" />
                                        </button>
                                        <button className="btn btn-primary" title="Editar Tarefa"
                                            data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                            onClick={
                                                () => {
                                                    setObjeto(objeto);
                                                    setEditar(true);
                                                    setAlerta({ status: '', message: '' });
                                                }
                                            }>
                                            <i className="bi bi-pencil" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function converter(dataString) {
    let data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function isLate(dataString) {
    let data = new Date(dataString);
    data.setTime(data.getTime() + (3 * 60 * 60 * 1000));
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    return data < today;
}

export default Tarefas;