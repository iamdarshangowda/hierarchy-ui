export function getColorBasedonRole(role) {
  switch (role) {
    case 'ceo':
      return '#3C6255';
    case 'head':
      return '#61876E';
    case 'lead':
      return '#A6BB8D';
    default:
      return '#FDE5D4';
  }
}
