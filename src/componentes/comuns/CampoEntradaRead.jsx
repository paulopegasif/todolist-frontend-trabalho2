function CampoEntrada({id, label, tipo, name, value, onchange, requerido
                        , readonly, maxlength, msgvalido, msginvalido}) {
    return (
        <div className ="input-group">
            <label htmlFor={id}
                className="input-group-text">{label}</label>
            <input className="form-control"
                type={tipo}
                id={id}
                name={name}
                value={value}
                onChange={onchange}
                required={requerido}
                readOnly={readonly}
                maxLength={maxlength} />
            <div class="valid-feedback">
                {msgvalido}
            </div>
            <div class="invalid-feedback">
                {msginvalido}
            </div>
        </div>
    )
}

export default CampoEntrada;