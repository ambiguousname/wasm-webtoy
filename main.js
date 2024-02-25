import * as cm from "./editor.js";


function resizeFromMouse(event) {
	console.log("A");
	console.log(event.clientX);
	document.getElementById("text").style.minWidth = event.clientX + "px";
}

window.onload = async function() {
	let game = document.getElementById("game");

	let resize = document.getElementById("resize");
	resize.addEventListener("mousedown", (e) => {
		e.preventDefault();
		document.addEventListener("mousemove", resizeFromMouse);
		document.addEventListener("mouseup", () => document.removeEventListener("mousemove", resizeFromMouse))
	});

	function compileWAT(wabt, text) {
		if (game.src === "about:blank") {
			return;
		}
		try {
			let result = wabt.parseWat("", text);
			let bin = result.toBinary({
				// In case anyone in the console wants to pause and debug:
				write_debug_names: true,
			});

			if (bin.log !== "") {
				alert(bin.log);
				console.error(bin.log);
			}

			let wasm4Cart = game.contentDocument.getElementById("wasm4-cart-json");
			let json = `{"WASM4_CART":"${encode(bin.buffer)}","WASM4_CART_SIZE":${bin.buffer.length}}`;
			wasm4Cart.innerText = json;
			let app = new game.contentWindow.wasm4.App();
			game.contentDocument.body.appendChild(app);
		} catch (error) {
			alert(error);
			console.error(error);
			cm.setEditable(cm.editor, true);
		}
	}

	let wabt = await new WabtModule();
	cm.setEditable(cm.editor, false);
	
	compileWAT(wabt, cm.editor.state.doc.toString());

	document.getElementById("compile").onclick = function() {
		cm.setEditable(cm.editor, false);
		game.src = "player.html";
		game.onload = function() {
			compileWAT(wabt, cm.editor.state.doc.toString());
		}
	}

	document.getElementById("stop").onclick = function() {
		game.src = "about:blank"; 
		cm.setEditable(cm.editor, true);
	}
}