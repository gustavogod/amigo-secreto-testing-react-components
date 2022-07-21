import Formulario from "./Formulario"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"

describe('o comportamento do Formulario.tsx', () => {
  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
    // encontrar o input no DOM
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    // encontrar o botão
    const botao = screen.getByRole('button')
    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument()
    // garantir que o botão esteja desabilitado 
    expect(botao).toBeDisabled()
  })
  
  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
  
    // inserir valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
  
    // clicar no botão de submeter
    fireEvent.click(botao)
  
    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus()
    // garantir que o input não tenha um valor
    expect(input).toHaveValue('')
  })
  
  test('nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')  
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
  
    fireEvent.click(botao)
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
  
    fireEvent.click(botao)
  
    const mensagemDeErro = screen.getByRole('alert')
  
    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
  })
  
  test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers() // Simula a execução de qualquer timer utilizado no javascript
  
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    )
  
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')  
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
  
    fireEvent.click(botao)
  
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
  
    fireEvent.click(botao)
    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()
  
    // Têm que usar act quando vai disparar eventos que atualizam o estado da aplicação
    // Sem o act o teste pode até passar, mas vai disparar mensagem de erro durante a execução
    act(() => {
      // espera N segundos
      jest.runAllTimers() // Não vai esperar realmente, mas o que tiver no javascript para contagem de tempo, será executado
    })
  
    // Se uso getByRole e não acho nada, é disparada uma excessão
    // Em casos onde está ok o elemento não estar presente, usa-se queryByRole
    mensagemDeErro = screen.queryByRole('alert')
  })
})
