import { useEffect, useState } from "react";
import Form from "./Form";
import CategoriaContext from "./CategoriaContext";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import { getCategoriasAPI, getCategoriaPorCodigoAPI, deleteCategoriaPorCodigoAPI, cadastraCategoriasAPI} from '../../servicos/CategoriaServico';
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";

function Task() {
    
    let navigate = useNavigate();
    
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: ""
    });

    const [carregando, setCarrengando] = useState(true);


    const recuperar = async codigo => {
        try {
            setObjeto(await getCategoriaPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }


    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraCategoriasAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaCategorias();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }
    

    const recuperaCategorias = async () => {
        try {
            setCarrengando(true);
            setListaObjetos(await getCategoriasAPI());
            setCarrengando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }


    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteCategoriaPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaCategorias();
    }

    useEffect(() => {
        recuperaCategorias();
    }, []);

    return (
        <CategoriaContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaCategorias, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </CategoriaContext.Provider>
    )
}

export default WithAuth(Task);