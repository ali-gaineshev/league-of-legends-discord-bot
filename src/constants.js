// constants.js

const na_lol_base_url = "https://na1.api.riotgames.com/lol"

const RIOT_CONSTANTS = Object.freeze({
  riotIdGameName: "riotIdGameName",
  riotIdTagLine: "riotIdTagLine",
  puuid: "puuid",
  id: "id",
  summoner_id: "summoner_id",
  account_id: "accountId",
  profile_icon_id: "profileIconId"
});

const RIOT_API = Object.freeze({
  NA: "na1", //North America
  LOCAL_API_URL: "https://127.0.0.1:2999/liveclientdata/allgamedata",
  GENERAL_URL_AMERICA: "https://americas.api.riotgames.com/riot",
  ACCOUNT_V1: "/account/v1/accounts/by-riot-id/",
  SUMMONER_V4: `${na_lol_base_url}/summoner/v4/summoners/by-puuid`,
  LEAGUE_v4: `${na_lol_base_url}/league/v4/entries/by-summoner`
});

const CONSTANTS = Object.freeze({
  HTTP_STATUS: {
    SUCCESS: 200,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  },
});

module.exports = { RIOT_API, RIOT_CONSTANTS, CONSTANTS };

// T15FWuDxK082RoW0TltY7_CPocR0s2uJPvUejC11cXlvkGWHqSY7RMBfANsWp6EOYqPM8q_1LLVcrw

// ThmgowtsNnTpuQEI-7lCDceJkflqLPGKkpU2CpSVuPbStgJlZJMtCpniEgdxrEEGBMWLzuS6_sOfCg
// summonerId - id - O3qrP3GVuVrC-C1t1HSigKl_ZFZPB8tzDsrH4BqkAqfnif8o
// accountId - ghJBmSXLtMOWV93_5iBHb_hLn31N6Y_2L2bnX-XDVMe006bZhWx3gwAL
// league id - d89374dc-7148-47ea-8214-88e5c00b4e42
