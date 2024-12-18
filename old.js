
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	//Create a text label and add it to layout.
	var save = "test" 
	save = JSON.parse(app.ReadFile("save.json" ))
	txt = app.CreateText( "GDT save editor" )
	txt.SetTextSize( 32 )
	lay.AddChild( txt )
	
	var debug = app.CreateTextEdit( JSON.stringify(save.company.staff[0])  )
	//lay.AddChild(debug)
	
	var moneyText = app.CreateText( "Money:" )
	lay.AddChild(moneyText)
	var money = app.CreateTextEdit( save.company.cash )
	lay.AddChild( money )
	var researchText = app.CreateText( "Research:" )
	lay.AddChild(researchText)
	var research = app.CreateTextEdit( save.company.researchPoints )
	lay.AddChild( research )
	
 var staff = []

	var staffLay = app.CreateLayout( "Linear", "FillX,Wrap" )

	for(let i = 0;i<save.company.staff.length;i++){
		var personLay = app.CreateLayout("Linear", "")
		staffLay.AddChild(personLay)
	  var person = save.company.staff[i]
	  var personObj = {}
	  
	  personObj.name = app.CreateText(person.name)
	  personObj.name.SetTextSize( 24 )
	  personLay.AddChild(personObj.name)
	  
	  personObj.researchText = app.CreateText("Research Points:")
	  personLay.AddChild(personObj.researchText)
	  personObj.research = app.CreateTextEdit( person.researchF*500)
	  personLay.AddChild( personObj.research )
	  
	  personObj.techText = app.CreateText("Tech Points:")
	  personLay.AddChild(personObj.techText)
	  personObj.tech = app.CreateTextEdit( person.tF*500 )
	  personLay.AddChild( personObj.tech )
	  
	  personObj.desText = app.CreateText("Design Points:")
	  personLay.AddChild(personObj.desText)
	  personObj.des = app.CreateTextEdit( person.dF*500 )
	  personLay.AddChild( personObj.des )
	  
	  personObj.speedText = app.CreateText("Speed:")
	  personLay.AddChild(personObj.speedText)
	  personObj.speed = app.CreateTextEdit( person.speedF*500 )
	  personLay.AddChild( personObj.speed )
	  
	  
	  
	  
	  
	  staff.push(personObj)
	  
	}
	lay.AddChild(staffLay)
	
  var saveChanges = app.CreateButton( "Save changes" )
  lay.AddChild(saveChanges)
  saveChanges.SetOnTouch(saveBtn)
  function saveBtn(){
    save.company.cash = money.GetText()
    save.company.researchPoints = research.GetText()
    
    for(let i = 0;i<staff.length;i++){
      save.company.staff[i].researchF = staff[i].research.GetText() / 500
      save.company.staff[i].tF = staff[i].tech.GetText() / 500
      save.company.staff[i].dF = staff[i].des.GetText() / 500
      save.company.staff[i].speedF = staff[i].speed.GetText() / 500
    }
    
    
    app.WriteFile( "modded_save.json",JSON.stringify(save) )
   
    app.ShowPopup( "Saved" )
  }
  
	

	
	//Add layout to app.	
	app.AddLayout( lay )
}