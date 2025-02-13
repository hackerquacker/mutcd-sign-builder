/* Add your shields to this object. Key is the text that will render in the selection box. Value is the name of your shield in the img/shields folder (without the .png) */
const ShieldType = {
    Motorway : "MWY",
    Highway : "HWY",
    Route : "RTE"
};


const ArrowOptions = {
    slideLeft : "h",
    slideRight : "H",
    upArrow : "5",      // Arrows Two = 4
    downArrow : "%",    // Arrows Two = %
    leftArrow : "j",
    leftUpArrow : "4",
    rightArrow : "J",
    rightUpArrow : "$",

    bigLeft : "1",      // Arrows Two
    bigRight : "!",     // Arrows Two

    laneLeftArrow : "0",
    laneLeftStraightArrow : "=",
    laneRightStraightArrow : "+",
    laneRightArrow : ")",
    laneClosedArrow : "P",
    None: ""
}

const ArrowSide = {
    bottom : "bottom",
    left : "left",
    right : "right"
}

/**
 * This class handles rendering of a shield.
 */
class Shield {

    /**
     * @param {ShieldType | string} type The type of shield. This is the name of the shield file (without .png)
     * @param {string | number} number The route number for this shield
     * @param {string} direction The Shield banner
     */
    constructor(type, number, direction) {
        this.type = type;
        this.number = number;
        this.direction = direction !== null ? direction : "";
    }

    /**
     * @returns The name of the shield file
     */
    getType(){
        return this.type;
    }

    /**
     * @param {ShieldType | string} type The name of the shield file (without .png)
     * @returns true if successful. If false, then the type parameter was null.
     */
    setType(type) {
        if (type === null)
            return false;

        this.type = type;
        return true;
    }

    /**
     * @returns The route number
     */
    getNumber(){
        return this.number;
    }

    /**
     * @param {string | number} num The route number
     * @returns true if successful. If false, then the num parameter was null.
     */
    setNumber(num){
        if (num === null)
            return false;

        this.number = num;
        return true;
    }

    /**
     * @returns The shield banner text
     */
    getDirection(){
        return this.direction;
    }

    /**
     * @param {string} dir The shield banner text. If this is 'None' or empty the banner text will be hidden.
     */
    setDirection(dir){
        if (dir === null || dir === "None"){
            this.direction = "";
            return;
        }

        this.direction = dir;
    }

    /**
     * Builds the structure of the shield element and returns the html object. This shouldn't be necessary to call outside
     * of this file.
     * @param {string} position The CSS class name for this shield group.
     * @returns HTML div element
     */
    build(position){
        const shieldGroup = document.createElement("div");
        shieldGroup.className = `shieldgroup`;
        if (position !== null && position !== "")
            shieldGroup.className += ` ${position}`;

        const shield = document.createElement("div");
        shield.className = `shield ${this.getType()}`;

        const img = document.createElement("img");
        img.src = "img/shields/" + this.getType() + ".png";

        const label = document.createElement("label");
        label.innerText = this.getNumber();
        if (this.getNumber().length > 2) label.className = "long";

        shield.appendChild(img);
        shield.appendChild(label);
        shieldGroup.appendChild(shield);

        if (this.getDirection() !== ""){
            const direction = document.createElement("label");
            direction.className = "direction";
            direction.innerText = this.getDirection();
            shieldGroup.appendChild(direction);
        }

        return shieldGroup;
    }
}

/**
 * Control City prototype object.
 */
class ControlCityProto {

    constructor(){
        this.name = "";
        this.distance = "";
        this.units = "";

        this.distanceSign = false;
    }

    /**
     * @returns The City Name
     */
    getName(){
        return this.name;
    }

    /**
     * @returns Distance to the city (if specified)
     */
    getDistance(){
        return this.distance.replaceAll("\.", "\·");
    }

    /**
     * @returns The distance units to the city (if specified)
     */
    getUnits() {
        return this.units;
    }

    /**
     * @returns {boolean} if this sign has distance information
     */
    isDistanceSign(){
        return this.distanceSign;
    }

    /**
     * @returns {HTMLElement} the HTML element generated
     */
    build(){
        return null;
    }
}

class ControlCity extends ControlCityProto {

    /**
     * @param {string} name The Name of the city
     */
    constructor(name){
        super();
        this.name = name;
    }

    build(){
        const parag = document.createElement("p");
        parag.className = "center";
        parag.innerText = this.getName();

        return parag;
    }
}

class DistanceToCity extends ControlCityProto {

    /**
     * @param {string} name The name of the city
     * @param {string | number} dist The distance to the city
     * @param {string} units The distance unit
     */
    constructor(name, dist, units){
        super();
        this.name = name;
        this.distance = dist;

        this.units = units;
        if (this.units === null)
            this.units = "";
        this.distanceSign = true;
    }

    build() {
        const parag = document.createElement("p");
        parag.className = "left";
        parag.innerText = this.getName();

        const span1 = document.createElement("span");
        span1.className = "right";
        span1.innerText = this.getDistance() + " ";

        const span2 = document.createElement("span");
        span2.className = "little";
        span2.innerText = this.getUnits();

        if (this.getUnits() !== "") span1.appendChild(span2);
        parag.appendChild(span1);
        return parag;
    }
}

class BottomText extends ControlCityProto {
    /**
     * @param {string} text Text to add
     */
    constructor(text){
        super();
        this.name = text;
    }

    build() {
        const parag = document.createElement("p");
        parag.className = "center little";
        parag.innerText = this.getName();
        return parag;
    }
}

class ExitText extends ControlCityProto {
    /**
     * @param {string} text Text to add
     */
    constructor(){
        super();
        this.name = "EXIT";
    }

    build() {
        const parag = document.createElement("p");
        parag.className = "center exitSignText";
        parag.innerText = this.getName();
        return parag;
    }
}

class ExitNumberText extends ControlCityProto {
    /**
     * @param {string} text Text to add
     */
    constructor(num){
        super();
        this.name = num;
    }

    build() {
        const parag = document.createElement("p");
        parag.className = "center big";
        parag.innerText = this.getName();
        return parag;
    }
}

class Arrows {

    constructor(){
        this.side = "bottom"; // left, bottom, side
        this.exitOnly = false;

        this.exitText = "";
        
        this.arrows = [];
    }

    addArrow(arrow){
        if (arrow === null || arrow.length > 1)
            return false;

        if (this.side !== ArrowSide.bottom)
            return false;

        this.arrows.push(arrow);
        return true;
    }

    setArrow(arrow){
        if (arrow === null || arrow.length > 1)
            return false;

        this.arrows[0] = arrow;
        return true;
    }

    removeArrow(index){
        if (index === null || index >= this.arrows.length)
            return false;

        if (this.side !== ArrowSide.bottom)
            return false;

        this.arrows.splice(index, 1);
        return true;
    }

    setArrowSide(side){
        if (side === null)
            return false;

        this.side = side;
        if (this.side === ArrowSide.left || this.side === ArrowSide.right){
            this.exitOnly = false;
            this.arrows = [];
            if (this.side === ArrowSide.left)
                this.arrows.push(ArrowOptions.slideLeft);
            else this.arrows.push(ArrowOptions.slideRight);
        }
    }

    setExitOnly(isExit){

        this.exitOnly = isExit;
        return true;
    }

    setExitText(text) {
        this.exitText = text;

        if (this.exitText === null)
            this.exitText = "";
    }


    /** PRIVATE METHOD, please do not call outside of the sign.js file. */
    render(){
        const arrowContainer = document.createElement("div");
        
        if (this.side === ArrowSide.bottom){
            arrowContainer.className = "arrows";
            if (this.exitOnly){
                arrowContainer.className += " exitOnly";

                const pele = document.createElement("span")
                pele.className = "exitText";
                pele.innerText = "EXIT";
                arrowContainer.appendChild(pele);

                const ele = document.createElement("span");
                ele.className = "arrow";
                if (this.arrows[0] === ArrowOptions.downArrow){
                    ele.className += " two";
                    ele.innerText = "$";
                }else{
                    ele.className += " one";
                    ele.innerText = this.arrows[0];
                }
                arrowContainer.appendChild(ele);

                const pele2 = document.createElement("span")
                pele2.className = "exitText";
                pele2.innerText = "ONLY";
                arrowContainer.appendChild(pele2);
            }else{
                if (this.exitText !== "" && this.arrows.length <= 1){
                    const pele = document.createElement("span")
                    pele.className = "exitText";
                    pele.innerText = this.exitText;
                    arrowContainer.appendChild(pele);
                }
                for (let i = 0; i < this.arrows.length; i++){
                    const ele = document.createElement("span");
                    ele.className = "arrow";
                    ele.className += ` ${this.side}_${this.arrows[i]}`

                    if (i-1 === Math.floor(this.arrows.length/2)-1 && this.arrows.length > 1 && this.exitText !== ""){
                        ele.style.marginLeft = "0rem";
                    }

                    if (this.arrows[i] === ArrowOptions.downArrow){
                        ele.className += " two";
                        ele.innerText = "$";
                    }else{
                        ele.className += " one";
                        ele.innerText = this.arrows[i];
                    }

                    if (this.arrows.length === 1){
                        ele.style.width = "50px";
                    }
                    arrowContainer.appendChild(ele);

                    if (i === Math.floor(this.arrows.length/2)-1 && this.arrows.length > 1 && this.exitText !== ""){
                        const pele = document.createElement("span")
                        pele.className = "exitText";
                        pele.innerText = this.exitText;
                        arrowContainer.appendChild(pele);
                    }
                }
            }

            if (this.arrows.length > 0 || this.exitOnly || this.exitText !== "")
                document.querySelector("div.sign").appendChild(arrowContainer);
        }else{
            arrowContainer.className = "arrowSide";
            if (this.arrows[0] === ArrowOptions.bigLeft || this.arrows[1] === ArrowOptions.bigRight){
                arrowContainer.className += " two";
            }else{
                arrowContainer.className += " one";
            }
            arrowContainer.innerText = this.arrows[0];
            for (let k in ArrowOptions){
                if (ArrowOptions[k] === this.arrows[0]){
                    arrowContainer.className += ` ${k}`;
                    break;
                }
            }

            if (this.arrows.length > 0 || this.exitOnly || this.exitText !== ""){
                if (this.side === ArrowSide.left){
                    document.querySelector("div.signcontainer").prepend(arrowContainer);
                }else document.querySelector("div.signcontainer").appendChild(arrowContainer);
            }
        }
    }
}

/**
 * This class handles data and rendering for the Exit Tab.
 */
class ExitTab {

    constructor(colour){
        this.exitNumber = 0;
        this.render = false;

        this.nzStyle = false;

        this.colour = colour;
    }

    /**
     * Sets the exit number. Also activates the exit tab, so it is rendered.
     * @param {string | number} number Sets the Exit Number
     */
    setExitNumber(number){
        this.exitNumber = new String(number).replaceAll(".", "·");
        this.render = true;
    }

    /**
     * Sets whether the exit tab is rendered or not
     * @param {boolean} render true means the exit tab is rendered
     */
    setRender(render){
        this.render = render;
    }

    /**
     * Changes the exit tab background colour. Will change when next re-rendered.
     * @param {string} colour Colour for the exit tab background.
     */
    setColour(colour) {
        this.colour = colour;
    }

    /**
     * @returns {boolean} true if the tab should be rendered.
     */
    shouldRender(){
        return this.render;
    }

    build(){
        const exitt = document.createElement("div");
        exitt.className = `exitTab ${this.colour}`;
        if (this.nzStyle)
            exitt.className += ` nzStyle`;  // puts a border all around the sign, makes it a seperate sign for an add on.

        const exitText = document.createElement("span");
        exitText.className = "exitText";
        exitText.innerText = "EXIT";
        exitt.appendChild(exitText);

        const exitNum = document.createElement("span");
        exitNum.className = "exitNumber";
        exitNum.innerText = this.exitNumber;
        exitt.appendChild(exitNum);

        return exitt;
    }
}

class Sign {

    constructor(colour){
        this.signColour = colour;

        this.shields = [];
        this.names = [];
        this.controlCities = [];
        this.arrows = new Arrows();
        this.exitTab = new ExitTab(this.signColour);

        this.shieldPos = "top";
    }

    /**
     * Sets the sign and exit tab background color.
     * @param {string} colour The colour to set the sign back to.
     */
    setSignColour(colour){
        this.signColour = colour;
        this.exitTab.setColour(colour);
    }

    getSignColour(){
        return this.signColour;
    }

    addShield(shield){
        if (shield === null || !(shield instanceof Shield))
            return false;

        this.shields.push(shield);
        return true;
    }

    removeShield(shield){
        if (shield === null || !(shield instanceof Shield))
            return false;

        const index = this.shields.indexOf(shield);

        if (index === -1) return false;

        this.shields.splice(index, 1);
        return true;
    }

    getShields(){
        return this.shields;
    }

    addName(name){
        if (name === null)
            return false;

        this.names.push(name);
        return true;
    }

    removeName(name){
        if (name === null)
            return false;

        const index = this.names.indexOf(name);

        if (index === -1) return false;

        this.names.splice(index, 1);
        return true;
    }

    getNames(){
        return this.names;
    }

    addControlCity(cc){
        if (cc === null || !(cc instanceof ControlCityProto))
            return false;

        this.controlCities.push(cc);
        return true;
    }

    removeControlCity(cc){
        if (cc === null || !(cc instanceof ControlCityProto))
            return false;
        
        const index = this.controlCities.indexOf(cc);

        if (index === -1) return false;

        this.controlCities.splice(index, 1);
        return true;
    }

    getControlCities(){
        return this.controlCities;
    }


    /** @returns Arrows */
    getArrows(){
        return this.arrows;
    }


    /**
     * @returns {ExitTab} the Exit Tab object
     */
    getExitTab(){
        return this.exitTab;
    }


    build(){
        const signWithExit = document.querySelector("div.signWithExit");

        // render the exit tab
        const exitTab = document.querySelector("div.exitTab");
        if (exitTab !== null)
            signWithExit.removeChild(exitTab);

        if (this.exitTab.shouldRender()){
            signWithExit.prepend(this.exitTab.build());
        }

        // render the actual sign
        const signcont = document.querySelector("div.signcontainer");
        signcont.className = "signcontainer " + this.getSignColour();
        
        if (!this.exitTab.nzStyle && this.exitTab.shouldRender())
            signcont.className += " attachedExitTab";

        const sign = document.createElement("div");
        sign.className = "sign";

        while (signcont.firstChild) signcont.removeChild(signcont.firstChild);

        const shieldContainer = document.createElement("div");

        if (this.shields.length > 0){
            shieldContainer.className = 'shields';

            for(let i = 0; i < this.shields.length; i++)
                shieldContainer.appendChild(this.shields[i].build(this.shieldPos));

            if (this.shieldPos === "top")
                sign.appendChild(shieldContainer);

            if (this.shieldPos === "left")
                signcont.appendChild(shieldContainer);
        }

        if (this.names.length > 0){
            const namesContainer = document.createElement("div");
            namesContainer.className = "names";

            for (let i = 0; i < this.names.length; i++){
                const label = document.createElement("label");
                label.innerText = this.names[i];
                namesContainer.appendChild(label);
            }

            sign.appendChild(namesContainer);
        }

        if (this.controlCities.length > 0) {
            const ccContainer = document.createElement("div");
            ccContainer.className = "controlcities";

            for (let i = 0; i < this.controlCities.length; i++)
                ccContainer.appendChild(this.controlCities[i].build());

            sign.appendChild(ccContainer);
        }

        signcont.appendChild(sign);

        if (this.shieldPos === "right")
            signcont.appendChild(shieldContainer);

        this.arrows.render();
    }

}