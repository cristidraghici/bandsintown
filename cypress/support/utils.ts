import { LIST_OF_PERSONAS } from "./constants";

export const getPersona = (name: string) => {
  const persona = LIST_OF_PERSONAS.filter(
    (persona) => persona.name === name || persona.id === name
  )[0];

  if (!persona) {
    throw new Error(`Persona ${name} not found`);
  }

  return persona;
};
