'use client'
import { useState } from "react";
import { IViewContato } from "../models/contato";
import Contato from "./Contato";
import SearchContato from "./SearchContato";

interface ListContatosProps {
  contatos: IViewContato[];
}

const ListContato: React.FC<ListContatosProps> = ({ contatos }) => {
  const [contatosData, setContatos] = useState<IViewContato[]>([]);

  const handleSearch = async (contatosData: IViewContato[]) => {
    setContatos(contatosData);
  };

  const contatosToShow = contatosData.length > 0 ? contatosData : contatos;

  return (
    <div>
      <SearchContato onSearch={handleSearch} />
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Data de Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contatosToShow.map((contato, index) => (
              <Contato key={contato.id} contato={contato} index={index}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListContato;