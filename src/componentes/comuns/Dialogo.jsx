function Dialogo(props) {

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <div className="modal fade" id={props.id} tabIndex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content ">
                    <div className="modal-header bg-light">
                        <h4 className="modal-title fs-5" id="exampleModalLabel">{props.titulo}</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <form id={props.idform} onSubmit={props.acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Salvar  <i className="bi bi-save" data-bs-dismiss="modal"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dialogo;