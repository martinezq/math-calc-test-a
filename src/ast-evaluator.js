/**
 * Recursively evaluates an AST produced by parseExpression.
 *
 * @param {Object|number} ast - The AST node or numeric literal to evaluate.
 * @returns {number} - The computed numeric result.
 */
function evaluateAst(ast) {
    // Base case: if the node is a plain number, return it directly.
    if (!isNaN(ast)) return ast;
    
    // Destructure the AST node into its operator and child subtrees.
    const { operator, left, right } = ast;

    // Recursively evaluate the left and right branches.
    const leftEvaluated = evaluateAst(left);
    const rightEvaluated = evaluateAst(right);

    // Apply the operator to the evaluated subtrees.
    switch (operator) {
        case '+':
            return leftEvaluated + rightEvaluated;
        case '-':
            return leftEvaluated - rightEvaluated;
        case '*':
            return leftEvaluated * rightEvaluated;
        case '/':
            return leftEvaluated / rightEvaluated;
        default:
            // Fallback for unsupported operators.
            throw new Error(`Unsupported operator "${operator}" in AST`);
    }
}

module.exports = {
    evaluateAst
};
