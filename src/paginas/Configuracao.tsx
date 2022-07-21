import Card from "../components/Card"
import Formulario from "../components/Formulario/Formulario"
import ListaParticipantes from "../components/ListaParticipantes/ListaParticipantes"
import Rodape from "../components/Rodape/Rodape"
import './Configuracao.css'

const Configuracao = () => {
  return (
    <Card>
      <section>
        <div className="header-text">
          <h2 className="text-comecar">Vamos começar!</h2>
        </div>
        <Formulario />
        <ListaParticipantes />
        <Rodape />
      </section>
    </Card>
  )
}

export default Configuracao