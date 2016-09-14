export default class Convert {
    static toInt(value) {
        return +value.toString().replace(/,/g, '');
    }
    static toRoundedValue(value, places) {
        return +(Math.round(`${value}e+${places}`) + `e-${places}`);
    }
}