// HEITOR SAULO DANTAS SANTOS

const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);


const row_1 = document.createElement('tr');

const heading_1 = document.createElement('th');
heading_1.innerHTML = "Codigo da matéria";

const heading_2 = document.createElement('th');
heading_2.innerHTML = "Periodo";

const heading_3 = document.createElement('th');
heading_3.innerHTML = "CH";

const heading_4 = document.createElement('th');
heading_4.innerHTML = "Frequência(%)";

const heading_5 = document.createElement('th');
heading_5.innerHTML = "Nota";

const formulario = document.querySelector(".form1")
formulario.addEventListener("submit", (event)=>{
    event.preventDefault();

    const {codigoMateria, periodo, frequencia, chMateria, nota} = event.target
    const rowMateriaNova = document.createElement('tr')


    const rowInformationCodigoMateria = document.createElement('td')
    rowInformationCodigoMateria.innerHTML = codigoMateria.value
    rowMateriaNova.appendChild(rowInformationCodigoMateria)

    const rowInformationPeriodo = document.createElement('td')
    rowInformationPeriodo.innerHTML = periodo.value
    rowMateriaNova.appendChild(rowInformationPeriodo)

    const rowInformationCargaHoraria = document.createElement('td')
    rowInformationCargaHoraria.innerHTML = chMateria.value
    rowMateriaNova.appendChild(rowInformationCargaHoraria)
    
    const rowInformationFrequencia = document.createElement('td')

    rowInformationFrequencia.innerHTML = frequencia.value
    rowMateriaNova.appendChild(rowInformationFrequencia)

    const rowInformationNota = document.createElement('td')

    rowInformationNota.innerHTML = nota.value
    rowMateriaNova.appendChild(rowInformationNota)
    
    document.getElementById('codigoMateria').value = ""
    document.getElementById('periodo').value = ""
    document.getElementById('chMateria').value = ""
    document.getElementById('frequencia').value = ""
    document.getElementById('nota').value = ""

    
    tbody.appendChild(rowMateriaNova)
    
}
)
//Criando funcoes 

//media ponderada
const mediaPonderada = (lista) =>{
    const listaMultiplicada = lista.map((element) => element.cargaHoraria*element.nota)
    const somaFinal = listaMultiplicada.reduce((acc, element) => acc+element, 0)
    if(isNaN(somaFinal)) return 0 
    else return somaFinal/somaCargaHoraria(lista)
}

//desvio padrao
const desvioPadraoF = (lista) =>{
    const tamanho = document.getElementsByTagName('tr').length - 3
    const somaNotas = lista.reduce((acc, element)=> acc + element.nota, 0)
    
    const mediaAritimetica = somaNotas/tamanho

    const diminuirComaNota = lista.map((element) => element.nota-mediaAritimetica)

    const aoQuadrado = diminuirComaNota.map((x) => x*x)
    
    const somaTudo = aoQuadrado.reduce((acc, element) => acc + element, 0)

    return Math.sqrt(somaTudo/tamanho)
}
//Funcoes media pondarada por diciplina
const filtrarMateriaParaMedia = (lista) =>{
    const eliminarNumero = (str) => str.replace(/[0-9]/g, '')
    const listaCodigo = lista.map((element)=>element.codigoMateria)
    const listaSemNum = listaCodigo.map((element)=> eliminarNumero(element))
    return [...new Set(listaSemNum)]

}
const mediaPonderadaPorDiciplina = (lista) => (n) => (array = []) =>{
    if(n==0){
        return array
    }
    else{
        const eliminarNumero = (str) => str.replace(/[0-9]/g, '')
        const listaFiltrada = lista.filter((element)=> eliminarNumero(element.codigoMateria) == filtrarMateriaParaMedia(lista)[n-1])
        const str = `${filtrarMateriaParaMedia(lista)[n-1]}: ${mediaPonderada(listaFiltrada)}`
        return mediaPonderadaPorDiciplina(lista)(n-1)([...array,str])
    }
}



//Soma Carga Horaria
const somaCargaHoraria = (lista) =>{
    return lista.reduce((acc,element)=>acc+element.cargaHoraria,0)
}

//Tempo de Curso
const tempoCurso = (lista) =>{
    const listaPeriodo = lista.map((element)=> element.periodo)
    const listaSemRepeticoesP = [...new Set(listaPeriodo)]

    return listaSemRepeticoesP.length
}

//Aprovados e Reprovados
const mostrarMaterias = (lista) =>{
    const listaCD = lista.map((element) => element.codigoMateria)
    const listaSemRepeticoes = [...new Set(listaCD)]

    if(listaSemRepeticoes.length == 0) return "Nenhuma diciplina"
    else return listaSemRepeticoes.join(',')
    
}

//Criar tabela com as funcoes
const btnED = document.querySelector("#btnED")
btnED.addEventListener("click", (event)=>{
    event.preventDefault();
    
    

    const quantidadeLinhas = document.getElementsByTagName('tr').length - 3
    
    const listaMaterias = acessaDadosTabela(quantidadeLinhas)()

    const listaMateriasAprovadas = listaMaterias.filter(({aprovado}) => aprovado == true)
    const listaMateriasReprovadas = listaMaterias.filter(({aprovado}) => aprovado == false)

    const somaTotalCH = somaCargaHoraria(listaMaterias)
    const finalAprovados = mostrarMaterias(listaMateriasAprovadas)
    const finalReprovados = mostrarMaterias(listaMateriasReprovadas)
    const mediaPonderadaF = mediaPonderada(listaMaterias)
    const desvioPadraoR = desvioPadraoF(listaMaterias)
    const tempoCursoF = tempoCurso(listaMaterias)
    const mediaPonderadaPorD_ = mediaPonderadaPorDiciplina(listaMaterias)(filtrarMateriaParaMedia(listaMaterias).length)()
    const tabelaR = document.querySelector("#tabelaResultados tbody tr")

    const somaCargaHorariaR = document.createElement('td')
    const aprovadosR = document.createElement('td')
    const reprovadosR = document.createElement('td')
    const mediaPonderadaR = document.createElement('td')
    const desvioPadrao = document.createElement('td')
    const mediaPonderadaPorD = document.createElement('td')
    const tempoCursoR = document.createElement('td')

    somaCargaHorariaR.innerText = somaTotalCH
    aprovadosR.innerText = finalAprovados
    reprovadosR.innerText = finalReprovados
    mediaPonderadaR.innerText = mediaPonderadaF
    desvioPadrao.innerText = desvioPadraoR
    mediaPonderadaPorD.innerHTML = mediaPonderadaPorD_
    tempoCursoR.innerText = tempoCursoF

    tabelaR.appendChild(somaCargaHorariaR)
    tabelaR.appendChild(aprovadosR)
    tabelaR.appendChild(reprovadosR)
    tabelaR.appendChild(mediaPonderadaR)
    tabelaR.appendChild(desvioPadrao)
    tabelaR.appendChild(mediaPonderadaPorD)
    tabelaR.appendChild(tempoCursoR)
})

const acessaDadosTabela = (n = 1) => (array = []) => {

    if(n == 0){
        return array
    }
    else{

        const dados = document.getElementsByTagName('tr')[n].outerText.split("\t")

        const object = {
            "codigoMateria":dados[0],
            "periodo": dados[1],
            "cargaHoraria": Number(dados[2]),
            "frequencia": Number(dados[3]),
            "nota": Number(dados[4]),
            "aprovado": (Number(dados[4]) >= 5 ? true: false)
        }
        return acessaDadosTabela(n-1)([...array,object])

    }

}

row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
thead.appendChild(row_1);


document.getElementById('table').appendChild(table);

