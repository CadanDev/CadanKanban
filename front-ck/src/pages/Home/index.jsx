import axios from 'axios';
import 'bootstrap';
import { useEffect, useState } from 'react';
import './styles.css';

const Home = (props, ref) => {
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState([]);
    const [dadosOriginal, setDadosOriginal] = useState([]);
    const columns = [
        {
            col: 'feito',
            header: 'Feito',
            tipoFiltro: 'selecionar',
            filter: true
        },
        {
            col: 'fazendo',
            header: 'Fazendo',
            tipoFiltro: 'selecionar',
            filter: true
        },
        {
            col: 'etapa',
            header: 'Etapa',
            tipoFiltro: 'selecionar',
            filter: true
        },
        {
            col: 'modulo',
            header: 'Módulo',
            tipoFiltro: 'selecionar',
            filter: true
        },
        {
            col: 'titulo',
            header: 'Titulo',
            tipoFiltro: 'contem',
            filter: true
        },
        {
            col: 'tarefa',
            header: 'Tarefa',
            tipoFiltro: 'contem',
            filter: true
        },
        {
            col: 'reuniao',
            header: 'Reunião',
            tipoFiltro: 'selecionar',
            filter: true
        }
    ];

    const carregaCSV = async () => {
        function parseCsv(csvText) {
            // Substituir ';' por '\n'
            //csvText = csvText.replace(/;/g, '\n');

            // Dividir o texto CSV em linhas, tratando '\r' opcionalmente
            const rows = csvText.split(/\r?\n/);

            // Extrair cabeçalhos
            const headers = rows[0].split(',');

            // Inicializar array para armazenar os dados
            const data = [];

            // Iterar sobre as linhas de dados
            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(','); // Dividir a linha em valores
                const rowObject = {};

                // Mapear valores para os cabeçalhos correspondentes
                for (let j = 0; j < headers.length; j++) {
                    let header;
                    switch (headers[j]) {
                        case '✅':
                            header = 'feito';
                            break;
                        case '📈':
                            header = 'fazendo';
                            break;
                        case 'Etapa':
                            header = 'etapa';
                            break;
                        case 'Módulo':
                            header = 'modulo';
                            break;
                        case 'Tarefa':
                            header = 'tarefa';
                            break;
                        case 'Reunião':
                            header = 'reuniao';
                            break;
                        case 'Titulo':
                            header = 'titulo';
                            break;
                        default:
                            header = headers[j];
                    }
                    rowObject[header] = rowData[j];
                }
                data.push(rowObject);
            }

            return data;
        }
        const csvUrl = '';
        await axios.get(csvUrl).then(async ({ data }) => {
            const csv = parseCsv(data);
            console.log(csv);
            setDados(csv);
            setDadosOriginal(csv);
        }).catch((e) => {
            console.error(e);
        }).finally(() => {
            setLoading(false);
        })
    }

    const filtrar = (element) => {
        let key = element.name
        let filtro = element.value;
        let type = columns.filter((e) => e.col === key)[0].tipoFiltro;
        let newDados = [];
        dadosOriginal.forEach((row) => {
            let valid = true;
            if (filtro) {
                switch (type) {
                    case ('igual'):
                        valid = row[key] === filtro;
                        break;
                    case ('selecionar'):
                        valid = row[key] === filtro;
                        break;
                    case ('diferente'):
                        valid = row[key] !== filtro;
                        break;
                    case ('contem'):
                        valid = String(row[key]).toUpperCase().includes(String(filtro).toUpperCase());
                        break;
                    default:
                        valid = true;
                        break;
                }
            } else {
                valid = true;
            }
            if (valid) {
                newDados.push(row);
            }
        });
        setDados(newDados);
    }
    const limparFiltro = (id) => {
        console.log(id);
        let element = document.getElementById(id);
        console.log(element);
        element.value = '';
        filtrar(element);
    }
    useEffect(() => {
        if (!loading) {
            setLoading(true);
            carregaCSV();
        }
    }, []);
    return (
        <div className="table-wrapper">
            <script src='./styles.js'></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" integrity="sha256-2TnSHycBDAm2wpZmgdi0z81kykGPJAkiUY+Wf97RbvY=" crossOrigin="anonymous" />
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <h2 className="table-name m-auto fs-4 text pt-2 text-center">Tabela das Tarefas</h2>
                    <br></br>
                    {loading ?
                        'Carregando...'
                        :
                        <table className='table cadan-table'>
                            <thead>
                                <tr>
                                    {columns.map((col, index) => {
                                        let selectValue = [];
                                        if (col.tipoFiltro === 'selecionar') {
                                            dadosOriginal.forEach((row) => {
                                                let value = row[col.col];
                                                if (value !== '') {
                                                    let test = selectValue.find((e) => e.value === value);
                                                    if (!test) {
                                                        let label = value;
                                                        selectValue.push({ value: value, label: label });
                                                    }
                                                }
                                            })
                                        }
                                        return (
                                            <th>
                                                {col.header}
                                                {col.filter !== undefined && col.filter === true ?
                                                    <div name='filter-div' className='input-group'>
                                                        {col.tipoFiltro === 'selecionar' ?
                                                            <select className="form-select" onChange={(e) => { filtrar(e.target); }} key={col.col + '-filter'} id={'input-filter-' + col.col} name={col.col} aria-describedby={'addon-filter-' + index} >
                                                                <option value="" data-default disabled selected></option>
                                                                {selectValue.map((sv) => {
                                                                    return <option value={sv.value}>{sv.label}</option>
                                                                })}
                                                            </select>
                                                            :
                                                            <>
                                                                <input onChange={(e) => { filtrar(e.target); }} className='form-control' key={col.col + '-filter'} id={'input-filter-' + col.col} name={col.col} aria-describedby={'addon-filter-' + index} />
                                                            </>
                                                        }
                                                        <button className='input-group-text' type='button' id={'filter-' + col.col} onClick={(e) => limparFiltro('input-' + e.target.id)}>L</button>
                                                    </div>
                                                    : ''
                                                }
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {dados.map((row) => {
                                    return (
                                        <tr>
                                            {columns.map((col, index) => {
                                                return (
                                                    <td key={index}>{row[col.col].replace(';', '\n')}</td>
                                                );
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <h2 className="table-name m-auto fs-4 text pt-2 text-center">Kambam</h2>
                    <div className='cadan-kambam'>
                        <div className='cadan-kambam-col' id='pendente'>
                            <h3>PENDENTE</h3>
                            {
                                dados.map((item) => {
                                    if (item.feito !== 'TRUE' && item.fazendo !== 'TRUE') {
                                        return (
                                            <div className='cadan-kambam-item'>
                                                <div className='cadan-header'>
                                                    <h4>{item.titulo}</h4>
                                                </div>
                                                <div className='cadan-content'>
                                                    <p>{item.tarefa}</p>
                                                </div>
                                                <div className='cadan-footer'>
                                                    {item.reuniao}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className='cadan-kambam-col' id='fazendo'>
                            <h3>FAZENDO</h3>
                            {
                                dados.map((item) => {
                                    if (item.feito !== 'TRUE' && item.fazendo === 'TRUE') {
                                        return (
                                            <div className='cadan-kambam-item'>
                                                <div className='cadan-header'>
                                                    <h4>{item.titulo}</h4>
                                                </div>
                                                <div className='cadan-content'>
                                                    <p>{item.tarefa}</p>
                                                </div>
                                                <div className='cadan-footer'>
                                                    {item.reuniao}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className='cadan-kambam-col' id='feito'>
                            <h3>FEITO</h3>
                            {
                                dados.map((item) => {
                                    if (item.fazendo === 'TRUE') {
                                        return (
                                            <div className='cadan-kambam-item'>
                                                <div className='cadan-header'>
                                                    <h4>{item.titulo}</h4>
                                                </div>
                                                <div className='cadan-content'>
                                                    <p>{item.tarefa}</p>
                                                </div>
                                                <div className='cadan-footer'>
                                                    {item.reuniao}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                    <h2 className="table-name m-auto fs-4 text pt-2 text-center">Outro</h2>
                </div>
            </div>
        </div>
    );
}
export default Home;