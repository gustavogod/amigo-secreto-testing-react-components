import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes'
import ListaParticipantes from './ListaParticipantes'

jest.mock('../../state/hook/useListaDeParticipantes', () => {
  // Quando alguém quiser essa lista de participantes, então vamos retornar o hook, que será um mock do jest
  // E esse hook mockado deve agir como uma função
  return {
    useListaDeParticipantes: jest.fn()
  }
})

describe('uma lista vazia de participantes', () => {
  //O que vai fazer antes de inicar a test suite
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('deve ser renderizada sem elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )
  
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(0)
  })
})

describe('uma lista preenchida de participantes', () => {
  const participantes = ['Ana', 'Catarina']
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test('deve ser renderizada com elementos', () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    )
  
    const itens = screen.queryAllByRole('listitem')
    expect(itens).toHaveLength(participantes.length)
  })
})