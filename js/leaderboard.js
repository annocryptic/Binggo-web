const leaderboardList = document.getElementById("leaderboardList");

db.collection("users")
  .orderBy("points", "desc")
  .limit(20)
  .onSnapshot(snapshot => {
    leaderboardList.innerHTML = "";
    let rank = 1;

    snapshot.forEach(doc => {
      const user = doc.data();
      leaderboardList.innerHTML += `
        <div class="card">
          #${rank} — ${user.twitter || "User"}  
          <b>${user.points || 0} pts</b>
        </div>
      `;
      rank++;
    });
  });