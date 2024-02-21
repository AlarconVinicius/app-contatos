import { z } from "zod";

export const addContatoSchema = z.object({
    nome: z.string().min(3, "O campo nome deve ter no mínimo 3 letras."),
    email: z.string().email("Formato de email inválido.")
});

export const updContatoSchema = z.object({
    id: z.string(),
    nome: z.string().min(3, "O campo nome deve ter no mínimo 3 letras."),
    email: z.string().email("Formato de email inválido.")
});
export type TAddContatoSchema = z.infer<typeof addContatoSchema>;
export type TUpdContatoSchema = z.infer<typeof updContatoSchema>;