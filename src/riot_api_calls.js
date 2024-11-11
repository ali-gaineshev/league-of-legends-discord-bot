const { RIOT_API, RIOT_CONSTANTS, CONSTANTS } = require("./constants");
const axios = require("axios");
const https = require("https");
require("dotenv").config();

const api_key = process.env.RIOT_API_KEY;

const httpsUnauthorizedAgent = new https.Agent({
  rejectUnauthorized: false,
});

class RiotApiHandler {
  async fetchLocalData() {
    return axios
      .get(RIOT_API.LOCAL_API_URL, { httpsAgent: httpsUnauthorizedAgent })
      .then((response) => {
        if (response.status === CONSTANTS.HTTP_STATUS.SUCCESS) {
          console.log("Request to local data is successful");
          return response.data; // Return the response data if successful
        } else {
          console.error(
            "Error: Received non-200 status code from local riot api"
          );
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
  
  async handleLocalData() {
    const allPlayers = [];
    try {
      const data = await fetchLocalData();
  
      if (data) {
        data.allPlayers.forEach((player) => {
          if (player.isBot) {
            return;
          }
          player[RIOT_CONSTANTS.puuid] = null;
          player[RIOT_CONSTANTS.summoner_id] = null;
          player[RIOT_CONSTANTS.summoner_level] = null;
          player[RIOT_CONSTANTS.account_id] = null;
          player[RIOT_CONSTANTS.profile_icon_id] = null;
          player[RIOT_CONSTANTS.league_id] = null;
          player[RIOT_CONSTANTS.ranked_flex] = null;
          player[RIOT_CONSTANTS.ranked_solo] = null;
  
          player[RIOT_CONSTANTS.riot_id_game_name].trim();
          player[RIOT_CONSTANTS.riot_id_tag_line].trim();
  
          allPlayers.push(player);
        });
      }
    } catch (error) {
      console.log("handleLocalData caught error: ", error);
    }
    return allPlayers;
  }

  async get_puuid_of_all_players(players) {
    const promises = players.map(async (player) => {
      const base_url = `${RIOT_API.GENERAL_URL_AMERICA}${RIOT_API.ACCOUNT_V1}`;
      const riot_id_game_name = player[RIOT_CONSTANTS.riot_id_game_name];
      const riot_id_tag_line = player[RIOT_CONSTANTS.riot_id_tag_line];

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

  async get_summoner_id_of_players_by_puuid(players) {
    const promises = players.map(async (player) => {
      if (player.puuid == null) {
        return null;
      }

      const url = `${RIOT_API.SUMMONER_V4}/${player.puuid}?api_key=${api_key}`;
      try {
        const response = await axios.get(url);
        console.log("In get summoner id");
        if (response.status === CONSTANTS.HTTP_STATUS.SUCCESS) {
          player[RIOT_CONSTANTS.summoner_id] = response.data[RIOT_CONSTANTS.id];
          player[RIOT_CONSTANTS.account_id] = response.data[RIOT_CONSTANTS.account_id];
          player[RIOT_CONSTANTS.summoner_level] = response.data[RIOT_CONSTANTS.summoner_level];
          player[RIOT_CONSTANTS.profile_icon_id] = response.data[RIOT_CONSTANTS.profile_icon_id];
        } else {
          console.error("Summoner Id Error: Received non-200 status code");
        }
      } catch (error) {
        console.error("Error fetching Summoner Id:", error.message);
      }
    });

    await Promise.all(promises);
    return players;
  }

  async get_rank_for_every_player(players) {
    const promises = players.map(async (player) => {
      if (player[RIOT_CONSTANTS.summoner_id] == null) {
        return null;
      }

      const url = `${RIOT_API.LEAGUE_v4}/${player[RIOT_CONSTANTS.summoner_id]}?api_key=${api_key}`;
      try {
        const response = await axios.get(url);
        if (response.status !== CONSTANTS.HTTP_STATUS.SUCCESS) {
          console.error("Rank Error: Received non-200 status code");
          return player;
        }
        for (const data of response.data) {
          if (data[RIOT_CONSTANTS.queue_type] === RIOT_CONSTANTS.ranked_flex_key) {
            player[RIOT_CONSTANTS.league_id] = data[RIOT_CONSTANTS.league_id];
            const flex_rank_info = {
              rank: data[RIOT_CONSTANTS.rank],
              tier: data[RIOT_CONSTANTS.tier],
              is_hot_streak: data[RIOT_CONSTANTS.is_hot_streak],
              wins: data[RIOT_CONSTANTS.wins],
              losses: data[RIOT_CONSTANTS.losses],
            };
            player[RIOT_CONSTANTS.ranked_flex] = flex_rank_info;
          }

          if (data[RIOT_CONSTANTS.queue_type] === RIOT_CONSTANTS.ranked_solo_key) {
            player[RIOT_CONSTANTS.league_id] = data[RIOT_CONSTANTS.league_id];
            const solo_rank_info = {
              rank: data[RIOT_CONSTANTS.rank],
              tier: data[RIOT_CONSTANTS.tier],
              is_hot_streak: data[RIOT_CONSTANTS.is_hot_streak],
              wins: data[RIOT_CONSTANTS.wins],
              losses: data[RIOT_CONSTANTS.losses],
            };
            player[RIOT_CONSTANTS.ranked_solo] = solo_rank_info;
          }
        }
      } catch (error) {
        console.error("Error fetching Rank:", error.message);
      }
    });
    await Promise.all(promises);
    console.log("All players updated:", players);
    return players;
  }

  async main() {
    try {
      const localData = await this.handleLocalData();
      const playersWithPuuid = await this.get_puuid_of_all_players(localData);
      const playersWithSummonerId = await this.get_summoner_id_of_players_by_puuid(playersWithPuuid);
      const rankedPlayers = await this.get_rank_for_every_player(playersWithSummonerId);
      return rankedPlayers;
    } catch (error) {
      console.error("An error occurred during the process:", error);
    }
    return null;
  }
}

module.exports = { RiotApiHandler };