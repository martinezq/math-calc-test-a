function evaluateAst(ast) {
    if (!isNaN(ast)) return ast;
    
    const { operator, left, right } = ast;

    const leftEvaluated = evaluateAst(left);
    const rightEvaluated = evaluateAst(right);

    switch (operator) {
        case '+': return leftEvaluated + rightEvaluated;
        case '-': return leftEvaluated - rightEvaluated;
        case '*': return leftEvaluated * rightEvaluated;
        case '/': return leftEvaluated / rightEvaluated;
    }

    throw `Error evaluating ast`;
}

module.exports = {
    evaluateAst
}