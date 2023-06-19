function CampoEntrada({id, label, tipo, name, value, onchange, requerido
                        , readonly, maxlength, msgvalido, msginvalido, placeholder}) {
    return (
        <div className ="form-floating mt-3">
            
            <input className="form-control"
                type={tipo}
                id={id}
                name={name}
                value={value}
                onChange={onchange}
                required={requerido}
                readOnly={readonly}
                maxLength={maxlength}
                placeholder={placeholder} />

            <label htmlFor={id} className="form-label">{label}</label>
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