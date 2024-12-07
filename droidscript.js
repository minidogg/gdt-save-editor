const app = {}
let saveFile = "{}"

app.CreateLayout = ()=>{
	let lay = document.createElement("div")
	lay.AddChild = (child)=>{
		lay.appendChild(child)
	}
	return lay
}
app.AddLayout = (lay)=>{
	document.body.appendChild(lay)
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
app.CreateTextEdit = (property)=>{
	let textEdit = document.createElement("input")
	textEdit.value = property
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

app.WriteFile = (name, text)=>{
	var a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob([text], {type: 'text/plain'}));
	a.download = name;

	document.body.appendChild(a);
	a.click();

	document.body.removeChild(a);
}

app.ShowPopup = (text)=>{
	alert(text)
}

async function DroidScriptStart(){
	saveFile = await (await fetch("/save.json")).text()
	OnStart()
}