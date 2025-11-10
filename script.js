
async function carregar() {
    const resp = await fetch(API_BASE + "/perfis");
    const dados = await resp.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    dados.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <b>${p.name}</b><br>
            Host: ${p.host}<br>
            Porta: ${p.port}<br>
            DB: ${p.database}<br>
            SSH: ${p.ssh_user}<br>
            <button onclick="remover(${i})">Remover</button>
        `;
        lista.appendChild(div);
    });
}

async function salvarPerfil() {
    const perfil = {
        name: document.getElementById("name").value,
        host: document.getElementById("host").value,
        port: document.getElementById("port").value,
        database: document.getElementById("database").value,
        user: document.getElementById("user").value,
        password: document.getElementById("password").value,
        ssh_user: document.getElementById("ssh_user").value,
        ssh_pass: document.getElementById("ssh_pass").value,
        is_posto: document.getElementById("is_posto").checked
    };

    await fetch(API_BASE + "/perfis", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(perfil)
    });

    alert("Perfil salvo!");
    carregar();
}

async function remover(index) {
    await fetch(API_BASE + "/perfis/" + index, { method: "DELETE" });
    carregar();
}
