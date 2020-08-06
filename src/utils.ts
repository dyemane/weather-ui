export const convertKelvinToF = (k: number) => (k - 273.15) * 1.8 + 32;
export const convertKelvinToC = (k: number) => k - 273.15;

export const OPEN_WEATHER_API_KEY = "4e085a4506957c297f27af049b98777f";
export const OPEN_CAGE_API_KEY = "5f64111bc5f24cd0b617808834125d01";

export default { convertKelvinToF, convertKelvinToC };
