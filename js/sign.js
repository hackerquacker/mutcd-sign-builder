
const ShieldType = {
    Motorway : "MWY",
    Highway : "HWY",
    Route : "RTE",
};

class Shield {

    constructor(type, number, direction) {
        this.type = type;
        this.number = number;
        this.direction = direction !== null ? direction : "";
    }

    getType(){
        return this.type;
    }

    setType(type) {
        if (type === null)
            return false;

        this.type = type;
        return true;
    }

    getNumber(){
        return this.number;
    }

    setNumber(num){
        if (num === null)
            return false;

        this.number = num;
        return true;
    }

    getDirection(){
        return this.direction;
    }

    setDirection(dir){
        if (dir === null || dir === "None"){
            this.direction = "";
            return;
        }

        this.direction = dir;
    }

    /**
     * Builds the structure of the shield element and returns the html object
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
        if (this.getNumber().length > 2){
            label.className = "long";
        }

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

class ControlCityProto {

    constructor(){
        this.name = "";
        this.distance = "";
        this.units = "";

        this.distanceSign = false;
    }

    getName(){
        return this.name;
    }

    getDistance(){
        return this.distance.replace(".", "·");
    }

    getUnits() {
        return this.units;
    }

    isDistanceSign(){
        return this.distanceSign;
    }

    build(){
        return null;
    }
}

class ControlCity extends ControlCityProto {

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

const ArrowOptions = {
    slideLeft : "h",
    slideRight : "H",
    upArrow : "5",      // Arrows Two = 4
    downArrow : "%",    // Arrows Two = %
    leftArrow : "j",
    leftUpArrow : "4",
    rightArrow : "J",
    rightUpArrow : "$",

    bigLeft : "1",  // Arrows Two
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

class Sign {

    constructor(color){
        this.signColor = color;

        this.shields = [];
        this.names = [];
        this.controlCities = [];
        this.arrows = new Arrows();

        this.shieldPos = "top";
    }

    getSignColor(){
        return this.signColor;
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


    build(){
        const signcont = document.querySelector("div.signcontainer");
        signcont.className = "signcontainer " + this.getSignColor();

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




function testSign() {
    sign = new Sign("green");
    sign.addShield(new Shield(ShieldType.Motorway, "2", "North"));
    sign.addControlCity(new ControlCity("Anka City"));

    sign.getArrows().addArrow(ArrowOptions.downArrow);
    sign.getArrows().addArrow(ArrowOptions.downArrow);
    sign.getArrows().addArrow(ArrowOptions.downArrow);
    sign.getArrows().addArrow(ArrowOptions.downArrow);
    sign.getArrows().setExitOnly(false);

    sign.build();
}