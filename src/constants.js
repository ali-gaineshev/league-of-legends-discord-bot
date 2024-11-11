// constants.js

const na_lol_base_url = "https://na1.api.riotgames.com/lol"

const RIOT_CONSTANTS = Object.freeze({
  riot_id_game_name: "riotIdGameName",
  riot_id_tag_line: "riotIdTagLine",
  puuid: "puuid",
  id: "id",
  summoner_id: "summonerId",
  account_id: "accountId",
  summoner_level: "summonerLevel",
  profile_icon_id: "profileIconId",
  league_id: "leagueId",
  queue_type: "queueType",
  ranked_flex_key: "RANKED_FLEX_SR",
  ranked_flex: "ranked_flex",
  ranked_solo_key: "RANKED_SOLO_5x5",
  ranked_solo: "ranked_solo",
  tier: "tier",
  rank: "rank",
  is_hot_streak: "hotStreak",
  wins: "wins",
  losses: "losses",

  team_order: "ORDER",
  team_blue: "Blue Team",
  team_chaos: "CHAOS",
  red_team: "Red Team"
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

// kayden
// puuid - fdzOic-IJ0_YZV89dVZ6nasA2Eq65wAoFkVZXYQ0pJRDGZ9a2jTFE_s0LvwPhvwbjPGrlmmn_oepiQ
// summonner id - _4VTSPgAO_ixbJbtCDCDLw8nHBIADsX20XK1zrPPgXt7mx8
// account id - cnATm-k5TtDIKMHXtmPYCYwXbuC1_H2cB7d3patIBT6LMJo