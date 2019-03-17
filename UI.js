var sliderCount = 0;

function createSlider(label, value, min, max, onChange){
    sliderCount++;

    var id = "slider"+sliderCount;

    var p = document.createElement("p");

    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.innerHTML = label;

    var input = document.createElement("input");
    input.setAttribute("id", id);
    input.setAttribute("type", "range");
    input.setAttribute("min", min);
    input.setAttribute("max", max);
    input.setAttribute("value", value);
    input.setAttribute("step", 0.01);
    input.addEventListener("input", onChange);

    p.appendChild(labelEl);
    p.appendChild(input);

    document.getElementById("ui").appendChild(p);

    return input;
}

function createButton(label, onClick){
    var button = document.createElement("button");

    button.addEventListener("click", onClick);

    button.innerHTML = label;

    document.getElementById("ui").appendChild(button);

    return button;
} 