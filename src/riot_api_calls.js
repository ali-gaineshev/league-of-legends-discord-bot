const { RIOT_API, RIOT_CONSTANTS, CONSTANTS } = require("./constants");
const axios = require("axios");
const { error } = require("console");
const https = require("https");
require("dotenv").config();

const httpsUnauthorizedAgent = new https.Agent({
  rejectUnauthorized: false,
});

function fetchLocalData() {
  return axios
    .get(RIOT_API.LOCAL_API_URL, { httpsAgent: httpsUnauthorizedAgent })
    .then((response) => {
      if (response.status === CONSTANTS.HTTP_STATUS.SUCCESS) {
        console.log("Request to local data is successful");
        return response.data; // Return the response data if successful
      } else {
        console.error("Error: Received non-200 status code from local riot api");
        return Promise.reject(
          new Error("Error fetching local data: Received non-200 status code")
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching local data: ", error.message);
      return Promise.reject(
        new Error("Error fetching local data: Couldn't send the request")
      );
    });
}

async function handleLocalData() {
  const allPlayers = [];
  try {
    const data = await fetchLocalData(); 

    if(data){
      data.allPlayers.forEach((player) => {
        //add additional keys for later to be used
        player[RIOT_CONSTANTS.puuid] = null;
        player[RIOT_CONSTANTS.summoner_id] = null;
        player[RIOT_CONSTANTS.account_id] = null;
        player[RIOT_CONSTANTS.profile_icon_id] = null;
        player[RIOT_CONSTANTS.riotIdGameName].trim();
        player[RIOT_CONSTANTS.riotIdTagLine].trim();

        allPlayers.push(player);
      });
    }
  } catch (error) {
    console.log("handleLocalData caught error: ", error);
  }
  return allPlayers;
}

async function get_puuid_of_all_players(players) {
  const promises = players.map(async (player) => {
    const base_url = `${RIOT_API.GENERAL_URL_AMERICA}${RIOT_API.ACCOUNT_V1}`;
    const riot_id_game_name = player[RIOT_CONSTANTS.riotIdGameName].trim();
    const riot_id_tag_line = player[RIOT_CONSTANTS.riotIdTagLine].trim();
    const api_key = process.env.RIOT_API_KEY;
    
    const url = `${base_url}${riot_id_game_name}/${riot_id_tag_line}?api_key=${api_key}`;

    try {
      const response = await axios.get(url);

      if (response.status === CONSTANTS.HTTP_STATUS.SUCCESS) {
        player[RIOT_CONSTANTS.puuid] = response.data.puuid;
      } else {
        console.error("Puuid function Error: Received non-200 status code");
      }
    } catch (error) {
      console.error("Error fetching PUUID:", error.message);
    }
  });

  await Promise.all(promises);
  return players;
}

async function get_summoner_id_of_players_by_puuid(players){
  const promises = players.map(async (player) => {
    if (player.puuid == null){
      return null;
    }

    const api_key = process.env.RIOT_API_KEY;
    const url = `${RIOT_API.SUMMONER_V4}/${player.puuid}?api_key=${api_key}`;
    try {
      const response = await axios.get(url);

      if (response.status === CONSTANTS.HTTP_STATUS.SUCCESS) {
        player[RIOT_CONSTANTS.summoner_id] = response.data[RIOT_CONSTANTS.id]; 
        player[RIOT_CONSTANTS.account_id] = response.data[RIOT_CONSTANTS.account_id]; 
        player[RIOT_CONSTANTS.profile_icon_id] = response.data[RIOT_CONSTANTS.profile_icon_id]; 
      } else {
        console.error("Summoner Id Error: Received non-200 status code");
      }
    } catch (error) {
      console.error("Error fetching Summoner Id:", error.message); 
    }
  });

  await Promise.all(promises);
  console.log("All players updated:", players);
  return players;
}

function main(){
  handleLocalData().then((localData) => {
    get_puuid_of_all_players(localData).then((response => {
      get_summoner_id_of_players_by_puuid(response);
    }));
  });
}

main();

const b = {
  activePlayer: {
    abilities: {
      E: {
        abilityLevel: 0,
        displayName: "Tempest / Cripple",
        id: "LeeSinEOne",
        rawDescription: "GeneratedTip_Spell_LeeSinEOne_Description",
        rawDisplayName: "GeneratedTip_Spell_LeeSinEOne_DisplayName",
      },
      Passive: {
        displayName: "Flurry",
        id: "LeeSinPassive",
        rawDescription: "GeneratedTip_Passive_LeeSinPassive_Description",
        rawDisplayName: "GeneratedTip_Passive_LeeSinPassive_DisplayName",
      },
      Q: {
        abilityLevel: 0,
        displayName: "Sonic Wave / Resonating Strike",
        id: "LeeSinQOne",
        rawDescription: "GeneratedTip_Spell_LeeSinQOne_Description",
        rawDisplayName: "GeneratedTip_Spell_LeeSinQOne_DisplayName",
      },
      R: {
        abilityLevel: 0,
        displayName: "Dragon's Rage",
        id: "LeeSinR",
        rawDescription: "GeneratedTip_Spell_LeeSinR_Description",
        rawDisplayName: "GeneratedTip_Spell_LeeSinR_DisplayName",
      },
      W: {
        abilityLevel: 0,
        displayName: "Safeguard / Iron Will",
        id: "LeeSinWOne",
        rawDescription: "GeneratedTip_Spell_LeeSinWOne_Description",
        rawDisplayName: "GeneratedTip_Spell_LeeSinWOne_DisplayName",
      },
    },
    championStats: {
      abilityHaste: 0.0,
      abilityPower: 0.0,
      armor: 0.0,
      armorPenetrationFlat: 0.0,
      armorPenetrationPercent: 0.0,
      attackDamage: 25.0,
      attackRange: 0.0,
      attackSpeed: 0.6510000228881836,
      bonusArmorPenetrationPercent: 0.0,
      bonusMagicPenetrationPercent: 0.0,
      critChance: 0.0,
      critDamage: 0.0,
      currentHealth: 645.0,
      healShieldPower: 0.0,
      healthRegenRate: 0.0,
      lifeSteal: 0.0,
      magicLethality: 0.0,
      magicPenetrationFlat: 0.0,
      magicPenetrationPercent: 0.0,
      magicResist: 0.0,
      maxHealth: 645.0,
      moveSpeed: 0.0,
      omnivamp: 0.0,
      physicalLethality: 0.0,
      physicalVamp: 0.0,
      resourceMax: 200.0,
      resourceRegenRate: 0.0,
      resourceType: "ENERGY",
      resourceValue: 200.0,
      spellVamp: 0.0,
      tenacity: 5.0,
    },
    currentGold: 0.0,
    fullRunes: {
      generalRunes: [
        {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        {
          displayName: "Triumph",
          id: 9111,
          rawDescription: "perk_tooltip_9111",
          rawDisplayName: "perk_displayname_9111",
        },
        {
          displayName: "Legend: Alacrity",
          id: 9104,
          rawDescription: "perk_tooltip_9104",
          rawDisplayName: "perk_displayname_9104",
        },
        {
          displayName: "Coup de Grace",
          id: 8014,
          rawDescription: "perk_tooltip_CoupDeGrace",
          rawDisplayName: "perk_displayname_CoupDeGrace",
        },
        {
          displayName: "Cosmic Insight",
          id: 8347,
          rawDescription: "perk_tooltip_CosmicInsight",
          rawDisplayName: "perk_displayname_CosmicInsight",
        },
        {
          displayName: "Magical Footwear",
          id: 8304,
          rawDescription: "perk_tooltip_MagicalFootwear",
          rawDisplayName: "perk_displayname_MagicalFootwear",
        },
      ],
      keystone: {
        displayName: "Conqueror",
        id: 8010,
        rawDescription: "perk_tooltip_Conqueror",
        rawDisplayName: "perk_displayname_Conqueror",
      },
      primaryRuneTree: {
        displayName: "Precision",
        id: 8000,
        rawDescription: "perkstyle_tooltip_7201",
        rawDisplayName: "perkstyle_displayname_7201",
      },
      secondaryRuneTree: {
        displayName: "Inspiration",
        id: 8300,
        rawDescription: "perkstyle_tooltip_7203",
        rawDisplayName: "perkstyle_displayname_7203",
      },
      statRunes: [
        {
          id: 5005,
          rawDescription: "perk_tooltip_StatModAttackSpeed",
        },
        {
          id: 5008,
          rawDescription: "perk_tooltip_StatModAdaptive",
        },
        {
          id: 5001,
          rawDescription: "perk_tooltip_StatModHealthScaling",
        },
      ],
    },
    level: 1,
    riotId: "SuperPeter2011#1234",
    riotIdGameName: "SuperPeter2011",
    riotIdTagLine: "1234",
    summonerName: "SuperPeter2011#1234",
    teamRelativeColors: true,
  },
  allPlayers: [
    {
      championName: "Lee Sin",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "JUNGLE",
      rawChampionName: "game_character_displayname_LeeSin",
      rawSkinName: "game_character_skin_displayname_LeeSin_12",
      respawnTimer: 0.0,
      riotId: "SuperPeter2011#1234",
      riotIdGameName: "SuperPeter2011",
      riotIdTagLine: "1234",
      runes: {
        keystone: {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Inspiration",
          id: 8300,
          rawDescription: "perkstyle_tooltip_7203",
          rawDisplayName: "perkstyle_displayname_7203",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 12,
      skinName: "Playmaker Lee Sin",
      summonerName: "SuperPeter2011#1234",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Smite",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerSmite_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerSmite_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
      },
      team: "CHAOS",
    },
    {
      championName: "Fiora",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "TOP",
      rawChampionName: "game_character_displayname_Fiora",
      rawSkinName: "game_character_skin_displayname_Fiora_90",
      respawnTimer: 0.0,
      riotId: "HandyMannyPorQue#NA1",
      riotIdGameName: "HandyMannyPorQue",
      riotIdTagLine: "NA1",
      runes: {
        keystone: {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Resolve",
          id: 8400,
          rawDescription: "perkstyle_tooltip_7204",
          rawDisplayName: "perkstyle_displayname_7204",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 90,
      skinName: "Battle Queen Fiora",
      summonerName: "HandyMannyPorQue#NA1",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Teleport",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerTeleport_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerTeleport_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
      },
      team: "ORDER",
    },
    {
      championName: "Diana",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "JUNGLE",
      rawChampionName: "game_character_displayname_Diana",
      rawSkinName: "game_character_skin_displayname_Diana_12",
      respawnTimer: 0.0,
      riotId: "CptQuickster#pags1",
      riotIdGameName: "CptQuickster",
      riotIdTagLine: "pags1",
      runes: {
        keystone: {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Domination",
          id: 8100,
          rawDescription: "perkstyle_tooltip_7200",
          rawDisplayName: "perkstyle_displayname_7200",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 12,
      skinName: "Dark Waters Diana",
      summonerName: "CptQuickster#pags1",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Smite",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerSmite_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerSmite_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
      },
      team: "ORDER",
    },
    {
      championName: "Zeri",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "MIDDLE",
      rawChampionName: "game_character_displayname_Zeri",
      rawSkinName: "game_character_skin_displayname_Zeri_0",
      respawnTimer: 0.0,
      riotId: "CrimsonN#NA1",
      riotIdGameName: "CrimsonN",
      riotIdTagLine: "NA1",
      runes: {
        keystone: {
          displayName: "Fleet Footwork",
          id: 8021,
          rawDescription: "perk_tooltip_FleetFootwork",
          rawDisplayName: "perk_displayname_FleetFootwork",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Resolve",
          id: 8400,
          rawDescription: "perkstyle_tooltip_7204",
          rawDisplayName: "perkstyle_displayname_7204",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 0,
      skinName: "",
      summonerName: "CrimsonN#NA1",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Cleanse",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerBoost_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerBoost_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
      },
      team: "ORDER",
    },
    {
      championName: "Draven",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "BOTTOM",
      rawChampionName: "game_character_displayname_Draven",
      rawSkinName: "game_character_skin_displayname_Draven_1",
      respawnTimer: 0.0,
      riotId: "P3RC#NA1",
      riotIdGameName: "P3RC",
      riotIdTagLine: "NA1",
      runes: {
        keystone: {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Sorcery",
          id: 8200,
          rawDescription: "perkstyle_tooltip_7202",
          rawDisplayName: "perkstyle_displayname_7202",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 1,
      skinName: "Soul Reaver Draven",
      summonerName: "P3RC#NA1",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Cleanse",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerBoost_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerBoost_DisplayName",
        },
      },
      team: "ORDER",
    },
    {
      championName: "Thresh",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "UTILITY",
      rawChampionName: "game_character_displayname_Thresh",
      rawSkinName: "game_character_skin_displayname_Thresh_44",
      respawnTimer: 0.0,
      riotId: "etn#bruh",
      riotIdGameName: "etn",
      riotIdTagLine: "bruh",
      runes: {
        keystone: {
          displayName: "Guardian",
          id: 8465,
          rawDescription: "perk_tooltip_Guardian",
          rawDisplayName: "perk_displayname_Guardian",
        },
        primaryRuneTree: {
          displayName: "Resolve",
          id: 8400,
          rawDescription: "perkstyle_tooltip_7204",
          rawDisplayName: "perkstyle_displayname_7204",
        },
        secondaryRuneTree: {
          displayName: "Inspiration",
          id: 8300,
          rawDescription: "perkstyle_tooltip_7203",
          rawDisplayName: "perkstyle_displayname_7203",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 44,
      skinName: "Lunar Emperor Thresh",
      summonerName: "etn#bruh",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Ignite",
          rawDescription: "GeneratedTip_SummonerSpell_SummonerDot_Description",
          rawDisplayName: "GeneratedTip_SummonerSpell_SummonerDot_DisplayName",
        },
      },
      team: "ORDER",
    },
    {
      championName: "Mordekaiser",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "TOP",
      rawChampionName: "game_character_displayname_Mordekaiser",
      rawSkinName: "game_character_skin_displayname_Mordekaiser_0",
      respawnTimer: 0.0,
      riotId: "zzzbroz#GAMER",
      riotIdGameName: "zzzbroz",
      riotIdTagLine: "GAMER",
      runes: {
        keystone: {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Sorcery",
          id: 8200,
          rawDescription: "perkstyle_tooltip_7202",
          rawDisplayName: "perkstyle_displayname_7202",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 0,
      skinName: "",
      summonerName: "zzzbroz#GAMER",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Teleport",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerTeleport_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerTeleport_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
      },
      team: "CHAOS",
    },
    {
      championName: "Vladimir",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "MIDDLE",
      rawChampionName: "game_character_displayname_Vladimir",
      rawSkinName: "game_character_skin_displayname_Vladimir_2",
      respawnTimer: 0.0,
      riotId: "Sungravel#12345",
      riotIdGameName: "Sungravel",
      riotIdTagLine: "12345",
      runes: {
        keystone: {
          displayName: "Summon Aery",
          id: 8214,
          rawDescription: "perk_tooltip_SummonAery",
          rawDisplayName: "perk_displayname_SummonAery",
        },
        primaryRuneTree: {
          displayName: "Sorcery",
          id: 8200,
          rawDescription: "perkstyle_tooltip_7202",
          rawDisplayName: "perkstyle_displayname_7202",
        },
        secondaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 2,
      skinName: "Marquis Vladimir",
      summonerName: "Sungravel#12345",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Teleport",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerTeleport_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerTeleport_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
      },
      team: "CHAOS",
    },
    {
      championName: "Nilah",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "BOTTOM",
      rawChampionName: "game_character_displayname_Nilah",
      rawSkinName: "game_character_skin_displayname_Nilah_0",
      respawnTimer: 0.0,
      riotId: "Doot#ETH",
      riotIdGameName: "Doot",
      riotIdTagLine: "ETH",
      runes: {
        keystone: {
          displayName: "Conqueror",
          id: 8010,
          rawDescription: "perk_tooltip_Conqueror",
          rawDisplayName: "perk_displayname_Conqueror",
        },
        primaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
        secondaryRuneTree: {
          displayName: "Inspiration",
          id: 8300,
          rawDescription: "perkstyle_tooltip_7203",
          rawDisplayName: "perkstyle_displayname_7203",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 0,
      skinName: "",
      summonerName: "Doot#ETH",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Barrier",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerBarrier_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerBarrier_DisplayName",
        },
      },
      team: "CHAOS",
    },
    {
      championName: "Rammus",
      isBot: false,
      isDead: false,
      items: [],
      level: 1,
      position: "UTILITY",
      rawChampionName: "game_character_displayname_Rammus",
      rawSkinName: "game_character_skin_displayname_Rammus_0",
      respawnTimer: 0.0,
      riotId: "Ayymann#NA1",
      riotIdGameName: "Ayymann",
      riotIdTagLine: "NA1",
      runes: {
        keystone: {
          displayName: "Aftershock",
          id: 8439,
          rawDescription: "perk_tooltip_VeteranAftershock",
          rawDisplayName: "perk_displayname_VeteranAftershock",
        },
        primaryRuneTree: {
          displayName: "Resolve",
          id: 8400,
          rawDescription: "perkstyle_tooltip_7204",
          rawDisplayName: "perkstyle_displayname_7204",
        },
        secondaryRuneTree: {
          displayName: "Precision",
          id: 8000,
          rawDescription: "perkstyle_tooltip_7201",
          rawDisplayName: "perkstyle_displayname_7201",
        },
      },
      scores: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      skinID: 0,
      skinName: "",
      summonerName: "Ayymann#NA1",
      summonerSpells: {
        summonerSpellOne: {
          displayName: "Flash",
          rawDescription:
            "GeneratedTip_SummonerSpell_SummonerFlash_Description",
          rawDisplayName:
            "GeneratedTip_SummonerSpell_SummonerFlash_DisplayName",
        },
        summonerSpellTwo: {
          displayName: "Ignite",
          rawDescription: "GeneratedTip_SummonerSpell_SummonerDot_Description",
          rawDisplayName: "GeneratedTip_SummonerSpell_SummonerDot_DisplayName",
        },
      },
      team: "CHAOS",
    },
  ],
  events: {
    Events: [],
  },
  gameData: {
    gameMode: "CLASSIC",
    gameTime: 0.03978019952774048,
    mapName: "Map11",
    mapNumber: 11,
    mapTerrain: "Default",
  },
};
