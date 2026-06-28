// Heroes's stats
let Atk = 2.525;
let MAtk = 1.777;
let CChance = 0.384;
let CDmg = 2.227;
let AS = 1.5;

// Orbs's stats
let O_luck = 0.236;
let O_cdmg = 0.925;
let O_as = 0.5;
let O_dmg = 0.2;

// Items's basic stat increases
let I_Atk = 0.225;
let I_CChance = 0.095;
let I_CDmg = 0.45;
let I_AS = 0.195;

function dps_calculator(Atk, MAtk, CChance, CDmg, AS) {
  if (CChance > 1) {
    CChance = 1;
  }
  dps = (Atk * MAtk * CChance * CDmg + Atk * MAtk * (1 - CChance)) * AS;

  return dps;
}

function current_needed_stat(Atk, MAtk, CChance, CDmg, AS) {
  let highest_dps = 0;
  let current_needed_stat = "";

  Incre_Atk = dps_calculator(Atk + I_Atk, MAtk, CChance, CDmg, AS);
  if (Incre_Atk > highest_dps) {
    highest_dps = Incre_Atk;
    current_needed_stat = "Atk";
  }

  Incre_CChance = dps_calculator(Atk, MAtk, CChance + I_CChance, CDmg, AS);
  if (Incre_CChance > highest_dps) {
    highest_dps = Incre_CChance;
    current_needed_stat = "CChance";
  }

  Incre_CDmg = dps_calculator(Atk, MAtk, CChance, CDmg + I_CDmg, AS);
  if (Incre_CDmg > highest_dps) {
    highest_dps = Incre_CDmg;
    current_needed_stat = "CDmg";
  }

  Incre_AS = dps_calculator(Atk, MAtk, CChance, CDmg, AS + I_AS);
  if (Incre_AS > highest_dps) {
    highest_dps = Incre_AS;
    current_needed_stat = "AS";
  }

  return current_needed_stat;
}

function incre_stat_by_item(stat) {
  switch (stat) {
    case "Atk":
      alt_Atk += I_Atk;
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

function best_item_lines(num) {
  function incre_lines(stat) {
    switch (stat) {
      case "Atk":
        Atk_line++;
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
  let CChance_line = 0;
  let CDmg_line = 0;
  let AS_line = 0;

  let alt_Atk = Atk;
  let alt_CChance = CChance;
  let alt_CDmg = CDmg;
  let alt_AS = AS;

  for (let i = 0; i < num; i++) {
    incre_lines(current_needed_stat(alt_Atk, MAtk, alt_CChance, alt_CDmg, alt_AS))
    incre_stat_by_item(current_needed_stat(alt_Atk, MAtk, alt_CChance, alt_CDmg, alt_AS))    
  }

  let lines = {
    Atk_line: Atk_line, 
    CChance_line: CChance_line, 
    CDmg_line: CDmg_line, 
    AS_line: AS_line
  }

  return lines;
}

function find_best_stat(obj) {
  let best_stat = "";
  let max_value = 0;  

  for (const [key, value] of Object.entries(obj)) {
    if (value > max_value) {
      best_stat = key;
      max_value = value;
    }
  }

  return best_stat;
}

function stat_ranking(line_num) {
  function dps_incr_by_stat(Atk, MAtk, CChance, CDmg, AS) {
    let Idps_Atk = dps_calculator(Atk + I_Atk, MAtk, CChance, CDmg, AS) / dps_calculator(Atk, CChance, CDmg, AS);
    let Idps_CChance = dps_calculator(Atk, MAtk, CChance + I_CChance, CDmg, AS) / dps_calculator(Atk, CChance, CDmg, AS);
    let Idps_CDmg = dps_calculator(Atk, MAtk, CChance, CDmg + I_CDmg, AS) / dps_calculator(Atk, CChance, CDmg, AS);                
    let Idps_AS = dps_calculator(Atk, MAtk, CChance, CDmg, AS + I_AS) / dps_calculator(Atk, CChance, CDmg, AS);
    
    line_ranking_overall[Object.keys(line_ranking_overall)[0]] += Idps_Atk; 
    line_ranking_overall[Object.keys(line_ranking_overall)[1]] += Idps_CChance;
    line_ranking_overall[Object.keys(line_ranking_overall)[2]] += Idps_CDmg;
    line_ranking_overall[Object.keys(line_ranking_overall)[3]] += Idps_AS;
  }

  let alt_Atk = Atk;
  let alt_CChance = CChance;
  let alt_CDmg = CDmg;
  let alt_AS = AS;

  let line_ranking_overall = {
    "Increased Attack": 0,     
    "Critical Chance": 0, 
    "Critical Damage": 0, 
    "Attack Speed": 0
  }

  for (let i = 0; i < line_num; i++) {
    dps_incr_by_stat(alt_Atk, MAtk, alt_CChance, alt_CDmg, alt_AS);
    incre_stat_by_item(current_needed_stat(alt_Atk, MAtk, alt_CChance, alt_CDmg, alt_AS))
  }


}

let arr = [1, 2, 4, 0, -1];
console.log(sort(arr));



