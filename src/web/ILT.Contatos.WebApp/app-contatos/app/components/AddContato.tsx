'use client'
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TAddContatoSchema, addContatoSchema } from "../lib/ContatoTypes";
import ContatoService from "../services/contato-service";


const AddContato = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TAddContatoSchema>({
        resolver: zodResolver(addContatoSchema),
    });
    const onSubmit = async (data: TAddContatoSchema) => {
        try {
            await ContatoService().addContato({ nome: data.nome, email: data.email });
            setModalOpen(false);
            reset();
            window.location.href = '/';
        } catch (error) {
        console.error('Erro ao adicionar contato:', error);
        }
    }
    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className="btn btn-primary w-full text-white"
            >
                Adicionar Contato <AiOutlinePlus className='ml-2 text-white' size={18} />
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="pb-3">
                            <h3 className='font-bold text-lg'>Adicionar Contato</h3>
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
                            Adicionar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default AddContato;