import { useEffect, useState } from "react";
import Form from "./Form";
import TaskContext from "./TaskContext";
import Tarefas from "./Tarefas";
import Carregando from "../../comuns/Carregando";
import { getTarefasAPI, getTarefaPorCodigoAPI, deleteTarefaPorCodigoAPI, cadastraTarefasAPI } from '../../servicos/TarefaServico';
import { getCategoriasAPI } from '../../servicos/CategoriaServico';
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";

function Task() {
    
    let navigate = useNavigate();
    
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoria, setCategoria] = useState({codigo: '', nome: ''});
    const [listaObjetos, setListaObjetos] = useState([]);
    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [editar, setEditar] = useState(false);
    const [carregando, setCarrengando] = useState(true);
    const [objeto, setObjeto] = useState({
        codigo: '',
        titulo: '',
        descricao: '',
        dataconclusao: '',
        prioridade: '',
        categoria: ''
    });


    const recuperar = async codigo => {
        try {
            setObjeto(await getTarefaPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }


    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraTarefasAPI(objeto, metodo);
            let categoriasAPI = await getCategoriasAPI();
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            setCategoria(categoriasAPI);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
            window.location.reload();
            /* navigate("/login", { replace: true }); */
        }
        recuperaTarefas();
    }

    const handleChange = (e) => {

        console.log('Evento: ', e); /*  Verificando se está passando o evento correto */


        const name = e.target?.name;
        const value = e.target?.value;
        setObjeto({ ...objeto, [name]: value });
        /* setCategoria({...categoria, nome: value}); */
    }

/*     const handleChange = (e) => {
        const { name, value } = e.target;
        setObjeto({ ...objeto, [name]: value });
        setCategoria({ ...categoria, nome: value });
      }; */
    

    const recuperaTarefas = async () => {
        try {
            setCarrengando(true);
            setListaObjetos(await getTarefasAPI());
            setCarrengando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaCategorias = async () => {
        try {
          let categoriasAPI = await getCategoriasAPI();
          setListaCategorias(categoriasAPI);
        } catch (err) {
          window.location.reload();
          navigate("/login", { replace: true });
        }
      };

    const remover = async objeto => {
        if (window.confirm('Deseja concluir essa Tarefa?')) {
            try {
                let retornoAPI = await deleteTarefaPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaTarefas();
    }

    useEffect(() => {
        recuperaTarefas();
        recuperaCategorias();
    }, []);

    return (
        <TaskContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaTarefas, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange,
            categoria, setCategoria,
            listaCategorias, setListaCategorias
        }}>
            <Carregando carregando={carregando}>
                <Tarefas />
            </Carregando>
            <Form />
        </TaskContext.Provider>
    )
}

export default WithAuth(Task);