
function calcElectrolytes() {
  const pre = parseFloat(document.getElementById('preWeight').value) || 175;
  const post = parseFloat(document.getElementById('postWeight').value) || 172.5;
  const mins = parseFloat(document.getElementById('workoutMinutes').value) || 90;
  const drankOz = parseFloat(document.getElementById('fluidConsumed').value) || 24;
  const naPerLiter = parseFloat(document.getElementById('sweatProfile').value) || 1150;

  // 1 lb weight lost = 16 oz fluid lost
  const weightDiffLbs = Math.max(0, pre - post);
  const fluidLostFromWeightOz = weightDiffLbs * 16;
  const totalSweatOz = fluidLostFromWeightOz + drankOz;

  const hours = Math.max(0.25, mins / 60);
  const sweatOzPerHour = totalSweatOz / hours;
  const sweatLitersPerHour = sweatOzPerHour * 0.0295735;
  const totalSweatLiters = totalSweatOz * 0.0295735;

  const totalSodiumMg = totalSweatLiters * naPerLiter;
  const totalPotassiumMg = totalSweatLiters * 200; // standard ~200mg K/L sweat

  const dehydrationPct = (weightDiffLbs / Math.max(1, pre)) * 100;
  let dehydrLabel = dehydrationPct.toFixed(2) + '% (Optimal)';
  if (dehydrationPct > 2.0) {
    dehydrLabel = dehydrationPct.toFixed(2) + '% (High - Performance Drops)';
  } else if (dehydrationPct > 1.0) {
    dehydrLabel = dehydrationPct.toFixed(2) + '% (Mild)';
  }

  document.getElementById('resSweatRate').textContent = sweatOzPerHour.toFixed(1) + ' oz / hr (' + sweatLitersPerHour.toFixed(2) + ' L/hr)';
  document.getElementById('resSodiumMg').textContent = Math.round(totalSodiumMg).toLocaleString() + ' mg Na';
  document.getElementById('resPotassiumMg').textContent = Math.round(totalPotassiumMg).toLocaleString() + ' mg K';
  document.getElementById('resTotalLoss').textContent = totalSweatOz.toFixed(1) + ' fl oz (' + totalSweatLiters.toFixed(2) + ' L)';
  document.getElementById('resDehydrationPct').textContent = dehydrLabel;
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('input', calcElectrolytes);
  el.addEventListener('change', calcElectrolytes);
});
window.addEventListener('DOMContentLoaded', calcElectrolytes);
        