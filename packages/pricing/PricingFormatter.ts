export class PricingFormatter {
  static formatFCFA(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('XOF', 'FCFA');
  }

  static formatText(amount: number, suffix: string = ''): string {
      return `${this.formatFCFA(amount)} ${suffix}`.trim();
  }
}
