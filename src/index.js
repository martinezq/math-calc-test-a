const { parseExpression } = require('./expression-parser');
const { evaluateAst } = require('./ast-evaluator');

function evaluateExpression(str) {
    const ast = parseExpression(str);
    const result = evaluateAst(ast);

    return result;
}

module.exports = {
    evaluateExpression
}