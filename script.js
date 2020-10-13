const calckeys = document.getElementsByClassName('calculator_key');

for(i=0; i<calckeys.length; i++){
    const current = calckeys[i].getAttribute('value');
    calckeys[i].innerText = current;
}

for(i=0; i<calckeys.length; i++){
    calckeys[i].addEventListener('click', function(){
        const val = this.getAttribute('value');
        if(val === 'c' || val === ''){
            document.getElementById('display').value = '';
        }
        else if(val === '←'){
            const dval = document.getElementById('display').value; 
            document.getElementById('display').value = dval.substring(0, document.getElementById('display').value.length-1);
        }
        else if(val === '^2'){
            if(isNaN(parseInt(document.getElementById('display').value))) {
                document.getElementById('display').value = 0;
                return;
            }
            document.getElementById('display').value = Math.pow(document.getElementById('display').value, 2);
        }
        else if(val === '='){
            calc(document.getElementById('display').value);
        }
        else{
            check(document.getElementById('display'));
            if(document.getElementById('display').value === "0") {
                document.getElementById('display').value = "";
            }
            document.getElementById('display').value += val;
        }
    })
}

document.getElementById('calculator_form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('display').value;
    calc(val);
})

document.getElementById('display').addEventListener('input', function (e) {
    check(this);
})


function check(el) {
    const last = el.value[el.value.length - 1];

    if(isNaN(parseInt(last))) {
        if(last != "+" && last != "-" && last != "*" && last != "/" && last != ".") {
            el.value = el.value.slice(0, el.value.length - 1);
        } else if(last == el.value[el.value.length-2]) {
            el.value = el.value.slice(0, el.value.length - 1);
        }

    }
}


function calc(num) {
    if(num === '') {
        document.getElementById('display').value = "0";
        return;
    }
    if(isNaN(parseInt(num[num.length-1]))) {
        document.getElementById('display').value = "0";
        return;
    }
    if(String(eval(num)).length > 3 && String(eval(num))[0] == 0 && String(eval(num))[3] == 0) { 
        document.getElementById('display').value = eval(num).toFixed(1);
        return
    }
    document.getElementById('display').value = eval(num);
    
}
