const taskList = document.getElementById("taskList");

firebase.auth().onAuthStateChanged(user => {
  if (!user) return;

  const uid = user.uid;

  db.collection("tasks").where("active", "==", true).onSnapshot(snapshot => {
    taskList.innerHTML = "";
    snapshot.forEach(doc => {
      const task = doc.data();
      const id = doc.id;

      taskList.innerHTML += `
        <div class="card">
          <b>${task.title}</b>
          <p>Reward: ${task.reward} pts</p>
          <a href="${task.link}" target="_blank">Go Task</a><br><br>
          <button class="btn" onclick="claimTask('${id}', ${task.reward})">
            Claim
          </button>
        </div>
      `;
    });
  });
});

async function claimTask(taskId, reward) {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const ref = db.collection("users").doc(user.uid);
  const snap = await ref.get();

  const data = snap.data() || {};
  const completed = data.completedTasks || [];

  if (completed.includes(taskId)) {
    alert("Task already claimed");
    return;
  }

  await ref.set({
    points: (data.points || 0) + reward,
    completedTasks: [...completed, taskId]
  }, { merge: true });

  alert("Task claimed! +" + reward + " pts");
}