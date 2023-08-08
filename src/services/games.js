import { API_URL, STRAPI_URL } from "../app/config";

export async function getGames({ page = 1}) {
    const res = await fetch(
      `${API_URL}/video-games?populate[platforms][fields][1]=name&populate[cover][fields][1]=url&pagination[page]=${page}&pagination[pageSize]=1`
    )
    if (!res.ok) {
      throw new Error("problemas tecnicos");
    }
    const { data, meta } = await res.json();
    const { pagination } = meta;

    return { data, pagination }
  }
  
  export async function getCoverImages({ attributes }) {
    const { url } = attributes.cover.data.attributes
    return `${STRAPI_URL}${url}`
  }