
const directions = [
    "None", "North", "South", "East", "West"
];




let sign = new Sign("green");
let typeOfSign = "Guide Sign";

const updateSign = function(){
    sign.setSignColour(document.querySelector("#signcolour").value.toLowerCase());
}

/**
	 * Creates and appends an option element to a given Select element.
	 * @param {Element} selectElmt - Select element to be appended to.
	 * @param {string} value - Value to be held by the option.
	 * @param {boolean} [selected=false] - Whether or not the new option should be auto-selected.
	 * @param {string} [text] - Display text for the option.
	 */
const appendOption = function(selectElmt, value, {selected = false} = {}, text) {
    if (!text) {
        text = value;
    }
    const optionElmt = document.createElement("option");
    optionElmt.value = value;
    optionElmt.selected = selected;
    optionElmt.appendChild(document.createTextNode(text));
    selectElmt.appendChild(optionElmt);
};

const shieldTypeText = ShieldType;

const changeTypeOfSign = function(){
    sign = new Sign(document.querySelector("#signcolour").value.toLowerCase());
    sign.build();

    const value = document.querySelector("#signtype").value;

    if (value === "Guide Sign"){
        document.querySelector("div.controlcitiesform").classList.add("active");
        document.querySelector("div.distancesform").classList.remove("active");
    }else if (value === "Distance Sign"){
        document.querySelector("div.controlcitiesform").classList.remove("active");
        document.querySelector("div.distancesform").classList.add("active");
    }

    typeOfSign = value;

    updateForm();
}

const addShield = function(){
    sign.addShield(new Shield(ShieldType.Motorway, "1", ""));
    updateForm();
    sign.build();
}

const changeColour = function(){
    const signColour = document.querySelector("#signcolour").value.toLowerCase();
    sign.setSignColour(signColour);
    sign.build();
    updateForm();
}

const changeShield = function(){

    const shieldt = document.querySelector("#shield"+this.dataset.shieldIndex+"_shieldType").value;
    const routen = document.querySelector("#shield"+this.dataset.shieldIndex+"_routeNumber").value;
    const bannert = document.querySelector("#shield"+this.dataset.shieldIndex+"_bannerType").value;

    const shield = sign.getShields()[this.dataset.shieldIndex];
    shield.setType(shieldt);
    shield.setNumber(routen);
    shield.setDirection(bannert);
    sign.build();
}

const deleteShield = function(){
    sign.getShields().splice(this.dataset.shieldIndex, 1);
    sign.build();
    updateForm();
}

const updateCC = function(){
    sign.controlCities = [];

    for (let i = 0; i < 4; i++){
        const ccinput = document.querySelector(`#ccinput${i+1}`);
        if (ccinput.value !== "")
            sign.addControlCity(new ControlCity(ccinput.value));
    }

    const bottomText = document.querySelector("#bottomText").value;
    console.log(bottomText);
    if (bottomText !== ""){
        sign.addControlCity(new BottomText(bottomText));
    }

    sign.build();
}

const changeShieldPos = function(){
    const pos = document.querySelector("#shieldPosition").value.toLowerCase();

    sign.shieldPos = pos;
    sign.build();
}

const updateDistances = function(){
    sign.controlCities = [];

    for (let i = 0; i < 4; i++){
        const dcityinput = document.querySelector(`#dcityinput${i+1}`);
        const ddinput = document.querySelector(`#ddinput${i+1}`);

        const dunitsinput = document.querySelector(`#dunitsinput${i+1}`);
        if (dcityinput.value !== "")
            sign.addControlCity(new DistanceToCity(dcityinput.value, ddinput.value, dunitsinput.value));
    }
    sign.build();
}

const addRoadName = function() {
    const roadname = document.querySelector("#roadNameInput").value;

    if (roadname !== null && roadname !== ""){
        sign.addName(roadname);
    }

    document.querySelector("#roadNameInput").value = "";
    updateForm();
    sign.build();
}

const removeRoadName = function() {
    sign.removeName(this.dataset.signName);
    sign.build();
    updateForm();
}

const downloadSign = function() {
    setTimeout(() => {
        domtoimage.toPng(document.querySelector("div.signcontainer")).then(dataUrl => {
            const l = document.createElement("a");
            l.href = dataUrl;
            l.download = "sign.png";
            l.style.visibility = "hidden";
            document.body.appendChild(l);
            l.click();
            document.body.removeChild(l);
        })
    }, 100);
}
const downloadExitTab = function() {
    setTimeout(() => {
        domtoimage.toPng(document.querySelector("div.exitTab")).then(dataUrl => {
            const l = document.createElement("a");
            l.href = dataUrl;
            l.download = "exit.png";
            l.style.visibility = "hidden";
            document.body.appendChild(l);
            l.click();
            document.body.removeChild(l);
        })
    }, 100);
}

const changeArrows = function(){
    const position = document.querySelector("#signPosition").value.toLowerCase();
    const arrowType = ArrowOptions[document.querySelector("#arrowType").value];
    const exitOnly = document.querySelector("#isExitOnly").checked;
    const numArrows = document.querySelector("#guideArrowLanes").value;
    const text = document.querySelector("#exitTextbox").value;

    console.log(`Change Arrows: ${position} ${arrowType} ${exitOnly} ${numArrows} ${text}`);

    sign.arrows = new Arrows();
    if (arrowType !== ""){
        sign.getArrows().setArrowSide(position);
        if (position === "bottom"){
            for (let i = 0; i < numArrows; i++){
                sign.getArrows().addArrow(arrowType);
            }
        }else sign.getArrows().setArrow(arrowType);
        sign.getArrows().setExitText(text);
        sign.getArrows().setExitOnly(exitOnly);
    }
    sign.build();
}

const changeExitOnlyStatus = function(){

}

const updateExitTab = function(){
    const exitNum = document.querySelector("#exitNumber").value;
    const seperateSign = document.querySelector("#seperateExitTab").checked;
    sign.getExitTab().nzStyle = seperateSign;

    if (exitNum === null || exitNum === "")
        sign.getExitTab().setRender(false);
    else
        sign.getExitTab().setExitNumber(exitNum);

    sign.build();
}

const updateForm = function(){

    const shieldTable = document.querySelector("div.shieldtable");
    while(shieldTable.firstChild) shieldTable.removeChild(shieldTable.firstChild);

    for (let i = 0; i < sign.getShields().length; i++){
        const shield = sign.getShields()[i];
        const divcol = document.createElement("div");
        divcol.className = "shieldcol";

        const shieldSelect = document.createElement("select");
        shieldSelect.id = "shield"+i+"_shieldType";
        shieldSelect.dataset.shieldIndex = i;
        shieldSelect.onchange = changeShield;
        for(let type in shieldTypeText)
            appendOption(shieldSelect, shieldTypeText[type], {selected : (shieldTypeText[type].toLowerCase() == shield.getType().toLowerCase() || (shield.getDirection() == "" && shieldTypeText[type] == "None"))}, type);
        divcol.appendChild(shieldSelect);

        const routenumber = document.createElement("input");
        routenumber.type = "text";
        routenumber.placeholder = "00";
        routenumber.id = "shield"+i+"_routeNumber";
        routenumber.dataset.shieldIndex = i;
        routenumber.onblur = changeShield;
        routenumber.value = shield.getNumber();
        divcol.appendChild(routenumber);

        const dirselect = document.createElement("select");
        dirselect.id = "shield"+i+"_bannerType";
        dirselect.dataset.shieldIndex = i;
        dirselect.onchange = changeShield;
        for(let j = 0; j < directions.length; j++)
            appendOption(dirselect, directions[j], {selected : (directions[j].toLowerCase() == shield.getDirection().toLowerCase() || (shield.getDirection() == "" && directions[j] == "None"))});
        divcol.appendChild(dirselect);

        const delbtn = document.createElement("input");
        delbtn.type = "button";
        delbtn.value = "X";
        delbtn.dataset.shieldIndex = i;
        delbtn.onclick = deleteShield;
        delbtn.dataset.index = i;
        divcol.appendChild(delbtn);

        shieldTable.appendChild(divcol);
    }

    const roadNameCont = document.querySelector("div.roadNamesContainer");
    while(roadNameCont.firstChild) roadNameCont.removeChild(roadNameCont.firstChild);

    for (let i = 0; i < sign.getNames().length; i++){
        const btn = document.createElement("input");
        btn.type = "button";
        btn.value = `Remove ${sign.getNames()[i]}`;
        btn.dataset.signName = sign.getNames()[i];
        btn.onclick = removeRoadName;
        roadNameCont.appendChild(btn);
    }

    if (typeOfSign === "Guide Sign"){
        for (let i = 0; i < sign.getControlCities().length; i++){
            const ccinput = document.querySelector(`#ccinput${i+1}`);
            ccinput.value = sign.getControlCities()[i].getName();
        }
    }else if (typeOfSign === "Distance Sign"){
        for (let i = 0; i < sign.getControlCities().length && i < 4; i++){
            const dcityinput = document.querySelector(`#dcityinput${i+1}`);
            const ddinput = document.querySelector(`#ddinput${i+1}`);
            const dunitsinput = document.querySelector(`#dunitsinput${i+1}`);
            dcityinput.value = sign.getControlCities()[i].getName();
            ddinput.value = sign.getControlCities()[i].getDistance();
            dunitsinput.value = sign.getControlCities()[i].getUnits();
        }
    }

}


document.addEventListener("DOMContentLoaded", function() {
    sign.addControlCity(new ControlCity("New Sign"));
    sign.build();
    updateForm();
});