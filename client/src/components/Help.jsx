import React, { useState } from 'react';
import emailjs from '@emailjs/browser'

function Help() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      alert("Preencha todos os campos");
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email
    };

    emailjs
      .send("service_rnl5db4", "template_a3rzo5v", templateParams, "UOhtQUrHErbS3AZJV")
      .then(
        (response) => {
          console.log("EMAIL ENVIADO", response.status, response.text);
          setName('');
          setEmail('');
          setMessage('');
        },
        (err) => {
          console.log("ERRO: ", err);
        }
      );
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-gray-900 text-white p-14">
      <h1 className="mb-14"> {/* Reutilizei as margens aqui para manter a separação */}
        <p className="text-2xl font-bold">
          Para maiores dúvidas envie-nos uma mensagem.
        </p>
      </h1>

      <form className="max-w-md w-full flex flex-col">
        <input
          className="mb-14 h-9 rounded-md border-0 p-2 bg-gray-800 text-white"
          type="text"
          placeholder="Digite seu nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <input
          className="mb-14 h-9 rounded-md border-0 p-2 bg-gray-800 text-white"
          type="text"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <textarea
          className="mb-14 h-24 rounded-md border-0 p-2 bg-gray-800 text-white resize-none"
          placeholder="Digite sua mensagem..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <input
          className="h-9 rounded-md border-0 cursor-pointer bg-blue-500 text-white text-xl transition transform duration-800 hover:bg-blue-700 hover:scale-101"
          type="submit"
          value="Enviar"
        />
      </form>
    </div>
  );
}

export default Help;
