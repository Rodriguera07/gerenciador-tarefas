const input = document.getElementById("tarefaInput");
const lista = document.getElementById("listaTarefas");
const progresso = document.getElementById("progresso");

document.getElementById("btnAdicionar").onclick = () => {
  const texto = input.value.trim();
  if (texto) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => {
      atualizarProgresso();
      salvarTarefas();
    };

    const span = document.createElement("span");
    span.textContent = texto;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.className = "remover";
    btnRemover.onclick = () => {
      lista.removeChild(li);
      atualizarProgresso();
      salvarTarefas();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemover);
    li.style.paddingLeft = "30px";
    lista.appendChild(li);
    input.value = "";
    atualizarProgresso();
    salvarTarefas();
  } else {
    alert("Digite uma tarefa antes de adicionar.");
  }
};

document.getElementById("btnRemoverTudo").onclick = () => {
  lista.innerHTML = "";
  atualizarProgresso();
  salvarTarefas();
};

function atualizarProgresso() {
  const tarefas = lista.querySelectorAll("li");
  const concluidas = lista.querySelectorAll("input[type=checkbox]:checked");
  progresso.textContent = `${concluidas.length}/${tarefas.length} tarefas concluídas`;

  tarefas.forEach(li => {
    const checkbox = li.querySelector("input[type=checkbox]");
    if (checkbox.checked) {
      li.classList.add("concluida");
    } else {
      li.classList.remove("concluida");
    }
  });
}

function salvarTarefas() {
  const tarefas = [];
  lista.querySelectorAll("li").forEach(li => {
    tarefas.push({
      texto: li.querySelector("span").textContent,
      concluida: li.querySelector("input[type=checkbox]").checked
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
  tarefas.forEach(tarefa => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.onchange = () => {
      atualizarProgresso();
      salvarTarefas();
    };

    const span = document.createElement("span");
    span.textContent = tarefa.texto;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "❌";
    btnRemover.className = "remover";
    btnRemover.onclick = () => {
      lista.removeChild(li);
      atualizarProgresso();
      salvarTarefas();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btnRemover);
    li.style.paddingLeft = "30px";
    lista.appendChild(li);
  });
  atualizarProgresso();
}

carregarTarefas();

// Alternar tema
const btnTema = document.getElementById("toggleTema");
function aplicarTema() {
  const tema = localStorage.getItem("tema") || "claro";
  if (tema === "escuro") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
aplicarTema();

btnTema.onclick = () => {
  const temaAtual = document.body.classList.contains("dark") ? "escuro" : "claro";
  const novoTema = temaAtual === "escuro" ? "claro" : "escuro";
  localStorage.setItem("tema", novoTema);
  aplicarTema();
};