export function addStylsheet (stylesheet) {
    console.log(`Adding ${stylesheet} stylesheet !`);
    var elemement = document.getElementById('variable-stylesheet');
    elemement.href = './styles/' + stylesheet + '.css';
}