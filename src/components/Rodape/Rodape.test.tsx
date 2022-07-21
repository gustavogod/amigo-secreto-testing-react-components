import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../../state/hook/useListaDeParticipantes"
import Rodape from "./Rodape"

jest.mock('../../state/hook/useListaDeParticipantes', () => {
  // Quando alguém quiser essa lista de participantes, então vamos retornar o hook, que será um mock do jest
  // E esse hook mockado deve agir como uma função
  return {
    useListaDeParticipantes: jest.fn()
  }
})

//Declaro fora p depois pode verificar se o mock já foi chamado
const mockDeNavegacao = jest.fn()

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockDeNavegacao
  }
})

const mockSorteio = jest.fn()

jest.mock('../../state/hook/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio
  }
})

describe('quando não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')

    expect(botao).toBeDisabled()
  })
})

describe('quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'João'])
  })

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')

    expect(botao).not.toBeDisabled()
  })

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    )

    const botao = screen.getByRole('button')
    fireEvent.click(botao)

    expect(mockDeNavegacao).toHaveBeenCalledTimes(1)
    expect(mockDeNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)
  })
})