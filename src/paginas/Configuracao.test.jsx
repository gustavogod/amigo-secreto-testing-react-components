import { render } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import Configuracao from "./Configuracao"

const mockDeNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockDeNavegacao
  }
})

describe('a pagina de configuração', () => {

  // Quero testar apenas a renderização da página 
  test('deve ser renderizada corretamente', () => {
    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>
    )
    
    // Tirar uma "foto" da renderização pra ver se é sempre senderizado da mesma forma
    // Sempre que um teste de snapshot é rodado, um snapshot é tirado e guardado na pasta __snapshots__
    // Toda vez que o teste é rodado novamente é comparado o snapshot novo com o antigo
    expect(container).toMatchSnapshot()
  })
})