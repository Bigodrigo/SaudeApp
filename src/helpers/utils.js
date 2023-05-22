export function formataNome(value) {
    const v = value.toString();
    const r = v.toLowerCase();
    const s = r.replace(r[0], v[0])
    return s.split(' ').slice(0, 1);
}

export function formataCartao(value, pattern) {
    let i = 0;
    const v = value.toString();
    return pattern.replace(/#/g, _ => v[i++]);
}

export function formataNomeCartao(value) {
    const v = value.toString();
    console.log(v)
    const r = v.split(' ');
    switch (r.length) {
        case 2:
            return r[0] + ' ' + r[r.length - 1]
        case 3:
            return r[0] + ' ' + r[r.length - 2][0] + ' ' + r[r.length - 1];
        case 4:
            return r[0] + ' ' + r[r.length - 3][0] + ' ' + r[r.length - 2][0] + ' ' + r[r.length - 1];
        case 5:
            return r[0] + ' ' + r[r.length - 4][0] + ' ' + r[r.length - 3][0] + ' ' + r[r.length - 2][0] + ' ' + r[r.length - 1];
    }
}