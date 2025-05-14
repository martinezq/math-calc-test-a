const { expect } = require('chai');
const { parseExpression } = require('../src/expression-parser');

describe('Parse simple expression', () => {

    it('simple add', async () => {
      expect(parseExpression('1 + 2')).to.deep.equal({ operator: '+', left: 1, right: 2 });
    });

    it('simple subtract', async () => {
      expect(parseExpression('100 - 21')).to.deep.equal({ operator: '-', left: 100, right: 21 });
    });

    it('simple add negatives', async () => {
      expect(parseExpression('-98 + -49')).to.deep.equal({ operator: '+', left: -98, right: -49 });
    });

    it('simple multiplicate', async () => {
      expect(parseExpression('2 * 3')).to.deep.equal({ operator: '*', left: 2, right: 3 });
    });

    it('simple divide', async () => {
      expect(parseExpression('81 / 9')).to.deep.equal({ operator: '/', left: 81, right: 9 });
    });

    it('simple divide negatives', async () => {
      expect(parseExpression('-64 / -16')).to.deep.equal({ operator: '/', left: -64, right: -16 });
    });

});

describe('Parse combined expression', () => {

  it('multiply and add', async () => {
    expect(parseExpression('1 + 2 * 3')).to.deep.equal({ operator: '+', left: 1, right: { operator: '*', left: 2, right: 3 } });
  });

 it('multiply and divide', async () => {
    expect(parseExpression('2 * 4 / 8')).to.deep.equal({ operator: '/', left: { operator: '*', left: 2, right: 4 }, right: 8 });
  });

  it('add, subtract, multiply and divide', async () => {
    expect(parseExpression('1 + 2 * 4 / 8 - 1')).to.deep.equal({
      operator: '-', 
        left: { 
          operator: '+', 
          left: 1, 
          right: { 
            operator: '/', 
            left: { 
              operator: '*', 
              left: 2, 
              right: 4 
            }, 
            right: 8 
          } 
        }, 
        right: 1
    });
  });

  it('add, subtract, multiply and divide with negatives', async () => {
    expect(parseExpression('-1 - -2 * -4 / -8 + -1')).to.deep.equal({
      operator: '+', 
      left: { 
        operator: '-', 
        left: -1, 
        right: { 
          operator: '/', 
          left: { 
            operator: '*', 
            left: -2, 
            right: -4 }, 
          right: -8
        } 
      }, 
      right: -1 
    });
  });

  it('add many times', async () => {
    expect(parseExpression('1 + 2 + 3 + 4 + 5')).to.deep.equal({
      operator: '+',
      left: { 
        operator: '+', 
        left: { 
          operator: '+', 
          left: { 
            operator: '+', 
            left: 1, 
            right: 2 }, 
          right: 3
        },
        right: 4 
      }, 
      right: 5
    });
  });

});

describe('Parse edge cases', () => {

  it('single number', async () => {
    expect(parseExpression('100001')).to.deep.equal(100001);
  });

  it('single negative number', async () => {
    expect(parseExpression('-9998')).to.deep.equal(-9998);
  });

  it('spaces before', async () => {
    expect(parseExpression('  1 + 2')).to.deep.equal({ operator: '+', left: 1, right: 2 });
  });

  it('spaces after', async () => {
    expect(parseExpression('1 + 2  ')).to.deep.equal({ operator: '+', left: 1, right: 2 });
  });

  it('ignore spaces between', async () => {
    expect(parseExpression('  1  +  2    ')).to.deep.equal({ operator: '+', left: 1, right: 2 });
  });

  it('ignore tabs and new lines', async () => {
    expect(parseExpression('\n  1\t\t+  \n2\n  ')).to.deep.equal({ operator: '+', left: 1, right: 2 });
  });

  it('handle decimals', async () => {
    expect(parseExpression('-0.200 + 100.001')).to.deep.equal({ operator: '+', left: -0.2, right: 100.001 });
  });

});

describe('Detect errors in expressions', () => {

  it('Syntax error: missing value', () => {
      expect(() => parseExpression('1 +')).to.throw('Unexpected end of expression');
  });

  it('Syntax error: incorrect number', () => {
    expect(() => parseExpression('1 + TWO')).to.throw('Unexpected value TWO at position 3');
  });

  it('Syntax error: sentence', () => {
    expect(() => parseExpression('This is Sparta!')).to.throw('Unexpected value This at position 1');
  });

  it('Syntax error: double operator', () => {
    expect(() => parseExpression('1 + + 2')).to.throw('Unexpected value + at position 3');
  });

  it('Syntax error: double negation', () => {
    expect(() => parseExpression('--2 * 8')).to.throw('Unexpected value --2 at position 1');
  });

  it('Syntax error: double multiplication', () => {
    expect(() => parseExpression('2 ** 8')).to.throw('Unexpected value ** at position 2');
  });

  it('Syntax error: no space separation', () => {
    expect(() => parseExpression('2+8 * 2')).to.throw('Unexpected value 2+8 at position 1');
  });

  it('Syntax error: function', () => {
    expect(() => parseExpression('f(x) * 2')).to.throw('Unexpected value f(x) at position 1');
  });
  
  it('Syntax error: parenthesis', () => {
    expect(() => parseExpression('(2 + 2)')).to.throw('Unexpected value (2 at position 1');
  });  

});