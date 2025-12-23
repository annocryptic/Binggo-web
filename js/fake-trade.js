function fakeTrade(tokenId, lastPrice) {

  const open = lastPrice;
  const close = +(open + (Math.random() - 0.5) * 0.1).toFixed(4);
  const high = Math.max(open, close) + Math.random() * 0.05;
  const low = Math.min(open, close) - Math.random() * 0.05;

  db.collection("tokens")
    .doc(tokenId)
    .collection("prices")
    .add({
      time: firebase.firestore.Timestamp.now(),
      open,
      high,
      low,
      close
    });

  db.collection("tokens")
    .doc(tokenId)
    .update({ price: close });
}