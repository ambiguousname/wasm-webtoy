import * as cm from "./editor.js";


function resizeFromMouse(event) {
	document.getElementById("text").style.minWidth = (event.screenX) + "px";
}

window.onload = async function() {
	let game = document.getElementById("game");

	let resize = document.getElementById("resize");
	resize.addEventListener("mousedown", (e) => {
		e.preventDefault();
		
		function remove() {
			document.removeEventListener("mousemove", resizeFromMouse);
			game.contentWindow.removeEventListener("mousemove", resizeFromMouse);
		}

		document.addEventListener("mousemove", resizeFromMouse);
		game.contentWindow.addEventListener("mousemove", resizeFromMouse);
		document.addEventListener("mouseup", remove);
		game.contentWindow.addEventListener("mouseup", remove);
	});

	top.addEventListener("keydown", (e) => {
		e.stopPropagation();
	}, true);

	var app = null;
	function compileWAT(wabt, text) {
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
			if (app !== null) {
				game.contentDocument.body.innerHTML = "";
			}
			app = new game.contentWindow.wasm4.App();
			game.contentDocument.body.appendChild(app);
		} catch (error) {
			alert(error);
			console.error(error);
		}
	}

	let wabt = await new WabtModule();
	
	compileWAT(wabt, cm.editor.state.doc.toString());

	document.getElementById("compile").onclick = function() {
		game.src = "player.html";
		game.onload = function() {
			compileWAT(wabt, cm.editor.state.doc.toString());
		}
	}
}