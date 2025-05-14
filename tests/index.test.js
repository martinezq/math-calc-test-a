const { expect } = require('chai');
const { evaluateExpression } = require('../src/index');

describe('e2e tests', () => {

    it('-2 * -8 - 16 = 0', async () => {
        expect(evaluateExpression('-2 * -8 - 16')).to.equal(0);
    });

    it('2 ** 4 -> error', async () => {
        expect(() => evaluateExpression('2 ** 4')).to.throw('Unexpected value ** at position 2');
    });

});