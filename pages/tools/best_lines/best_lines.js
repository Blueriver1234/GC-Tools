// Stat inputs
const basic_atk_input = document.querySelector('#basic_atk_input');
const incr_atk_input = document.querySelector('#incr_atk_input');
const more_dmg_input = document.querySelector('#more_dmg_input');
const cc_input = document.querySelector('#cc_input');
const cdmg_input = document.querySelector('#cdmg_input');
const as_input = document.querySelector('#as_input');

// Stat input values
let basic_atk_input_value = 0;
let incr_atk_input_value = 0;
let more_dmg_input_value = 0;
let cc_input_value = 0;
let cdmg_input_value = 0;
let as_input_value = 0;

// Collect real time stat input values
basic_atk_input.addEventListener("input", () => {
  basic_atk_input_value = Number(basic_atk_input.value);
});

incr_atk_input.addEventListener("input", () => {
  incr_atk_input_value = Number(incr_atk_input.value);
});

more_dmg_input.addEventListener("input", () => {
  more_dmg_input_value = Number(more_dmg_input.value);
});

cc_input.addEventListener("input", () => {
  cc_input_value = Number(cc_input.value);
});

cdmg_input.addEventListener("input", () => {
  cdmg_input_value = Number(cdmg_input.value);
});

as_input.addEventListener("input", () => {
  as_input_value = Number(as_input.value);
});

// Line selection
const line_input = document.querySelector('#line_input');
const spinner_plus = document.querySelector('#spinner-plus');
const spinner_minus = document.querySelector('#spinner-minus');

let line_input_value = 4;
line_input.innerHTML = line_input_value;

spinner_plus.addEventListener("click", (event) => {
  if (line_input_value <= 5) {
    line_input_value++;
    line_input.innerHTML = line_input_value;
    event.preventDefault();    
  }
  else {  
    event.preventDefault();    
  }
});

spinner_minus.addEventListener("click", (event) => {
  if (line_input_value >= 5) {
    line_input_value--;
    line_input.innerHTML = line_input_value;
    event.preventDefault();    
  }
  else {
    event.preventDefault();    
  }
});

// Items's basic stat increases
let I_Atk = 400;
let I_IAtk = 0.25;
let I_CChance = 0.01;
let I_CDmg = 0.5;
let I_AS = 0.2;

function dps_calculator(Atk, IAtk, MAtk, CChance, CDmg, AS) {
  if (CChance > 1) {
    CChance = 1;
  }

  dps = Atk * IAtk * MAtk * AS * (CChance * CDmg + (1 - CChance));

  return dps;
}

function currently_needed_stat(Atk, IAtk, MAtk, CChance, CDmg, AS) {
  let highest_dps = 0;
  let currently_needed_stat = "";

 let Incr_Atk = dps_calculator(Atk + I_Atk, IAtk, MAtk, CChance, CDmg, AS);
  if (Incr_Atk > highest_dps) {
    highest_dps = Incr_Atk;
    currently_needed_stat = "Atk";
  }

  let Incr_IAtk = dps_calculator(Atk, IAtk + I_IAtk, MAtk, CChance, CDmg, AS);
  if (Incr_IAtk > highest_dps) {
    highest_dps = Incr_IAtk;
    currently_needed_stat = "IAtk";
  }

  let Incr_CChance = dps_calculator(Atk, IAtk, MAtk, CChance + I_CChance, CDmg, AS);
  if (Incr_CChance > highest_dps) {
    highest_dps = Incr_CChance;
    currently_needed_stat = "CChance";
  }

  let Incr_CDmg = dps_calculator(Atk, IAtk, MAtk, CChance, CDmg + I_CDmg, AS);
  if (Incr_CDmg > highest_dps) {
    highest_dps = Incr_CDmg;
    currently_needed_stat = "CDmg";
  }

  let Incr_AS = dps_calculator(Atk, IAtk, MAtk, CChance, CDmg, AS + I_AS);
  if (Incr_AS > highest_dps) {
    highest_dps = Incr_AS;
    currently_needed_stat = "AS";
  }

  return currently_needed_stat;
}

function best_item_lines(num) {
  function incre_stat_by_item(stat) {
    switch (stat) {
      case "Atk":
        alt_Atk += I_Atk;
        break;

      case "IAtk":
        alt_IAtk += I_IAtk;
        break;        

      case "CChance":
        alt_CChance += I_CChance;
        break;

      case "CDmg":
        alt_CDmg += I_CDmg;
        break;

      case "AS":
        alt_AS += I_AS;
        break;

      default:
        break;
    }
  }
  function incre_lines(stat) {
    switch (stat) {
      case "Atk":
        Atk_line++;
        break;

      case "IAtk":
        IAtk_line++;
        break;        

      case "CChance":
        CChance_line++;
        break;

      case "CDmg":
        CDmg_line++;
        break;

      case "AS":
        AS_line++;
        break;

      default:
        break;
    }
  }

  let Atk_line = 0;
  let IAtk_line = 0;  
  let CChance_line = 0;
  let CDmg_line = 0;
  let AS_line = 0;

  let alt_Atk = basic_atk_input_value;  
  let alt_IAtk = incr_atk_input_value;
  let alt_MAtk = more_dmg_input_value;
  let alt_CChance = cc_input_value;
  let alt_CDmg = cdmg_input_value;
  let alt_AS = as_input_value;

  for (let i = 0; i < num; i++) {
    incre_lines(currently_needed_stat(alt_Atk, alt_IAtk, alt_MAtk, alt_CChance, alt_CDmg, alt_AS))    
    incre_stat_by_item(currently_needed_stat(alt_Atk, alt_IAtk, alt_MAtk, alt_CChance, alt_CDmg, alt_AS))
  }

  let lines = {
    "Attack": Atk_line, 
    "Increased Attack": IAtk_line,     
    "Critical Chance": CChance_line, 
    "Critical Damage": CDmg_line, 
    "Attack Speed": AS_line
  }

  return lines;
}

// Line output
const best_line_list = document.querySelector('#best_line_list');

function best_item_lines_output(object) {
  best_line_list.innerHTML = "";
  for (const keys of Object.keys(object)) {
    if (object[keys] > 0) {
      best_line_list.innerHTML += `
      <li><span>${object[keys]}</span> lines of <span>${keys}</span></li>
      `
    }        
  }
}

// Run function
const run_button = document.querySelector('#run_button');

run_button.addEventListener("click", (event) => {
  if (
    basic_atk_input_value <= 0 ||
    incr_atk_input_value <= 0  ||
    more_dmg_input_value <= 0  ||
    cc_input_value <= 0  ||
    cdmg_input_value <= 0  ||
    as_input_value <= 0
  ) {
    alert("Invalid input(s)");
    event.preventDefault();
  }  

  console.log(best_item_lines(line_input_value));
  best_item_lines_output(best_item_lines(line_input_value));
  event.preventDefault();  
});


