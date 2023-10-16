import React from "react";
import { JobImg } from "../assets";
import Accordion from "../components/Accordion";
import Help from "../components/Help";

const accordionData = [
  {
    title: "Você teve problema em se cadastrar?",
    content: "Confira se você não tem uma conta cadastrada com esse email. Verifique se os campos estão corretamente preenchidos. Tente usar outro email caso o problema persista e contate o nosso serviço online.",
  },
  {
    title: "Você teve algum problema com a empresa?",
    content: "Nós não nos responsabilizamos por qualquer conflito entre a empresa e o cliente. Exemplos: Problema de pagamento, demissão por justa causa, conflitos internos. Em caso de dúvida maior, use o serviço online.",
  },
  {
    title: "Você está tendo dúvidas em como contatar a empresa?",
    content: "A empresa não está retornando o seu contato. A empresa pode ter endereçado o contato dela incorretamente. Verifique se você digitou algum número ou letra errados e confira se estão corretos. Caso não seja nenhuma dessas opções, contate o nosso serviço online.",
  },
  {
    title: "Você está tendo alguma dúvida ao cadastrar uma vaga?",
    content: "Confira se você preencheu todos os campos corretamente. Verifique se você está logado com uma conta empresarial. Caso nenhuma dessas situações se aplique a você, contate o nosso serviço online.",
  },
];
const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 '>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <h1 className='text-3xl text-blue-600 font-bold mb-5'>About Us</h1>
          <p className='text-justify leading-7'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[300px]' />
      </div>

      <div className='leading-8 px-5 text-justify'>
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div>
      <h1 className="text-4xl font-bold text-center mt-20 mb-40">Perguntas Frequentes</h1>
      <div className="duvidas">
        <Accordion sections={accordionData} />
      </div>
      <Help/>
    </div>
    </div>
  );
};

export default About;
