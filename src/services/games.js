import { API_URL, STRAPI_URL } from "../app/config";

export async function getGames() {
    const res = await fetch(
      `${API_URL}/video-games?populate[platforms][fields][1]=name&populate[cover][fields][1]=url`
    )
    if (!res.ok) {
      throw new Error("problemas tecnicos");
    }
    const { data } = await res.json();
    return data
  }
  
  export async function getCoverImages({ attributes }) {
    const { url } = attributes.cover.data.attributes
    return `${STRAPI_URL}${url}`
  }