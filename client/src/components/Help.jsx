import React from 'react';

function Help() {
  return (
    <div className="flex items-center justify-center h-screen">
      <section className="bg-white max-w-3xl h-64 mt-10 mb-16 rounded-10px">
        <div className="container">
          <p className="ml-5 mt-5 mb-5 text-2xl font-bold">
            Para maiores dúvidas envie-nos uma mensagem.
          </p>

          <button
            className="flex justify-center items-center w-80 h-14 rounded-full border border-2bcae6 hover:border-2bcae8 bg-red-500 hover:bg-red-600 text-white ml-5 mb-5"
            onClick={() => {
              // Adicione a lógica do clique aqui
            }}
          >
            Fale conosco
          </button>
        </div>
      </section>
    </div>
  );
}

export default Help;
