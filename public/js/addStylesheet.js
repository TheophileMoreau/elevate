export function addStylsheet (stylesheet) {
    var elemement = document.getElementById('variable-stylesheet');
    elemement.href = './styles/' + stylesheet + '.css';
}