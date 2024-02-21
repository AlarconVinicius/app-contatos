import AddContato from "./components/AddContato";
import ListContato from "./components/ListContato";
import ContatoService from "./services/contato-service";

export default async function Home() {
  const contatos = await ContatoService().getAllContatos();
  return (
    <main className='max-w-4xl mx-auto mt-4'>
    <div className='text-center my-5 flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>App Contatos</h1>
      <AddContato />
    </div>
    <ListContato contatos={contatos}/>
  </main>
  );
}
