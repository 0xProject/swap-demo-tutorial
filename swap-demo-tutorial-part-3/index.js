// index.js
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

function openModal(){
  document.getElementById("token_modal").style.display = "block";
}

function closeModal(){
document.getElementById("token_modal").style.display = "none";
}

document.getElementById("login_button").onclick = connect;
document.getElementById("from_token_select").onclick = openModal;
document.getElementById("modal_close").onclick = closeModal;