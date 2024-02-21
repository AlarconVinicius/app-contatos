'use client'
import { useForm, FieldValues } from "react-hook-form";
import ContatoService from "../services/contato-service";
import { IViewContato } from "../models/contato";
interface SearchContatoProps {
    onSearch: (contatos: IViewContato[]) => void;
  }
  
  const SearchContato: React.FC<SearchContatoProps> = ({ onSearch }) => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>();
    const onSubmit = async (data: FieldValues) => {
        try {
            let queryString = "";
            queryString += `Nome=${data.nome}`;
            queryString += `&Email=${data.email}`;
            queryString += `&DataCadastroInicio=${data.dataCadastroInicio}`;
            queryString += `&DataCadastroFim=${data.dataCadastroFim}`;

            const response = await ContatoService().getContatosBySearch(queryString);
            reset();
            onSearch(response);
        } catch (error) {
            console.error("Erro ao pesquisar contatos:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
            <div className="border-b border-gray-900/10 py-5 mb-10">
                <h2 className="text-base font-semibold text-gray-900">Buscar por:</h2>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
                        <div className="sm:col-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('nome')}
                                    type="text"
                                    placeholder="Nome"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                E-mail
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('email')}
                                    type="text"
                                    placeholder="E-mail"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Data de Cadastro Início
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('dataCadastroInicio')}
                                    type="date"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-2">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Data de Cadastro Fim
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register('dataCadastroFim')}
                                    type="date"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-2">
                            <button
                                type="submit"
                                className="block mt-8 rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchContato;