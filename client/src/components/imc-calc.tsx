'use client'
import React from 'react'

export default function ImcCalc() {
  const [altura, setAltura] = React.useState(0)
  const [peso, setPeso] = React.useState(0)
  const [imc, setImc] = React.useState(0)


  const handleClick = () => {
    const alturaMetro = Number(altura) / 100;
    const total = (Number(peso) / (alturaMetro * alturaMetro)).toFixed(2);
    setImc(total);
  }
  return (
    <div>
      <input type="number" name="Peso" placeholder="Peso" onChange={(e) => setPeso(e.target.value)} id="" />
      <input type="number" name="Altura" placeholder="Altura" onChange={(e) => setAltura(e.target.value)} id="" />
      <button onClick={() => handleClick()}>Ok!</button>
      <p>IMC: {imc}</p>
    </div>
  )
}
