/* ---------- Formulário de contato ---------- */
  const formContato = document.getElementById('formContato');
  const mensagemModal = document.getElementById('mensagemModal');
  const mensagemContent = document.getElementById('mensagemContent');
  const fecharMensagem = document.getElementById('fecharMensagem');

  if (formContato) {
    formContato.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nomeContato').value.trim();
      const email = document.getElementById('emailContato').value.trim();
      const mensagem = document.getElementById('mensagemContato').value.trim();

      if (!nome || !email || !mensagem) {
        mensagemContent.innerHTML = '<p>Preencha todos os campos do formulário de contato.</p>';
        mensagemModal.classList.remove('success');
        mensagemModal.classList.add('danger');
        mensagemModal.showModal();
        return;
      }

      mensagemContent.innerHTML = '<p>Mensagem enviada com sucesso. Obrigado!</p>';
      mensagemModal.classList.remove('danger');
      mensagemModal.classList.add('success');
      mensagemModal.showModal();
      formContato.reset();
    });
  }

  if (fecharMensagem) {
    fecharMensagem.addEventListener('click', () => {
      mensagemModal.close();
    });
  }
