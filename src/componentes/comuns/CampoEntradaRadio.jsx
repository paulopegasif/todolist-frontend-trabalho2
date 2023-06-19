function CampoEntrada({id, label, tipo, name, value, onchange, requerido
                        , readonly, checked, msgvalido, msginvalido}) {
    return (
        <div className ="form-check form-check-inline">
            <input className="form-check-input"
                type={tipo}
                id={id}
                name={name}
                value={value}
                onChange={onchange}
                required={requerido}
                readOnly={readonly}
                checked = {checked} />

            <label htmlFor={id} className="form-check-label">{label}</label>

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