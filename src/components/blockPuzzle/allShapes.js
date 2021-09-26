function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};

const allShapes = [
  "00061213",
  "0807010203",
  "04100915",
  "18243031",
  "1920142021",
  "05111716",
  "23293534",
  "33272822",
  "252632"
];

export default shuffleArray(allShapes);
