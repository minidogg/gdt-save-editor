const app = {}
let saveFile = "{}"
const containerEl = document.getElementById("container")

app.CreateLayout = (type, options)=>{
	let lay = document.createElement("div")
	lay.AddChild = (child)=>{
		lay.appendChild(child)
	}

	options.split(",").forEach(option=>{
		switch(option){
			case("FillXY"):
				lay.style.width = "100%"
				lay.style.height = "100%"
				break;
			case("Wrap"):
				lay.style.display = "flex"
				lay.style.flexWrap = "wrap"
				break;
			case("FillX"):
				lay.style.width = "100%"
				break;
		}
	})

	return lay
}
app.AddLayout = (lay)=>{
	containerEl.appendChild(lay)
}

app.ReadFile = (fileName)=>{
	return saveFile
}
app.CreateText = (textContent)=>{
	let text = document.createElement("p")
	text.textContent = textContent
	text.SetTextSize = (fontSize)=>{
		text.style.fontSize = fontSize+"px"
	}

	return text
}
app.CreateTextEdit = (initValue)=>{
	let textEdit = document.createElement("input")
	textEdit.value = initValue
	if(typeof(initValue)=="number")textEdit.type = "number"
	textEdit.addEventListener("change", (ev)=>{
		// property = textEdit.value
	})
	textEdit.GetText = ()=>{
		return textEdit.value
	}
	return textEdit
}
app.CreateButton = (textContent)=>{
	let button = document.createElement("button")
	button.textContent = textContent
	button.style.display = "block"
	button.SetOnTouch = (func)=>{
		button.addEventListener("click", ()=>{
			func()
		})
	}

	return button
}

let saveFileEl = document.getElementById("saveFile")

app.WriteFile = (name, text)=>{
	// var a = window.document.createElement('a');
	// a.href = window.URL.createObjectURL(new Blob([text], {type: 'text/plain'}));
	// a.download = name;

	// document.body.appendChild(a);
	// a.click();

	// document.body.removeChild(a);
	saveFileEl.value = text
}

app.ShowPopup = (text)=>{
	alert(text)
}

saveFileEl.addEventListener('change', ()=>{
	containerEl.innerHTML = ""
	saveFile = saveFileEl.value
	OnStart()
	console.log("refresh")
})
document.getElementById("copySave").addEventListener('click', ()=>{
	window.navigator.clipboard.writeText(saveFileEl.value)
})
document.getElementById("clearSave").addEventListener("click", ()=>{
containerEl.innerHTML = ""
  saveFileEl.value = ""
  OnStart()
})

async function DroidScriptStart(){
	saveFile = await (await fetch("/save.json")).text()
	saveFileEl.value = saveFile
	OnStart()
}