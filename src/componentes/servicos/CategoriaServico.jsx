import Autenticacao from "../seg/Autenticacao";

export const getCategoriasAPI = async () => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const getCategoriaPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const deleteCategoriaPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraCategoriasAPI = async (objeto, metodo) => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/categorias`,
        {
            method : metodo,
            headers : {"Content-Type" : "application/json",
            "x-access-token": Autenticacao.pegaAutenticacao().token},
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}