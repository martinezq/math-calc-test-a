// Tests for evaluateAst (src/ast-evaluator.js) citeturn0file0
const { expect } = require('chai');
const { evaluateAst } = require('../src/ast-evaluator');

describe('Evaluate AST', () => {
  it('return the number when given a numeric literal', () => {
    expect(evaluateAst(42)).to.equal(42);
    expect(evaluateAst(-7)).to.equal(-7);
  });

  it('add two numbers', () => {
    const ast = { operator: '+', left: 1, right: 2 };
    expect(evaluateAst(ast)).to.equal(3);
  });

  it('subtract two numbers', () => {
    const ast = { operator: '-', left: 10, right: 4 };
    expect(evaluateAst(ast)).to.equal(6);
  });

  it('multiply two numbers', () => {
    const ast = { operator: '*', left: 3, right: 5 };
    expect(evaluateAst(ast)).to.equal(15);
  });

  it('divide two numbers', () => {
    const ast = { operator: '/', left: 9, right: 3 };
    expect(evaluateAst(ast)).to.equal(3);
  });

  it('handle nested ASTs correctly', () => {
    const nestedAst = {
      operator: '+',
      left: { operator: '*', left: 2, right: 3 },
      right: { operator: '-', left: 10, right: 4 }
    };
    expect(evaluateAst(nestedAst)).to.equal(12);
  });

  it('support decimal results from division', () => {
    const ast = { operator: '/', left: 7, right: 2 };
    expect(evaluateAst(ast)).to.equal(3.5);
  });

  it('handle negative values in AST', () => {
    const complexAst = {
      operator: '-',
      left: { operator: '*', left: -2, right: -3 },
      right: { operator: '/', left: -8, right: 2 }
    };
    expect(evaluateAst(complexAst)).to.equal(10);
  });

  it('correctly evaluate deeply nested ASTs', () => {
    const deepAst = {
      operator: '+',
      left: {
        operator: '/',
        left: {
          operator: '*',
          left: { operator: '+', left: 1, right: 2 },
          right: { operator: '+', left: 3, right: 4 }
        },
        right: { operator: '-', left: 5, right: 1 }
      },
      right: {
        operator: '*',
        left: { operator: '/', left: 6, right: 2 },
        right: { operator: '-', left: 7, right: 3 }
      }
    };
    expect(evaluateAst(deepAst)).to.equal(17.25);
  });

  it('throw an error for unsupported operators', () => {
    const badAst = { operator: '^', left: 2, right: 3 };
    expect(() => evaluateAst(badAst)).to.throw(Error, 'Unsupported operator');
  });
});
