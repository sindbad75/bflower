/*
 * Local import
 */
// import data
import data from '../data';


/*
 * Code
 */
export default (req, res) => {
  const { depart, arrivee } = req.query;

  if (data[depart] && data[arrivee] && depart !== arrivee) {
    let visitedNodes = { [depart]: depart };
    let distances = [];

    const trajet = (dep, arr) => {
      // si accès au point d'arrivée
      if (data[dep][arr]) {
        visitedNodes = { ...visitedNodes, [arr]: arr };
        distances = [...distances, data[dep][arr]];
        // console.log('arrivé');
      }
      else {
        // récup des noeuds
        const nextNodes = Object.keys(data[dep]);
        // tri des noeuds utilisables
        const availableNodes = nextNodes.filter(node => !visitedNodes[node]);
        // console.log(availableNodes);

        // si toujours possible d'avancer
        if (availableNodes.length > 0) {
          // console.log('on continue');

          // récup des distances possibles
          const availableDistances = availableNodes.map(node => data[dep][node]);
          // console.log(availableDistances);
          // récupérer index du chemin le plus court
          const shorterDistanceId = availableDistances.indexOf(Math.min(...availableDistances));
          // console.log(shorterDistanceId);

          // récupérer le numero du noeud
          const goodNode = availableNodes[shorterDistanceId]
          // console.log(goodNode);

          // enregistrer noeud et distance
          visitedNodes = { ...visitedNodes, [goodNode]: goodNode };
          distances = [...distances, data[dep][goodNode]];

          // relancer la boucle
          trajet(goodNode, arr);
        }
        else {
          // sinon on s'arrère
          visitedNodes = { ...visitedNodes, ERROR: 'ERROR' };
          // console.log('ERROR');
        }
      }
    };

    // lancer le drone
    trajet(depart, arrivee);

    // console.log(distances);
    // console.log(visitedNodes);
    // console.log(req.query.depart);
    // console.log(req.query.arrivee);

    // calculer la distance totale:
    const totalDistance = distances.reduce((total, number) => total + number, 0);

    res.send(
      `<p>Distance parcourue : ${totalDistance}.</p>
      <p>Noeuds visités: ${Object.keys(visitedNodes)}.</p>`
    );
  }
  else {
    res.send(
      `<p>Vérifiez les noeuds choisis</p>`
    );
  }

};
