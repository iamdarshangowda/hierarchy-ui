export function findMatch(employeeList, input) {
  let matches = [];
  if (!input) return matches;
  const lowercasedInput = input.toLowerCase();
  for (const key in employeeList) {
    const person = employeeList[key];

    for (const property in person) {
      if (property === 'group') continue;

      const value = person[property].toLowerCase();

      if (value.includes(lowercasedInput)) {
        matches.push({
          name: person['name'],
          employeeId: key,
          //   key: property,
          //   value: person[property],
        });
        break;
      }
    }
  }

  return matches;
}
