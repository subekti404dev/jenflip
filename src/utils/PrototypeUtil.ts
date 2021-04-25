declare global {
  interface Number {
    toRupiah(withSymbol?: boolean): string;
  }
  interface String {
    fromRupiah(): number;
  }
}

Number.prototype.toRupiah = function (withSymbol?: boolean) {
  let rupiah = '';
  const angkarev = this.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  rupiah = rupiah
    .split('', rupiah.length - 1)
    .reverse()
    .join('');

  return withSymbol ? 'Rp ' + rupiah : rupiah;
};

String.prototype.fromRupiah = function () {
  return parseInt(this.replace(/,.*|[^0-9]/g, ''), 10);
};

export {};
