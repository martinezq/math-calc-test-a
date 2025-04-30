const { expect } = require('chai');
const { evaluateExpression } = require('../src/index');

describe('e2e tests', () => {

    // it('1 + 2 = 3', async () => {
    //     expect(evaluateExpression('1 + 2')).to.equal(3);
    // });

    // it('8 - 6 = 2', async () => {
    //     expect(evaluateExpression('8 - 6')).to.equal(2);
    // });

    // it('3 * 7 = 21', async () => {
    //     expect(evaluateExpression('3 * 7')).to.equal(21);
    // });

    // it('50 / 25 = 2', async () => {
    //     expect(evaluateExpression('50 / 25')).to.equal(2);
    // });

    it('-2 * -8 - 16 = 0', async () => {
        expect(evaluateExpression('-2 * -8 - 16')).to.equal(0);
    });

    it('2 ** 4', async () => {
        expect(() => evaluateExpression('2 ** 4')).to.throw('Unexpected value ** at position 2');
    });


});