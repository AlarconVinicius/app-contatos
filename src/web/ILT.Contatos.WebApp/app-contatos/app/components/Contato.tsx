import { FiEdit, FiTrash } from "react-icons/fi";
import { IViewContato } from "../models/contato";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { TUpdContatoSchema, updContatoSchema } from "../lib/ContatoTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import ContatoService from "../services/contato-service";
import { useEffect, useState } from "react";

interface ContatoProps {
    index: number,
    contato: IViewContato;
}

const Contato: React.FC<ContatoProps> = ({index, contato}) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [contatoAtual, setContatoAtual] = useState<IViewContato | null>(null);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<TUpdContatoSchema>({
        resolver: zodResolver(updContatoSchema),
    });
    useEffect(() => {
        if (contatoAtual) {
            setValue("id", contatoAtual.id);
            setValue("nome", contatoAtual.nome);
            setValue("email", contatoAtual.email);
        }
    }, [contatoAtual, setValue]);
    const handleOpenModalEdit = () => {
        setContatoAtual(contato);
        setOpenModalEdit(true);
    };
    const handleOpenModalDelete = () => {
        setContatoAtual(contato);
        setOpenModalDeleted(true);
    };
    const onEditSubmit = async (data: TUpdContatoSchema) => {
        try {
            await ContatoService().updContato(data.id, { id: data.id, nome: data.nome, email: data.email });
            setOpenModalEdit(false);
            reset();
            window.location.href = '/';
        } catch (error) {
        console.error('Erro ao editar contato:', error);
        }
    }
    const onDeleteSubmit = async (id: string) => {
        try {
            await ContatoService().deleteContato(id);
            setOpenModalDeleted(false);
            reset();
            window.location.href = '/';
        } catch (error) {
        console.error('Erro ao deletar contato:', error);
        }
    }
  return (
    <tr key={contato.id}>
        <th>{index + 1}</th>
        <th className='w-50'>{contato.nome}</th>
        <th className='w-50'>{contato.email}</th>
        <th className='w-50'>{new Date(contato.dataCadastro).toLocaleDateString('pt-BR')}</th>
        <th className='flex gap-5'>
            <FiEdit 
                onClick={handleOpenModalEdit}
                cursor={ "pointer" } 
                className="text-yellow-500" size={22} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmit(onEditSubmit)}>
                        <input type="hidden" {...register('id')} />
                        <div className="space-y-12">
                            <div className="pb-3">
                                <h3 className='font-bold text-lg'>Atualizar Contato: {contato.nome} </h3>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-12">
                                        <label className="block text-sm text-start font-medium leading-6 text-gray-900">
                                            Nome
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register('nome')}
                                                type="text"
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Nome"
                                            />
                                            {errors.nome && (
                                                <p className="text-red-500">{`${errors.nome.message}`}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12">
                                        <label htmlFor="email" className="block text-sm text-start font-medium leading-6 text-gray-900">
                                            E-mail
                                        </label>
                                        <div className="mt-2">
                                            <input    
                                                {...register('email')}
                                                type="text"
                                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="E-mail"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500">{`${errors.email.message}`}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancelar
                            </button> */}
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className=" disabled:bg-gray-500 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </Modal>
                <FiTrash 
                onClick={handleOpenModalDelete}
                cursor={ "pointer" } 
                className="text-red-500" size={22} />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className='text-lg'>
                        Você tem certeza que deseja deletar o contato: {contato.nome}?
                    </h3>
                    <div className='modal-action'>
                        <button onClick={() => onDeleteSubmit(contato.id)} className='btn'>
                        Confirmar
                        </button>
                    </div>
                </Modal>
        </th>
    </tr>
  );
};

export default Contato;