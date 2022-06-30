// index.js
async function init() {
  await listAvailableTokens();
}

async function listAvailableTokens(){
  console.log("initializing");
  let response = await fetch('https://tokens.coingecko.com/uniswap/all.json');
  let tokenListJSON = await response.json();
  console.log("listing available tokens: ", tokenListJSON);
  tokens = tokenListJSON.tokens;
  console.log("tokens: ", tokens);

  // Create token list for modal
  let parent = document.getElementById("token_list");
  for (const i in tokens){
      // Token row in the modal token list
      let div = document.createElement("div");
      div.className = "token_row";
      let html = `
      <img class="token_list_img" src="${tokens[i].logoURI}">
        <span class="token_list_text">${tokens[i].symbol}</span>
        `;
      div.innerHTML = html;
      parent.appendChild(div);
  };
}

async function connect() {
  if (typeof window.ethereum !== "undefined") {
      try {
          console.log("connecting");
          await ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
          console.log(error);
      }
      document.getElementById("login_button").innerHTML = "Connected";
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      document.getElementById("swap_button").disabled = false;
      } else {
      document.getElementById("login_button").innerHTML =
          "Please install MetaMask";
      }
  }

  init();

  function openModal(){
      document.getElementById("token_modal").style.display = "block";
  }

  function closeModal(){
  document.getElementById("token_modal").style.display = "none";
  }

  document.getElementById("login_button").onclick = connect;
  document.getElementById("from_token_select").onclick = openModal;
  document.getElementById("modal_close").onclick = closeModal;