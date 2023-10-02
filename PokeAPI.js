const types = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
};

const typeMatchup = (type) => {
    // an array to store type strong against
  const strong = [];

  // array to store type weak against
  const weak = [];
  type = type.toLowerCase();
  if (type in types) {
    fetch(`https://pokeapi.co/api/v2/type/${types[type]}`, {
      method: 'GET',
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        const weakAgainstLength =
          data.damage_relations.double_damage_from.length;
        const strongAgainstLength =
          data.damage_relations.double_damage_to.length;
        const weakAgainstType = data.damage_relations.double_damage_from;
        const strongAgainstType = data.damage_relations.double_damage_to;
        for (let i = 0; i < weakAgainstLength; i++) {
          weak.push(weakAgainstType[i].name);
        }
        for (let i = 0; i < strongAgainstLength; i++) {
          strong.push(strongAgainstType[i].name);
        }
        let str = `Weak against`;
        for (let i = 1; i <= weak.length; i++) {
          if (i === weak.length) {
            str = str + ` and ${weak[i - 1]}.`;
          } else {
            str = str + ` ${weak[i - 1]},`;
          }
        }
        str = str + ` Strong against`;
        for (let i = 1; i <= strong.length; i++) {
          if (i === strong.length) {
            str = str + ` and ${strong[i - 1]}.`;
          } else {
            str = str + ` ${strong[i - 1]},`;
          }
        }
        console.log(str);
      });
  } else {
    console.log(
      "This is not a valid Pokémon type, she's weak against everything."
    );
  }
};

typeMatchup('fighting');
